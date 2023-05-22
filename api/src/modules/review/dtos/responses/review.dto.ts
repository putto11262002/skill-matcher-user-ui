import { Review } from "../../schemas/review.schema";

export class ReviewDto {
    _id: string;

    source: string;
   
    target: string;
 
    status: string;

   
    score: number;

  
    message: string;

    constructor(review: Review){
        this._id = review?._id?.toHexString();
        this.source = review?.source?.toHexString();
        this.target = review?.source?.toHexString();
        this.status = review.status;
        this.score = review.score;
        this.message = review.message;
    }

}