import mongoose, { Model, mongo } from 'mongoose';
import { MatchService } from '../../match/services/match.service';
import { CreateReviewDto } from '../dtos/requests/create-review.dto';
import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from '../schemas/review.schema';
import { REVIEW_STATUS } from '../constant/review.constant';
import { SearchReviewQueryDto } from '../dtos/requests/search-review-query-dto';

export class ReviewService {
  constructor(
    private readonly matchService: MatchService,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async createReview(source: mongoose.Types.ObjectId, review: CreateReviewDto) {
    // check if match exist if not throw forbiden error
    const matchExist = await this.matchService.matchExists(
      source,
      review.target,
    );
    if (!matchExist) {
      throw new ForbiddenException();
    }

    // check if the user have already leave a review
    const reviewExist = await this.reviewExists(source, review.target);
    if(reviewExist){
        throw new ConflictException("Review already exist");
    }

    // create a review
    const createdReview = await this.reviewModel.create({
        source,
        target: review.target,
        message: review.message,
        status: review.status ? review.status : REVIEW_STATUS.PUBLIC,
        score: review.score
    })
    return createdReview;
  }


  async reviewExists(source: mongoose.Types.ObjectId, target: mongoose.Types.ObjectId){
    const _id = await this.reviewModel.exists({
        source,
        target
    })
    return Boolean(_id)
  }

  async reviewEistsById(id: mongoose.Types.ObjectId){
    const _id = await this.reviewModel.exists({_id: id});
    return Boolean(_id);
  }

  async updateReviewStatus(id: mongoose.Types.ObjectId, status: string) {
    const review = await this.getReviewByIdOrThrow(id);
    await this.reviewModel.updateOne({_id: id}, {status: status})
  }

  async getReviewById(id: mongoose.Types.ObjectId) {
    const review = await this.reviewModel.findOne({_id: id});
    return review;
  }

  async getReviewByIdOrThrow(id: mongoose.Types.ObjectId) {
    const review = await this.getReviewById(id);
    if(!review){
        throw new NotFoundException('Review does not exist');
    }
    return review;
  }

  async getReviews(query: SearchReviewQueryDto) {
    const filter: mongoose.FilterQuery<Review> = {};
    if(query.source){
        filter.source = query.source;
    }

    if(query.target){
        filter.target = query.target
    }
    
    if(query.status){
        filter.status = query.status;
    }

    const [reviews, total] = await Promise.all([
        this.reviewModel.find(filter).sort(query.sort).skip(query.pageNumber * query.pageSize).limit(query.pageSize),
        this.reviewModel.countDocuments(filter)
    ])

    return {reviews, total, pageNumber: query.pageNumber, pageSize: query.pageSize}
  }

  async deleteReview(id: mongoose.Types.ObjectId) {
    const exist = await this.reviewEistsById(id);
    if(!exist){
        throw new NotFoundException('Review does not exist');
    }
    await this.reviewModel.deleteOne({_id: id});
  }
}
