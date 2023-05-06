import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SearchUserFeedService } from '../services/search-user-feed.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../user/schemas/user.schema';
import { SearchUserFeedQueryDto } from '../dtos/requests/search-user-query.dto';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { UserDto } from '../../user/dtos/responses/user.dto';

@Controller('feed')
export class SearchUserFeedController {
  constructor(private readonly searchUserFeedService: SearchUserFeedService) {}

  @UseGuards(AuthGuard)
  @Get('user/self')
  @HttpCode(HttpStatus.OK)
  async searchSelfFeed(
    @CurrentUser() user: User,
    @Query() query: SearchUserFeedQueryDto,
  ) {
    const { users, total, pageNumber, pageSize } =
      await this.searchUserFeedService.search(user._id, query);

    return new Pagination(
      users.map((u) => new UserDto(u)),
      pageSize,
      pageNumber,
      total,
    );
  }
}
