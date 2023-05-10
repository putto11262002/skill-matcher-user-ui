import { Injectable, Logger } from '@nestjs/common';
import { SearchDto } from '../../../common/dtos/requests/search.dto';
import mongoose from 'mongoose';
import { UserSkillService } from './user-skill.service';
import { SkillService } from '../../skill/services/skill.service';
import { MatchService } from '../../match/services/match.service';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import { RankedSearchDto } from '../dtos/requests/ranked-search.dto';
import { SearchUserDto } from '../dtos/requests/search-user.dto';
import { USER_SKILL_ROLE } from '../constants/user-skill.constant';

@Injectable()
export class RankedSearchUserService {
  private logger = new Logger(RankedSearchUserService.name);
  constructor(
    private readonly userSkillService: UserSkillService,
    private readonly skillService: SkillService,
    private readonly matchService: MatchService,
    private readonly userService: UserService,
  ) {}

  async search(userId: mongoose.Types.ObjectId, query: RankedSearchDto) {
    // get all the skills that the user has
    const { userSkills } = await this.userSkillService.getUserSkills(
      userId,
      {} as any,
    );

    const { skills } = await this.skillService.searchSkills({
      names: userSkills.map((s) => s.skill),
    } as any);

    const indirectSkills = [];
    skills.forEach((s) => {
      s.relatedSkills.forEach((rs) => indirectSkills.push(rs));
    });

    const directSkills = skills.map((s) => s.name);

    const { matches } = await this.matchService.getMatch(userId);

    const { requests } = await this.matchService.getSentRequest(userId);

    const matchedUsersIds = matches.map((m) =>
      m.users.find((u) => !u.equals(userId)),
    );

    const requestUserIds = requests.map((r) => r.to);

    let skillFilter;
    let userFilter;
    let skillRoleFilter;

    if (query.q) {
      let { users } = await this.userService.search({
        q: query.q,
      } as SearchUserDto);
      userFilter = {
        userId: { $in: users.map((u) => u._id) },
      };
    }

    if (query.skills) {
      skillFilter = {
        skill: { $in: query.skills },
      };
    } else {
      skillFilter = {
        $or: [
          {
            skill: { $in: directSkills },
          },
          {
            skill: { $in: indirectSkills },
          },
        ],
      };
    }

    if (query.skillRole) {
      skillRoleFilter = {
        role: { $in: [query.skillRole] },
      };
    }

    const pipe: mongoose.PipelineStage[] = [
      {
        $match: {
          $and: [
            ...(userFilter ? [userFilter] : []),
            skillFilter,
            ...(skillRoleFilter ? [skillRoleFilter] : []),
            {
              userId: { $ne: userId },
            },
            {
              userId: { $nin: [...matchedUsersIds, ...requestUserIds] },
            },
          ],
        },
      },
      {
        $project: {
          userId: 1,
          skillScore: {
            $cond: {
              if: {
                $in: ['$skill', directSkills],
              },
              then: { $multiply: ['$proficiency', 5] },
              else: { $multiply: ['$proficiency', 2] },
            },
          },
        },
      },
      {
        $group: { _id: '$userId', score: { $sum: '$skillScore' } },
      },
      {
        $sort: {
          score: -1,
        },
      },
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

    const userMap = new Map<string, User>();
    users.forEach((user) => userMap.set(user._id.toHexString(), user));

    const sortedUsers = userIds.map((id) => userMap.get(id));

    return {
      users: sortedUsers,
      total: count[0]?.count ? count[0]?.count : 0,
      pageSize: query.pageSize,
      pageNumber: query.pageNumber,
    };
  }
}
