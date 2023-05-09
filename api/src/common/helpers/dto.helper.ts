import { BadRequestException } from "@nestjs/common";

import mongoose, { Types } from "mongoose";

export function toMongoObjectId({ value, key }): Types.ObjectId {
    if (Types.ObjectId.isValid(value)) {
        return  Types.ObjectId.createFromHexString(value) as any
    } else {
        throw new BadRequestException(`Invalid ObjectId`);
    }
}

export const toMongoSort = ({value, key}): [string,  mongoose.SortOrder] => {
    const regex = /^\w+:(1|-1)$/
    if(regex.test(value)){
        
        return [value.split(':')[0], value.split(':')[1]]
    }
    throw new BadRequestException('Invalid sort query')
}