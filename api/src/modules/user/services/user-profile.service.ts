import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSkillService } from './user-skill.service';
import { MatchService } from '../../match/services/match.service';
import mongoose from 'mongoose';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly userSkillService: UserSkillService,
    private readonly matchService: MatchService,
  ) {}

  async getUserProfile(getById: mongoose.Types.ObjectId,userId: mongoose.Types.ObjectId){
    const user = await this.userService.getByIdOrThow(userId);
    const [matched, {userSkills}] = await Promise.all([
      this.matchService.matchExists(getById, userId),
      this.userSkillService.getUserSkills(userId)
    ]);
    return {user, userSkills, matched: Boolean(matched)}
  }
}
