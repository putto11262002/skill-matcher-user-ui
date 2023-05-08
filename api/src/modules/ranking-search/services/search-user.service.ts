import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { UserSkillService } from '../../skill/services/user-skill.service';
import { SkillService } from '../../skill/services/skill.service';
import { SearchUserFeedQueryDto } from '../dtos/requests/search-user-query.dto';
import mongoose from 'mongoose';
import { SearchSkillDto } from '../../skill/dtos/requests/search-skill.dto';
import { SearchUserDto } from '../../user/dtos/requests/search-user.dto';
import { MatchService } from '../../match/services/match.service';
import * as _ from 'lodash';
import { User } from '../../user/schemas/user.schema';
@Injectable()
export class SearchUserFeedService {
  private logger = new Logger(SearchUserFeedService.name);

  constructor(
    private readonly userService: UserService,
    private readonly userSkillService: UserSkillService,
    private readonly skillService: SkillService,
    private readonly matchService: MatchService,
  ) {}

  /**
   *  TODO - this can be optimise by combining all the filters into one stage
   */
  async search(userId: mongoose.Types.ObjectId, query: SearchUserFeedQueryDto) {
    // get all skills that user have
    const userSkills = await this.userSkillService.getUserSkills(
      userId,
      {} as any,
    );

    const rawSkills = await this.skillService.searchSkills({
      names: userSkills.userSkills.map((s) => s.skill),
    } as SearchSkillDto);

    const relatedSkills = [];

    rawSkills.skills.forEach((s) => {
      s.relatedSkills.forEach((rs) => relatedSkills.push(rs));
    });

    const skills = rawSkills.skills.map((s) => s.name);

    const matches = await this.matchService.getMatchByUser(userId);

    const matchedUserIds = matches.matches.map((m) => {
      return m.users.find((u) => !u.userId.equals(userId))?.userId;
    });

    const pipe: mongoose.PipelineStage[] = [];

    /**
     * If search term exist use it the search for user by username, first name, last name
     */
    if (query.q) {
      const { users: searchedUsers } = await this.userService.search({
        q: query.q,
      } as SearchUserDto);

      pipe.push({
        $match: {
          userId: { $in: searchedUsers.map((u) => u._id) },
        },
      });
    }

    if (query.matched !== undefined) {
      pipe.push({
        $match: {
          userId: query.matched
            ? { $in: matchedUserIds }
            : { $nin: matchedUserIds },
        },
      });
    }

    if (query.skills) {
      pipe.push({
        $match: {
          skill: { $in: query.skills },
        },
      });
    }

    if (query.skillRole) {
      pipe.push({
        $match: {
          role: query.skillRole,
        },
      });
    }

    // do not include the target user
    pipe.push({ $match: { userId: { $ne: userId } } });

    pipe.push({
      $project: {
        userId: 1,
        // skill: process.env.NODE_ENV === 'development' ? 1 : 0,
        // proficiency: process.env.NODE_ENV === 'development' ? 1 : 0,
        skillScore: {
          $cond: {
            if: {
              $in: ['$skill', skills],
            },
            then: { $multiply: ['$proficiency', 5] },
            else: { $multiply: ['$proficiency', 2] },
          },
        },
      },
    });

     /**
    * Group by user id and sum the score
    */
    pipe.push( 
   {
     $group: {_id: "$userId", score: {$sum: "$skillScore"}}
   },)

    pipe.push({
      $sort: {
        score: -1,
      },
    });

    this.logger.debug(pipe);

    const [searchedUsers, count] = await Promise.all([
      this.userSkillService.advanceSearch([
        ...pipe,
        { $skip: query.pageNumber * query.pageSize },
        { $limit: query.pageSize },
      ]),
      this.userSkillService.advanceSearch([...pipe, { $count: 'count' }]),
    ]);

    const userIds = searchedUsers.map((u) => u._id?.toHexString())

    const { users } = await this.userService.search({
      includeIds: userIds,
   
    } as any);

    const userMap = new Map<string, User>();
    users.forEach((user) => userMap.set(user._id.toHexString(), user));

    return {
      users: userIds.map((id) => userMap.get(id)),
      total: count[0]?.count ? count[0]?.count : 0,
      pageSize: query.pageSize,
      pageNumber: query.pageNumber,
    };
  }
}
