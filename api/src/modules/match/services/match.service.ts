import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Match } from '../schemas/match.schema';
import mongoose from 'mongoose';
import { MatchRequest } from '../schemas/match-request.schema';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name) private readonly matchModel: mongoose.Model<Match>,
    @InjectModel(MatchRequest.name)
    private readonly matchReqeuestModel: mongoose.Model<MatchRequest>,
    private readonly userService: UserService,
  ) {}

  /**
   * Create match request
   * @param fromId The user that want to request match
   * @param toId The target user
   */
  async requestMatch(
    fromId: mongoose.Types.ObjectId,
    toId: mongoose.Types.ObjectId,
  ) {
    // check if a match between the two user already exist
    const existingMatch = await this.matchExists(fromId, toId);

    // cannot create request if match already exist
    if (existingMatch) {
      throw new ConflictException('Match already exist');
    }

    // check if a request from 'to' user exist
    const requestFromTo = await this.reuquestExist(toId, fromId);

    // if request from 'to' exist delete the reqeust and create a match
    if (requestFromTo) {
      await this.matchReqeuestModel.deleteOne({ _id: requestFromTo._id });

      const createdMatch = await this.createMatch(fromId, toId);
      return createdMatch;
    }

    // check if user have already have a request
    const existingRequest = await this.reuquestExist(fromId, toId);

    if (existingRequest) return existingRequest;

    // otherwise create a new request
    const [_fromId, _toId] = await Promise.all([
      this.userService.existById(fromId),
      this.userService.existById(toId),
    ]);

    if (!_fromId) {
      throw new NotFoundException(`User with id ${fromId} does not exist`);
    }
    if (!_toId) {
      throw new NotFoundException(`User with id ${toId} does not exist`);
    }

    const createdRequest = await this.matchReqeuestModel.create({
      to: _toId._id,
      from: _fromId._id,
    });

    return createdRequest;
  }

  /**
   * Check if a match request exist between the two users, 'to' and 'from'
   * @param fromId
   * @param toId
   * @returns Return request if it exist, otherwise return null
   */
  async reuquestExist(
    fromId: mongoose.Types.ObjectId,
    toId: mongoose.Types.ObjectId,
  ) {
    const request = await this.matchReqeuestModel.exists({
      to: toId,
      from: fromId,
    });
    return request;
  }

  /**
   * Check if a match exist between the two users
   * @param user1Id
   * @param user2Id
   * @returns Return match if it exist, otherwise return null
   */
  async matchExists(
    user1Id: mongoose.Types.ObjectId,
    user2Id: mongoose.Types.ObjectId,
  ) {
    const existingMatch = await this.matchModel.exists({
      $and: [
        {
          users: {
            $elemMatch: {
              userId: user1Id,
            },
          },
        },
        {
          users: {
            $elemMatch: {
              userId: user2Id,
            },
          },
        },
      ],
    });
    return existingMatch;
  }

  /**
   * Create a match between two users
   * @param user1Id
   * @param user2Id
   * @returns Created match
   */
  private async createMatch(
    user1Id: mongoose.Types.ObjectId,
    user2Id: mongoose.Types.ObjectId,
  ) {
    const createdMatch = await this.matchModel.create({
      users: [user1Id, user2Id],
    });
    return createdMatch;
  }

  /**
   * Reject a match request given the user that send the request and taget user
   * @param fromTo
   * @param toId
   */
  async rejectRequest(
    fromTo: mongoose.Types.ObjectId,
    toId: mongoose.Types.ObjectId,
  ) {
    const request = await this.reuquestExist(fromTo, toId);
    if (!request) {
      throw new NotFoundException('Request does not exist');
    }
    await this.matchReqeuestModel.deleteOne({ _id: request._id });
  }

  /**
   * Accept match request and create a match
   * @param fromId
   * @param toId
   * TODO - use transaction
   */
  async acceptRequestAndMatch(
    fromId: mongoose.Types.ObjectId,
    toId: mongoose.Types.ObjectId,
  ) {
    const request = await this.reuquestExist(fromId, toId);
    if (!request) {
      throw new NotFoundException('Request does not exist');
    }
    await this.matchReqeuestModel.deleteOne({ _id: request._id });
    const createdMatch = await this.createMatch(fromId, toId);
    return createdMatch;
  }

  /**
   * Unmatch users
   * @param user1Id
   * @param user2Id
   */
  async unmatch(
    user1Id: mongoose.Types.ObjectId,
    user2Id: mongoose.Types.ObjectId,
  ) {
    const match = await this.matchExists(user1Id, user2Id);
    if (match) {
      throw new NotFoundException('Match does not exist');
    }
    await this.matchModel.deleteOne({ _id: match._id });
  }

  /**
   * Get all the request the user received
   * @param userId
   * @param pageSize
   * @param pageNumber
   * @returns A list of requests, total number of requests
   */
  async getReceivedRequests(
    userId: mongoose.Types.ObjectId,
    pageSize?: number,
    pageNumber?: number,
  ) {
    const filter: mongoose.FilterQuery<MatchRequest> = { to: userId };
    const [requests, total] = await Promise.all([
      this.matchReqeuestModel
        .find(filter)
        .skip(pageSize * pageNumber)
        .limit(pageSize),
      this.matchReqeuestModel.countDocuments(filter),
    ]);
    return { requests, total };
  }

  /**
   * Get all the match of the supplied user
   * @param userId
   * @param pageSize
   * @param pageNumber
   * @returns A list of matches, total number of matches
   */
  async getMatch(
    userId: mongoose.Types.ObjectId,
    pageSize?: number,
    pageNumber?: number,
  ) {
    const filter: mongoose.FilterQuery<Match> = {
      users: { $elemMatch: { $eq: userId._id } },
    };
    const [matches, total] = await Promise.all([
      this.matchModel
        .find(filter)
        .skip(pageSize * pageNumber)
        .limit(pageSize),
      this.matchModel.countDocuments(filter),
    ]);
    return { matches, total };
  }

  /**
   * Get all the match request the supplied user have sent
   * @param userIdId
   * @param pageSize
   * @param pageNumber
   * @returns a list of request, total number of request
   */
  async getSentRequest(
    userIdId: mongoose.Types.ObjectId,
    pageSize?: number,
    pageNumber?: number,
  ) {
    const filter: mongoose.FilterQuery<MatchRequest> = { from: userIdId._id };
    const [requests, total] = await Promise.all([
      this.matchReqeuestModel
        .find(filter)
        .skip(pageSize * pageNumber)
        .limit(pageSize),
      this.matchReqeuestModel.countDocuments(filter),
    ]);
    return { requests, total };
  }

  async advanceSearch(pipe: mongoose.PipelineStage[]) {
    return this.matchModel.aggregate(pipe);
  }
}
