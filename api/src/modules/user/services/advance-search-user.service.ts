import { Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSkillService } from './user-skill.service';
import { MatchService } from '../../match/services/match.service';
import mongoose from 'mongoose';
import { SearchUserDto } from '../dtos/requests/search-user.dto';
import { SearchUserSkillByUserDto } from '../dtos/requests/search-user-skill-by-user.dto';
import { AdvanceSearchDto } from '../dtos/requests/advance-search-user.dto';
import { User } from '../schemas/user.schema';
import { USER_STATUS } from '../constants/user.constant';

@Injectable()
export class AdvanceSearchUserService {
  private logger = new Logger(AdvanceSearchUserService.name);
  constructor(
    private readonly userService: UserService,
    private readonly userSkillService: UserSkillService,
    private readonly matchService: MatchService,
  ) {}
  async searchMatchedUsers(
    userId: mongoose.Types.ObjectId,
    query: AdvanceSearchDto,
  ) {
    const { matches } = await this.matchService.getMatch(userId);
    const matchedUsersIds = matches.map((m) =>
      m.users.find((u) => !u.equals(userId)),
    );
    return this.search(userId, { $in: matchedUsersIds }, query);
  }

  async searchUnmatchedUsers(
    userId: mongoose.Types.ObjectId,
    query: AdvanceSearchDto,
  ) {
    const { matches } = await this.matchService.getMatch(userId);
    const matchedUsersIds = matches.map((m) =>
      m.users.find((u) => !u.equals(userId)),
    );

    return this.search(userId, { $nin: [...matchedUsersIds] }, query);
  }

  async searchRequestedUsers(
    userId: mongoose.Types.ObjectId,
    query: AdvanceSearchDto,
  ) {
    const { requests } = await this.matchService.getSentRequest(userId);
    const requestedUsersIds = requests.map((r) => r.to);
    return this.search(userId, { $in: requestedUsersIds }, query);
  }

  async searchRequestingUsers(
    userId: mongoose.Types.ObjectId,
    query: AdvanceSearchDto,
  ) {
    const { requests } = await this.matchService.getReceivedRequests(userId);
    const requestingUsersIds = requests.map((r) => r.from);
    return this.search(userId, { $in: requestingUsersIds }, query);
  }

  private async search(
    userId: mongoose.Types.ObjectId,
    userIdFilter:
      | { [key in '$nin']: mongoose.Types.ObjectId[] }
      | { [key in '$in']: mongoose.Types.ObjectId[] },
    query: AdvanceSearchDto,
  ) {
    // const { matches } = await this.matchService.getMatch(userId);
    // const matchedUsersIds = matches.map((m) =>
    //   m.users.find((u) => !u.equals(userId)),
    // );

    let userIdsBySearchUser;

    if (query.q) {
      const { users } = await this.userService.search({
        q: query.q,
      } as SearchUserDto);
      userIdsBySearchUser = users.map((u) => u._id);
    }

    const {users: blockedUsers} = await this.userService.search({status: USER_STATUS.BLOCKED});
    const blockedUserIds = blockedUsers.map(u => u._id);

    const pipe: mongoose.PipelineStage[] = [
      {
        $match: {
          $and: [
            { userId: userIdFilter },
            {userId: {$nin: blockedUserIds}},
            ...(userIdsBySearchUser ? [{ userId: userIdsBySearchUser }] : []),
            ...(query.skillRole ? [{ role: query.skillRole }] : []),
            ...(query.skills ? [{ skill: { $in: query.skills } }] : []),
          ],
        },
      },
      {$group: {_id: "$userId"}}
    ];
    const [searchedUserSkills, count] = await Promise.all([
      this.userSkillService.advanceSearch([
        ...pipe,
        { $skip: query.pageNumber * query.pageSize },
        { $limit: query.pageSize },
      ]),
      this.userSkillService.advanceSearch([...pipe, { $count: 'count' }]),
    ]);

    this.logger.debug(pipe);
    this.logger.debug(searchedUserSkills);
    this.logger.debug(count);

    const userIds = searchedUserSkills.map((u) => u._id?.toHexString());

    const { users } = await this.userService.search({
      includeIds: userIds,
    } as any);

    return {
      users,
      total: count[0]?.count ? count[0]?.count : 0,
      pageSize: query.pageSize,
      pageNumber: query.pageNumber,
    };
  }
}
