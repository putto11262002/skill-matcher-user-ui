import mongoose from "mongoose";
import { REVIEW_STATUS } from "../../constant/review.constant";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";
import { toMongoObjectId } from "../../../../common/helpers/dto.helper";

export class CreateReviewDto{
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    target: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsNumber()
    score: number;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsIn(Object.values(REVIEW_STATUS))
    status: string = REVIEW_STATUS.PUBLIC;
}