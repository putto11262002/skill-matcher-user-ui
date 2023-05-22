import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { ReviewService } from "../services/review.service";
import { CreateReviewDto } from "../dtos/requests/create-review.dto";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { User } from "../../user/schemas/user.schema";
import { REVIEW_STATUS } from "../constant/review.constant";
import { ReviewDto } from "../dtos/responses/review.dto";

@UseGuards(AuthGuard)
@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService){}

    @Post()
    async create(@Body() payload: CreateReviewDto, @CurrentUser() currentUser: User){
        const createdReview = await this.reviewService.createReview(currentUser._id, {...payload, status: REVIEW_STATUS.PUBLIC})
        return new ReviewDto(createdReview);
    }
}