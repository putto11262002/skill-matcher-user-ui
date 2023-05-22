import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsIn, IsOptional } from "class-validator";
import mongoose from "mongoose";
import { toMongoObjectId } from "../../../../common/helpers/dto.helper";
import { REVIEW_STATUS } from "../../constant/review.constant";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";

export class SearchReviewQueryDto extends SearchDto {
    @ApiProperty()
    @IsOptional()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    source: mongoose.Types.ObjectId;

    @ApiProperty()
    @IsOptional()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    target: mongoose.Types.ObjectId;

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(REVIEW_STATUS))
    status: string;
}