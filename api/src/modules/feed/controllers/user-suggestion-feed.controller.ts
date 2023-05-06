import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import mongoose from 'mongoose';
import { ParseObjectIdPipe } from '../../../common/pipes/pase-object-id.pipe';
import { UserSuggestionQueryDto } from '../dtos/requests/user-suggestion-query.dto';
import { UserSuggestionService } from '../services/user-suggestion.service';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { UserDto } from '../../user/dtos/responses/user.dto';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../user/schemas/user.schema';

@Controller('feed/suggestion')
export class UserSuggestionFeedController {
  constructor(private readonly userSuggestionService: UserSuggestionService) {}

  @UseGuards(AuthGuard)
  @Get('user/self')
  @HttpCode(HttpStatus.OK)
  async getSelfFeed(
    @CurrentUser() user: User,
    @Query() query: UserSuggestionQueryDto,
  ) {
    const { users, total, pageNumber, pageSize } =
      await this.userSuggestionService.suggestion(user._id, query);
    return new Pagination(
      users.map((user) => new UserDto(user)),
      pageSize,
      pageNumber,
      total,
    );
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  async getFeedByUserId(
    @Param('userId', ParseObjectIdPipe) userId: mongoose.Types.ObjectId,
    @Query() query: UserSuggestionQueryDto,
  ) {
    const { users, total, pageNumber, pageSize } =
      await this.userSuggestionService.suggestion(userId, query);
    return new Pagination(
      users.map((user) => new UserDto(user)),
      pageSize,
      pageNumber,
      total,
    );
  }
}
