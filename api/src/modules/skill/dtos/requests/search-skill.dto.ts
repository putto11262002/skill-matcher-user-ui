import { ApiProperty } from "@nestjs/swagger";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { IsOptional, IsString } from "class-validator";

export class SearchSkillDto extends SearchDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    q: string;
    constructor(pageNumber: number, pageSize: number, q: string){

        super(pageNumber, pageSize)
        this.q = q;
    }
} 