import { ApiProperty } from "@nestjs/swagger";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { IsIn, IsOptional, IsString } from "class-validator";
import { SKILL_STATUS } from "../../constants/skill.constant";

export class SearchSkillDto extends SearchDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    q: string;

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(SKILL_STATUS))
    status: string;

    constructor(pageNumber: number, pageSize: number, q: string, status: string){

        super(pageNumber, pageSize)
        this.q = q;
        this.status = status;
    }
} 