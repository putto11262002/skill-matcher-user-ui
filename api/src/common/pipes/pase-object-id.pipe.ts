import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
    transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
   
        const valid = Types.ObjectId.isValid(value);
        if(!valid){
            throw new BadRequestException('Invalid ObjectId')
        }
        return Types.ObjectId.createFromHexString(value) as any;
    }
}

