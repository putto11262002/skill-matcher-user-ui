import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSkillService } from './user-skill.service';
import { MatchService } from '../../match/services/match.service';
import mongoose from 'mongoose';
import { SearchUserSkillByUserDto } from '../dtos/requests/search-user-skill-by-user.dto';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly userSkillService: UserSkillService,
    private readonly matchService: MatchService,
  ) {}

  async getUserProfile(
    getById: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) {
    const user = await this.userService.getByIdOrThow(userId);
    const [matched, requestTo, requestFrom, { userSkills }] = await Promise.all(
      [
        this.matchService.matchExists(getById, userId),
        this.matchService.reuquestExist(getById, userId),
        this.matchService.reuquestExist(userId, getById),
        this.userSkillService.getUserSkills(
          userId,
          {} as SearchUserSkillByUserDto,
        ),
      ],
    );

    console.log(matched, requestTo, requestFrom)
    return {
      user,
      userSkills,
      matchStatus: matched
        ? 'matched'
        : requestTo
        ? 'requested'
        : requestFrom
        ? 'requesting'
        : 'no-match',
    };
  }
}
