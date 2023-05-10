import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { toMongoObjectId } from "../../../../common/helpers/dto.helper";
import mongoose from "mongoose";

export class RequestMatchDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    userId: mongoose.Types.ObjectId
}
