import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { SkillService } from '../../skill/services/skill.service';
import { MatchService } from '../../match/services/match.service';
import { UserSkillService } from '../../skill/services/user-skill.service';
import mongoose from 'mongoose';
import { SearchSkillDto } from '../../skill/dtos/requests/search-skill.dto';
import { UserSuggestionQueryDto } from '../dtos/requests/user-suggestion-query.dto';
import { User } from '../../user/schemas/user.schema';

@Injectable()
export class UserSuggestionService {
  private readonly logger = new Logger(UserSuggestionService.name);
  constructor(
    private userService: UserService,
    private skillService: SkillService,
    private matchService: MatchService,
    private userSkillService: UserSkillService,
  ) {
    // this.suggestion(
    //   mongoose.Types.ObjectId.createFromHexString(
    //     '644de8a95eca9e25ddca900b',
    //   ) as any,
    //   new UserSuggestionQueryDto(),
    // )
  }

  async suggestion(userId: mongoose.Types.ObjectId, query) {
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

    const pipe: mongoose.PipelineStage[] = [
      /**
       * select all the skills that are in the skills and related skills array
       */
      {
        $match: {
          $or: [
            {
              skill: { $in: skills },
            },
            {
              skill: { $in: relatedSkills },
            },
          ],
        },
      },
      /**
       * select users that are not the target users and the users that have already matched with the target users.
       */
      {
        $match: {
          $and: [
            { userId: { $ne: userId } },
            { userId: { $nin: matchedUserIds } },
          ],
        },
      },
      /**
       * Derive a field called score. The score indicates how relavent the user skill is to the target user.
       * Score if derived by:
       *    if the skill is in the skill array:
       *        score = weight_1 * proficiency
       *    else if the skill is in the related skill array:
       *        score = weight_2 * proficiency
       * weight_1 should be larger than weight_2 as skills in the skill array is directly related to the skills that the target user have.
       */
      {
        $project: {
          userId: 1,
          // skill:  process.env.NODE_ENV === 'development' ? 1 : 0,
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
      },
      /**
       * Group by user id and sum the score
       */
      {
        $group: { _id: '$userId', score: { $sum: '$skillScore' } },
      },

      /**
       * Sort user skills by score in descending order
       */

      {
        $sort: {
          score: -1,
        },
      },
    ];

    const [searchedUsers, count] = await Promise.all([
      this.userSkillService.advanceSearch([
        ...pipe,
        { $skip: query.pageNumber * query.pageSize },
        { $limit: query.pageSize },
      ]),
      this.userSkillService.advanceSearch([...pipe, { $count: 'count' }]),
    ]);

    // log out searched values
    this.logger.verbose(searchedUsers, count);

    const userIds = searchedUsers.map((u) => u._id?.toHexString());

    const {users} = await this.userService.search({
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
