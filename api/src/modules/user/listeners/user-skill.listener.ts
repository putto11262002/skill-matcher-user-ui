import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { USER_SKILL_EVENT } from "../../skill/constants/user-skill.constant";
import { CreateUserSkillDto } from "../../skill/dtos/requests/create-user-skill.dot";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { UserSkillDto } from "../../skill/dtos/responses/user-skill.dto";

@Injectable()
export class UserSkillListener {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

    @OnEvent(USER_SKILL_EVENT.ADDED, {async: true})
    async handleUserSkillAdded(payload: UserSkillDto){
        await this.userModel.updateOne({_id: payload.userId}, {$addToSet: {'profile.skills': payload.skill}})
    }

    @OnEvent(USER_SKILL_EVENT.REMOVED, {async: true})
    async handleUserSkillRemoved(payload: UserSkillDto){
        await this.userModel.updateOne({_id: payload.userId}, {$pull: {'profile.skills': payload.skill}})
    }
}