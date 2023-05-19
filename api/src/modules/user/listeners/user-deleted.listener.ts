import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserSkill } from "../schemas/user-skill.schema";
import { Model } from "mongoose";
import { OnEvent } from "@nestjs/event-emitter";
import { USER_EVENT } from "../constants/user.constant";
import { UserDto } from "../dtos/responses/user.dto";

@Injectable()
export class UserDletedListener {

    constructor(@InjectModel(UserSkill.name) private readonly userSkillModel: Model<UserSkill>){}

    @OnEvent(USER_EVENT.DELETED, {async: true})
    async handleRemoveAllUserSkills(user: UserDto){
        await this.userSkillModel.deleteMany({userId: user._id})
    }

}