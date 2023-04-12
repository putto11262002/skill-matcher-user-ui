import { ObjectId } from "mongoose";
import { UserSkill } from "../../schemas/user-skill.schema";

export class UserSkillDto {
    userId: ObjectId | string;

    skill: string;

    role: string;

    about: string;

    proficiency: number;

    constructor(userSkill: UserSkill){
        this.userId = userSkill.userId;
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