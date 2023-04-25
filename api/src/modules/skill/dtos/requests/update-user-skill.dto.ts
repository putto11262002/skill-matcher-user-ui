import { ApiProperty } from "@nestjs/swagger";
import { IsIn,  IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { USER_SKILL_ROLE } from "../../constants/user-skill.constant";


export class UpdateUserSkillDto{


    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Max(10)
    @Min(0)
    proficiency: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    about: string;

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(USER_SKILL_ROLE))
    role: string;

}