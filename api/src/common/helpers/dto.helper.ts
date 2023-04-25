import { BadRequestException } from "@nestjs/common";

import { Types } from "mongoose";

export function toMongoObjectId({ value, key }): Types.ObjectId {
    if (Types.ObjectId.isValid(value)) {
        return  Types.ObjectId.createFromHexString(value) as any
    } else {
        throw new BadRequestException(`${key} is not a valid MongoId`);
    }
}