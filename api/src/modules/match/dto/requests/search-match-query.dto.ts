import { ApiProperty } from "@nestjs/swagger";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { IsArray, IsIn, IsOptional, IsString } from "class-validator";
import { MATCH_STATUS, MATCH_USER_STATUS } from "../../constants/match.constant";
import mongoose, { ObjectId } from "mongoose";
import { Transform, Type } from "class-transformer";
import { toMongoObjectId } from "../../../../common/helpers/dto.helper";


export class SearchMatchQueryDto extends SearchDto {
    @ApiProperty({})
    @IsOptional()
    @IsIn(Object.values(MATCH_STATUS))
    status: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @Type(() => Array<mongoose.Types.ObjectId>)
    @Transform(({value}) => value.split(',').map(id => toMongoObjectId({value: id, key: undefined})))
    includeIds: Array<mongoose.Types.ObjectId>;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @Type(() => Array<mongoose.Types.ObjectId>)
    @Transform(({value}) => value.split(',').map(id => toMongoObjectId({value: id, key: undefined})))
    excludeIds: Array<mongoose.Types.ObjectId>

    
}