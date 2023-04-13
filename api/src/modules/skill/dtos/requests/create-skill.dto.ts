import {ApiProperty} from '@nestjs/swagger'
import {IsString, IsNotEmpty, IsOptional, IsArray, IsIn} from 'class-validator'
import { SKILL_STATUS } from '../../constants/skill.constant';
export class CreateSkillDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsIn(Object.values(SKILL_STATUS))
    status: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    relatedSkills: string[];

    constructor(name: string, description: string, status: string, relatedSkills: string[]){
        this.name = name;
        this.description = description;
        this.status = status;
        this.relatedSkills = relatedSkills;
    }
}