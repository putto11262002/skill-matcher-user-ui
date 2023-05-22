import mongoose from "mongoose";
import { MatchService } from "../../match/services/match.service";
import { CreateReviewDto } from "../dtos/requests/create-review-response.dto";

export class ReviewService {
    
    constructor(private readonly matchService: MatchService){}

    async createReview(source: mongoose.Types.ObjectId, review: CreateReviewDto){
        
    }

    async updateReviewStatus(){

    }

    async getReviewById(id: mongoose.Types.ObjectId){

    }

    async getReviews(){}

    async deleteReview(){

    }


}