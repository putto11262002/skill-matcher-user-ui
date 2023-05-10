import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, IsArray, IsIn } from "class-validator";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { USER_SKILL_ROLE } from "../../constants/user-skill.constant";

export class AdvanceSearchDto extends SearchDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    q?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @Transform(({value}) => value.split(','))
    skills?: string[];

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(USER_SKILL_ROLE))
    skillRole?: string;

}