import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SearchUserFeedService } from '../services/search-user.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../user/schemas/user.schema';
import { SearchUserFeedQueryDto } from '../dtos/requests/search-user-query.dto';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { UserDto } from '../../user/dtos/responses/user.dto';
import { MatchService } from '../../match/services/match.service';

@Controller('feed/search')
export class SearchUserFeedController {
  constructor(
    private readonly searchUserFeedService: SearchUserFeedService,
    private readonly matchService: MatchService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('user/self')
  @HttpCode(HttpStatus.OK)
  async searchSelfFeed(
    @CurrentUser() user: User,
    @Query() query: SearchUserFeedQueryDto,
  ) {
    const { users, total, pageNumber, pageSize } =
      await this.searchUserFeedService.search(user._id, query);

    /**
     * If search contain both matched and unmatched user add a field to indicate matching status
     */

    const { matches } = await this.matchService.getMatchByUser(user._id);
    const matchedUser = new Set<string>();
    matches.forEach((match) => {
      const u = match.users.find((u) => !u.userId.equals(user._id));
      matchedUser.add(u.userId.toHexString());
    });

    return new Pagination(
      users.map((u) =>
        matchedUser.has(u._id.toHexString())
          ? new UserDto(u).toMatchedUserResponse()
          : new UserDto(u).toPublicResponse(),
      ),
      pageSize,
      pageNumber,
      total,
    );
  }
}