import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import mongoose, { FilterQuery, Model, ObjectId, Types } from 'mongoose';
import { UserService } from '../../user/services/user.service';
import { SkillService } from './skill.service';
import { InjectModel } from '@nestjs/mongoose';
import { UserSkill } from '../schemas/user-skill.schema';
import { CreateUserDto } from '../../user/dtos/requests/create-user.dto';
import { CreateUserSkillDto } from '../dtos/requests/create-user-skill.dot';
import { User } from '../../user/schemas/user.schema';
import { UpdateUserSkillDto } from '../dtos/requests/update-user-skill.dto';
import {
  NOT_ALLOW_UPDATE_FIELDS,
  USER_SKILL_EVENT,
  USER_SKILL_LIMIT,
} from '../constants/user-skill.constant';
import { omit } from 'lodash';
import { SearchUserSkillByUserDto } from '../dtos/requests/search-user-skill-by-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserSkillDto } from '../dtos/responses/user-skill.dto';
@Injectable()
export class UserSkillService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly skillService: SkillService,
    @InjectModel(UserSkill.name)
    private readonly userSkillModel: Model<UserSkill>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  // User cannot have more than 10 skills at once ?
  async addSkill(
    userSkill: CreateUserSkillDto,
    user: User,
  ): Promise<UserSkill> {
    const skill = await this.skillService.getSkillByName(userSkill.skill);
    // const exist = await this.userSkillModel.exists({userId: user._id, skill: skill.name});
    const existingUserSkills = await this.userSkillModel.find({
      userId: user._id,
    });
    if (existingUserSkills.length === USER_SKILL_LIMIT) {
      throw new BadRequestException(
        'You have exceeded the limit on the skills you can have on your profile at once',
      );
    }
    const exist = existingUserSkills.find((us) => us.skill === userSkill.skill);
    if (exist) {
      throw new BadRequestException(
        'You have already added this skill to your profile',
      );
    }
    const createdUserSkill = await this.userSkillModel.create({
      userId: user._id,
      skill: skill.name,
      proficiency: userSkill.proficiency,
      role: userSkill.role,
      about: userSkill.about,
    });

    await this.eventEmitter.emitAsync(USER_SKILL_EVENT.ADDED, new UserSkillDto(createdUserSkill))
    return createdUserSkill;
  }

  async removeSkill(skill: string, userId: Types.ObjectId): Promise<void> {
    const exist = await this.userSkillModel.exists({ userId: userId, skill });
    if (!exist) {
      throw new BadRequestException('Cannot remove skill that you do not have');
    }
    await this.userSkillModel.deleteOne({ userId: userId, skill });
    await this.eventEmitter.emitAsync(USER_SKILL_EVENT.REMOVED, {userId: userId, skill} as UserSkill)
  }

  async updateUserSkill(
    userSkill: UpdateUserSkillDto,
    skill: string,
    userId: Types.ObjectId,
  ): Promise<UserSkill> {
    const exist = await this.userSkillModel.exists({ userId: userId, skill });
    if (!exist) {
      throw new BadRequestException('Cannot update skill that you do not have');
    }
    const updatedUserSkill = await this.userSkillModel.findOneAndUpdate(
      { userId: userId, skill },
      omit(userSkill, NOT_ALLOW_UPDATE_FIELDS),
      { new: true },
    );
    return updatedUserSkill;
  }

  async advanceSearch(pipe: mongoose.PipelineStage[]) {
    return this.userSkillModel.aggregate(pipe);
  }

  async getUserSkills(
    userId: Types.ObjectId,
    query?: SearchUserSkillByUserDto,
  ) {
    const filter: FilterQuery<UserSkill> = { userId };

    if (query.role) {
      filter.role = query.role;
    }
    const [userSkills, total] = await Promise.all([
      this.userSkillModel
        .find(filter)
        .skip(query.pageNumber * query.pageSize)
        .limit(query.pageSize),
      this.userSkillModel.countDocuments(filter),
    ]);

    return {
      userSkills,
      total,
      pageSize: query.pageSize,
      pageNumber: query.pageNumber,
    };
  }
}
