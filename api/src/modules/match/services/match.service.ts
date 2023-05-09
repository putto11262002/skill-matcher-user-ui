import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Match } from '../schemas/match.schema';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/schemas/user.schema';
import { MATCH_STATUS, MATCH_USER_STATUS } from '../constants/match.constant';
import { Types } from 'mongoose';
import { SearchMatchQueryDto } from '../dto/requests/search-match-query.dto';
import { SearchUserDto } from '../../user/dtos/requests/search-user.dto';

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

  async getMatch(id: Types.ObjectId, userId: Types.ObjectId) {
    const match = await this.matchModel.findOne({
      _id: id,
      'users.userId': userId,
    });
    if (!match) {
      throw new NotFoundException('Match not found');
    }
    return match;
  }

  async getMatchByUsers(userId1: Types.ObjectId, userId2: Types.ObjectId) {
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

  async getMatchByUser(userId: Types.ObjectId) {
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

  async deleteMatch(id: Types.ObjectId, userId: Types.ObjectId) {
    const _id = await this.matchModel.exists({
      _id: id,
      users: { $elemMatch: { userId } },
    });
    if (!_id) {
      throw new NotFoundException('Math does not exist');
    }
    await this.matchModel.deleteOne({ _id });
  }

  async acceptMatch(selfId: Types.ObjectId, otherId: Types.ObjectId) {
    const match = await this.matchModel.findOne({
      $and: [
        {
          users: {
            $elemMatch: {
              userId: selfId,
            },
          },
        },
        {
          users: {
            $elemMatch: {
              userId: otherId,
            },
          },
        },
      ],
    });

    if (!match) {
      throw new NotFoundException('Match does not exist');
    }

    match.users = match.users.map((user) =>
      user.userId.equals(selfId)
        ? { ...user, status: MATCH_USER_STATUS.ACCEPTED }
        : user,
    );
    const bothAccepted = match.users.every(
      (user) => user.status === MATCH_USER_STATUS.ACCEPTED,
    );
    match.status = bothAccepted ? MATCH_STATUS.ACTIVE : match.status;
    await this.matchModel.updateOne({
      $and: [
        {
          users: {
            $elemMatch: {
              userId: selfId,
            },
          },
        },
        {
          users: {
            $elemMatch: {
              userId: otherId,
            },
          },
        },
      ],
    }, match);
  }

  async declineMatch(selfId: Types.ObjectId, otherId: Types.ObjectId) {
    const match = await this.matchModel.findOne({
      $and: [
        {
          users: {
            $elemMatch: {
              userId: selfId,
            },
          },
        },
        {
          users: {
            $elemMatch: {
              userId: otherId,
            },
          },
        },
      ],
    });
    if (!match) {
      throw new NotFoundException('Match does not exist');
    }
    if (match.status === MATCH_STATUS.ACTIVE) {
      throw new BadRequestException('Cannot modify active match');
    }
    await this.matchModel.deleteOne({
      $and: [
        {
          users: {
            $elemMatch: {
              userId: selfId,
            },
          },
        },
        {
          users: {
            $elemMatch: {
              userId: otherId,
            },
          },
        },
      ],
    });
  }

  async searchMatches(
    query?: SearchMatchQueryDto,
   
  ) {
    const filter: mongoose.FilterQuery<Match> = {};

    if(query.includeIds){
      if(!filter.$and) filter.$and = [];
      filter.$and.push({_id: {'$in': query.includeIds}});
    }

    if(query.status){
      if(!filter.$and) filter.$and = [];
      filter.$and.push({status: query.status});
    }

    const [matches, total] = await Promise.all([
      this.matchModel
        .find(filter)
        .sort(query.sort)
        .skip(query.pageSize * query.pageNumber)
        .limit(query.pageSize),
      this.matchModel.countDocuments(filter),
    ]);

    return {
      matches,
      total,
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
    };
  }

  async advanceSearch(pipe: mongoose.PipelineStage[]){
    return this.matchModel.aggregate(pipe);
  }

  async matchExists(
    userId1: Types.ObjectId,
    userId2: Types.ObjectId,
  ): Promise<string> {
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

    return match?.status;
  }
}
