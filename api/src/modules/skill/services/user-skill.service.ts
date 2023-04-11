import {BadRequestException, Inject, Injectable, forwardRef} from "@nestjs/common"
import { Model, ObjectId } from "mongoose";
import { UserService } from "../../user/services/user.service";
import { SkillService } from "./skill.service";
import { InjectModel } from "@nestjs/mongoose";
import { UserSkill } from "../schemas/user-skill.schema";
import { CreateUserDto } from "../../user/dtos/requests/create-user.dto";
import { CreateUserSkillDto } from "../dtos/requests/create-user-skill.dot";
import { User } from "../../user/schemas/user.schema";
import { UpdateUserSkillDto } from "../dtos/requests/update-user-skill.dto";
import { NOT_ALLOW_UPDATE_FIELDS } from "../constants/user-skill.constant";
import {omit} from 'lodash'
@Injectable()
export class UserSkillService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly skillService: SkillService,
        @InjectModel(UserSkill.name)
        private readonly userSkillModel: Model<UserSkill>
    ){}

    // User cannot have more than 10 skills at once ?
    async addSkill(userSkill: CreateUserSkillDto, user: User): Promise<UserSkill>{
        const skill = await this.skillService.getSkillByName(userSkill.skill);
        const exist = await this.userSkillModel.exists({userId: user._id, skill: skill.name});
        if(exist){
            throw new BadRequestException('You have already added this skill to your profile')
        }
        const createdUserSkill = await this.userSkillModel.create({
            userId: user._id,
            skill: skill.name,
            proficiency: userSkill.proficiency,
            role: userSkill.role
        })
        return createdUserSkill;
    }

    async removeSkill(skill: string, user: User): Promise<void> {
        const exist = await this.userSkillModel.exists({userId: user._id, skill});
        if(!exist){
            throw new BadRequestException('Cannot remove skill that you do not have')
        }
        await this.userSkillModel.deleteOne({userId: user._id, skill});
    }

    async updateUserSkill(userSkill: UpdateUserSkillDto, skill: string,  user: User): Promise<UserSkill>{
        const exist = await this.userSkillModel.exists({userId: user._id, skill});
        if(!exist){
            throw new BadRequestException('Cannot update skill that you do not have')
        }
       const updatedUserSkill = await this.userSkillModel.findOneAndUpdate({userId: user._id, skill}, omit(userSkill, NOT_ALLOW_UPDATE_FIELDS), {new: true})
       return updatedUserSkill;
    }

    async getUserSkills(user: User){
        const skills = await this.userSkillModel.find({userId: user._id});
        return skills;
    }
}