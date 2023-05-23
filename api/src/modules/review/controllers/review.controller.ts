import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Next,
  Param,
  ParseBoolPipe,
  Post,
  Query,
  Req,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dtos/requests/create-review.dto';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../user/schemas/user.schema';
import { REVIEW_STATUS } from '../constant/review.constant';
import { ReviewDto } from '../dtos/responses/review.dto';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../../common/pipes/pase-object-id.pipe';
import mongoose from 'mongoose';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';


@ApiSecurity('beaerAuth')
@ApiTags('Review')
@UseGuards(AuthGuard)
@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('review')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() payload: CreateReviewDto,
    @CurrentUser() currentUser: User,
  ) {
    const createdReview = await this.reviewService.createReview(
      currentUser._id,
      { ...payload, status: REVIEW_STATUS.PUBLIC },
    );
    return new ReviewDto(createdReview);
  }

  @ApiParam({name: 'userId', type: String})
  @Get('user/:userId/review')
  @HttpCode(HttpStatus.OK)
  async getReviewWithSourceByUserId(
    @Param('userId', ParseObjectIdPipe) userId: mongoose.Types.ObjectId, @Query('withSource', ParseBoolPipe) withSource: boolean,
    @Next() next: any,
    @Res() res: any
  ) {
    
    if(!withSource){
     
      return next();
    }

    

    const {reviews, total, pageNumber, pageSize} = await this.reviewService.getReviewsWithSource({target: userId, status: REVIEW_STATUS.PUBLIC});
    console.log(reviews)
    return res.send(new Pagination(
      reviews,
      pageSize,
      pageNumber,
      total
  ))
  }


  @Get('user/:userId/review')
  @HttpCode(HttpStatus.OK)
  async getReviewByUserId(
    @Param('userId', ParseObjectIdPipe) userId: mongoose.Types.ObjectId,
  ) {

    const {reviews, total, pageNumber, pageSize} = await this.reviewService.getReviews({target: userId, status: REVIEW_STATUS.PUBLIC});
    return new Pagination(
        reviews.map(r => new ReviewDto(r)),
        pageSize,
        pageNumber,
        total
    )
  }
}
