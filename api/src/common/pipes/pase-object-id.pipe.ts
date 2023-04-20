import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
    transform(value: any, metadata: ArgumentMetadata): ObjectId {
   
        const valid = ObjectId.isValid(value);
        if(!valid){
            throw new BadRequestException('Invalid ObjectId')
        }
        return ObjectId.createFromHexString(value);
    }
}

