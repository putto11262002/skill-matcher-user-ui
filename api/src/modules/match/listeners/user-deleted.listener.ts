import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Match } from '../schemas/match.schema';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_EVENT } from '../../user/constants/user.constant';
import { MatchRequest } from '../schemas/match-request.schema';
import { User } from '../../user/schemas/user.schema';

@Injectable()
export class UserDeletedListener {
  constructor(
    @InjectModel(Match.name) private readonly matchModel: Model<Match>,
    @InjectModel(MatchRequest.name)
    private readonly matchRequest: Model<MatchRequest>,
  ) {}

  @OnEvent(USER_EVENT.DELETED, { async: true })
  async handleDeleteAllMatchAndRequests(user: User) {
    await this.matchModel.deleteMany({
        users: { $elemMatch: { $eq: user._id } }
    })

   await this.matchRequest.deleteMany({
        $or: [
            {to: {$eq: user._id}},
            {from: {$eq: user._id}}
        ]
    })
  }
}
