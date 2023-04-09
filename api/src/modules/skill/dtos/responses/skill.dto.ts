import { ApiProperty } from "@nestjs/swagger";
import { Skill } from "../../schemas/skill.schema";

export class SkillDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    relatedSkills: string[];

    constructor(skill: Skill){
        this.name = skill.name;
        this.description = skill.description;
        this.status = skill.status;
        this.relatedSkills = skill.relatedSkills;
        skill._id
    }

    toAdminResponse(): Partial<SkillDto>{
        return {
            ...this
        }
    }

    toUserResponse(): Partial<SkillDto> {
        return {
            name: this.name,
            description: this.description,
            relatedSkills: this.relatedSkills
        }
    }
}