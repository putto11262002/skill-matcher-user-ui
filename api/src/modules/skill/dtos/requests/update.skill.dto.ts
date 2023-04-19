import {ApiProperty} from '@nestjs/swagger'
import {IsString, IsNotEmpty, IsOptional, IsArray, IsIn} from 'class-validator'
import { SKILL_STATUS } from '../../constants/skill.constant';
export class UpdateSkillDto {
    // @ApiProperty()
    // @IsOptional()
    // @IsString()
    // name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsIn(Object.values(SKILL_STATUS))
    status: string;

    // @IsOptional()
    // @IsArray()
    // @IsString({each: true})
    // relatedSkills: string[];

    constructor(description: string, status: string){
    
        this.description = description;
        this.status = status;
     
    }
}