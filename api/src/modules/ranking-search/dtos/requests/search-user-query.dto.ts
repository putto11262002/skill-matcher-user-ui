import { ApiProperty } from "@nestjs/swagger";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { IsArray, IsBoolean, IsIn, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { USER_SKILL_ROLE } from "../../../skill/constants/user-skill.constant";
import { MATCH_STATUS } from "../../constant";

export class SearchUserFeedQueryDto extends SearchDto {

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
    @IsIn(Object.values(MATCH_STATUS))
    match?: string;

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(USER_SKILL_ROLE))
     skillRole?: string;

}