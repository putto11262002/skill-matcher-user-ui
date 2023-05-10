import { ObjectId } from "mongoose";
import { UserSkill } from "../../../user/schemas/user-skill.schema";

export class UserSkillDto {
    userId: string;

    skill: string;

    role: string;

    about: string;

    proficiency: number;

    constructor(userSkill: UserSkill){
        this.userId = userSkill.userId.toHexString();
        this.skill =  userSkill.skill;
        this.role = userSkill.role;
        this.about = userSkill.about;
        this.proficiency = userSkill.proficiency;
    }

    toAdminResponse(){
        return {
            ...this
        }
    }

    toSelfResponse(){
        return {
            ...this
        }
    }

    toPublicResponse(){
        return {
            ...this
        }
    }
}