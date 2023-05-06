import { ApiProperty } from "@nestjs/swagger";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { IsArray, IsIn, IsOptional, IsString } from "class-validator";
import { SKILL_STATUS } from "../../constants/skill.constant";
import { Transform } from "class-transformer";

export class SearchSkillDto extends SearchDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    q?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @Transform(({value}) => value.split(','))
    names?: Array<string>

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(SKILL_STATUS))
    status?: string;

} 