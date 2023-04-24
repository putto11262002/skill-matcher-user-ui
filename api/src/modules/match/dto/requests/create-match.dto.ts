import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { property } from "lodash";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { toMongoObjectId } from "../../../../common/helpers/dto.helper";

export class createMatchDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Types.ObjectId)
    @Transform(toMongoObjectId)
    userId: Types.ObjectId
}