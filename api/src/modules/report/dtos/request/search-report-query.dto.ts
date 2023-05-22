import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import * as  mongoose from "mongoose";
import { toMongoObjectId } from "../../../../common/helpers/dto.helper";
import { Optional } from "@nestjs/common";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";

export class SearchReportQueryDto extends SearchDto {

    @ApiProperty()
    @IsOptional()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    source?: mongoose.Types.ObjectId;

    @ApiProperty()
    @IsOptional()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    target?: mongoose.Types.ObjectId;


    @ApiProperty()
    @IsOptional()
    @IsArray()
    @Transform(({value}) => value?.split(','))
    categories?: string[];
}