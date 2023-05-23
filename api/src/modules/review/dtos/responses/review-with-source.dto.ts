import { UserDto } from "../../../user/dtos/responses/user.dto";
import { User } from "../../../user/schemas/user.schema";
import { Review } from "../../schemas/review.schema";

export class ReviewWithSourceDto {
    _id: string;

    source?: UserDto;
   
    target: string;
 
    status: string;

   
    score: number;

  
    message: string;

    constructor(review: Review, source: User){
        this._id = review?._id?.toHexString();
        this.source = source ? new UserDto(source) : undefined;
        this.target = review?.target?.toHexString();
        this.status = review.status;
        this.score = review.score;
        this.message = review.message;
    }

}