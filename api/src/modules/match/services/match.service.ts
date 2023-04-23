import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Match } from '../schemas/match.schema';
import { FilterQuery, Model } from 'mongoose';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/schemas/user.schema';
import { MATCH_STATUS, MATCH_USER_STATUS } from '../constants/match.constant';
import { ObjectId } from 'mongoose';
import { SearchMatchQueryDto } from '../dto/requests/search-match-query.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name) private readonly matchModel: Model<Match>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async createMatch(
    user1: User,
    user1Status: string,
    user2: User,
    user2Status: string,
  ) {
    const existingMatch = await this.matchModel.findOne({
      $and: [
        {
          users: {
            $elemMatch: {
              userId: user1._id,
            },
          },
        },
        {
          users: {
            $elemMatch: {
              userId: user2._id,
            },
          },
        },
      ],
    });

    if (existingMatch) {
      // if the match is already exist do not continue
      if (existingMatch.status === MATCH_STATUS.ACTIVE) {
        throw new BadRequestException('Match already exist');
      }

      // if matchs is not active delete match and create a new one
      await this.matchModel.deleteOne({ _id: existingMatch._id });
    }

    const createMatch = await this.matchModel.create({
      users: [
        {
          userId: user1._id,
          status:
            user1Status === MATCH_USER_STATUS.ACCEPTED
              ? user1Status
              : MATCH_USER_STATUS.PENDING,
        },
        {
          userId: user2._id,
          status:
            user2Status === MATCH_USER_STATUS.ACCEPTED
              ? user2Status
              : MATCH_USER_STATUS.PENDING,
        },
      ],
      status:
        user1Status === MATCH_USER_STATUS.ACCEPTED &&
        user2Status === MATCH_USER_STATUS.ACCEPTED
          ? MATCH_STATUS.ACTIVE
          : MATCH_STATUS.PENDING,
    });

    // may have to add some notification email? - new match from ....

    return createMatch;
  }

  async getMatchById(id: ObjectId) {
    const match = await this.matchModel.findOne({ _id: id });
    if (!match) {
      throw new NotFoundException('Match not found');
    }
  }

  async getMatchByUsers(userId1: ObjectId, userId2: ObjectId) {
    const match = await this.matchModel.findOne({
      $and: [
        {
          users: {
            $elemMatch: {
              userId: userId1,
            },
          },
        },
        {
          users: {
            $elemMatch: {
              userId: userId2,
            },
          },
        },
      ],
    });
    if (!match) {
      throw new NotFoundException('Match does not exist');
    }
    return match;
  }

  async getMatchByUser(userId: ObjectId) {
    const filter = {
      users: {
        $elemMatch: {
          userId,
        },
      },
    };

    const [matches, total] = await Promise.all([
      this.matchModel.find(filter),
      this.matchModel.countDocuments(filter),
    ]);
    return { matches, total };
  }

  async deleteMatch(id: ObjectId, userId: ObjectId) {
    const _id = await this.matchModel.exists({
      _id: id,
      users: { $elemMatch: { userId } },
    });
    if (!_id) {
      throw new NotFoundException('Math does not exist');
    }
    await this.matchModel.deleteOne({ _id });
  }

  async acceptMatch(id: ObjectId, userId: ObjectId) {
    const match = await this.matchModel.findOne({
      _id: id,
      users: { $elemMatch: { userId } },
    });
    if (!match) {
      throw new NotFoundException('Match does not exist');
    }
    match.users = match.users.map((user) =>
      user.userId === userId
        ? { ...user, status: MATCH_USER_STATUS.ACCEPTED }
        : user,
    );
    const bothAccepted = match.users.every(
      (user) => user.status === MATCH_USER_STATUS.ACCEPTED,
    );
    match.status = bothAccepted ? MATCH_STATUS.ACTIVE : match.status;
    await this.matchModel.updateOne({ _id: id }, match);
  }

  async declineMatch(id: ObjectId, userId: ObjectId) {
    const match = await this.matchModel.findOne({
      _id: id,
      users: { $elemMatch: { userId } },
    });
    if (!match) {
      throw new NotFoundException('Match does not exist');
    }
    if (match.status === MATCH_STATUS.ACTIVE) {
      throw new BadRequestException('Cannot modify active match');
    }
    await this.matchModel.deleteOne({ _id: id });
  }

  async searchMatchByUser(userId: ObjectId, query: SearchMatchQueryDto) {
    const filter: FilterQuery<Match> = {};

    const { users } = await this.userService.search({
      q: query.q,
      pageNumber: undefined,
      pageSize: undefined,
      excludeIds: [userId],
    });
    const userIds = users.map((user) => user._id);

    if (query.status) {
      query.status = query.status;
    }

    if (query.selfStatus) {
      if (!filter.$and) filter.$and = [];
      filter.$and.push({
        users: {
          $elemMatch: {
            userId,
            status: query.selfStatus,
          },
        },
      });
    }

    if (query.otherStatus) {
      if (!filter.$and) filter.$and = [];
      filter.$and.push({
        users: {
          $elemMatch: {
            userId: { $ne: userId },
            status: query.selfStatus,
          },
        },
      });
    }

    if (query.otherIds) {
      if (!filter.$and) filter.$and = [];
      filter.$and.push({
        users: {
          $elemMatch: {
            userId: { $in: [...query.otherIds, ...userIds] },
          },
        },
      });
    }

    const [matches, total] = await Promise.all([
      this.matchModel
        .find(filter)
        .skip(
          query.pageNumber !== undefined && query.pageSize !== undefined
            ? query?.pageNumber * query?.pageSize
            : undefined,
        )
        .limit(query?.pageSize),
      this.matchModel.countDocuments(filter),
    ]);

    return {
      matches,
      total,
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
    };
  }

  async matchExists(userId1: ObjectId, userId2: ObjectId): Promise<boolean> {
    const id = await this.matchModel.exists({
      $and: [
        {
          users: {
            $elemMatch: {
              userId: userId1,
            },
          },
        },
        {
          users: {
            $elemMatch: {
              userId: userId2,
            },
          },
        },
      ],
    });
    return id ? true : false;
  }
}
