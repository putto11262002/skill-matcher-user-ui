import { ApiProperty } from "@nestjs/swagger";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { IsArray, IsIn, IsOptional, IsString } from "class-validator";
import { MATCH_STATUS, MATCH_USER_STATUS } from "../../constants/match.constant";
import { ObjectId } from "mongodb";

export class MatchSearchQueryDto extends SearchDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsIn(Object.values(MATCH_STATUS))
    status: string;

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(MATCH_USER_STATUS))
    selfStatus: string;

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(MATCH_USER_STATUS))
    otherStatus: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    q: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    otherIds: Array<ObjectId | string>;

    constructor(pageNumber: number, pageSize: number, status: string, selfStatus: string, otherStatus: string, q: string, otherIds: Array<ObjectId | string>){
        super(pageNumber, pageSize)
        this.status = status;
        this.selfStatus = selfStatus;
        this.otherStatus  = otherStatus
        this.q = q;
        this.otherIds = otherIds;
    }
}