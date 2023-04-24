import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { USER_SKILL_ROLE } from "../../constants/user-skill.constant";
import { Transform, Type } from "class-transformer";
import { Types } from "mongoose";

export class CreateUserSkillDto{


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    skill: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Max(10)
    @Min(0)
    proficiency: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    about: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(Object.values(USER_SKILL_ROLE))
    role: string;

}