import mongoose from "mongoose";
import { REVIEW_STATUS } from "../../constant/review.constant";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";
import { toMongoObjectId } from "../../../../common/helpers/dto.helper";

export class CreateReviewDto{
    @ApiProperty({type: String, description: 'Id of the target user'})
    @IsNotEmpty()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    target: mongoose.Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    score: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(Object.values(REVIEW_STATUS))
    status: string = REVIEW_STATUS.PUBLIC;
}