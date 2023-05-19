import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdvanceSearchUserService } from '../services/advance-search-user.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../schemas/user.schema';
import { AdvanceSearchDto } from '../dtos/requests/advance-search-user.dto';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { UserDto } from '../dtos/responses/user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('user/self')
export class AdvanceSearchUserController {
  constructor(
    private readonly advanceSeaarchUserService: AdvanceSearchUserService,
  ) {}

  @Get('match/user')
  @HttpCode(HttpStatus.OK)
  async searchMatchedUsers(
    @CurrentUser() currentUser: User,
    @Query() query: AdvanceSearchDto,
  ) {
    const { users, total, pageNumber, pageSize } =
      await this.advanceSeaarchUserService.searchMatchedUsers(currentUser._id, {
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        q: query.q,
        skills: query.skills,
      } as AdvanceSearchDto);

    return new Pagination(
      users.map((u) => new UserDto(u).toMatchedUserResponse()),
      pageSize,
      pageNumber,
      total,
    );
  }

  @Get('match/requested/user')
  @HttpCode(HttpStatus.OK)
  async searchMatchRequestedUsers(
    @CurrentUser() currentUser: User,
    @Query() query: AdvanceSearchDto,
  ) {
    const { users, total, pageNumber, pageSize } =
      await this.advanceSeaarchUserService.searchRequestedUsers(
        currentUser._id,
        {
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          q: query.q,
          skills: query.skills,
        } as AdvanceSearchDto,
      );

    return new Pagination(
      users.map((u) => new UserDto(u).toMatchedUserResponse()),
      pageSize,
      pageNumber,
      total,
    );
  }

  @Get('match/requesting/user')
  @HttpCode(HttpStatus.OK)
  async searchMatchRequestingUsers(
    @CurrentUser() currentUser: User,
    @Query() query: AdvanceSearchDto,
  ) {
    const { users, total, pageNumber, pageSize } =
      await this.advanceSeaarchUserService.searchRequestingUsers(
        currentUser._id,
        {
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          q: query.q,
          skills: query.skills,
        } as AdvanceSearchDto,
      );

    return new Pagination(
      users.map((u) => new UserDto(u).toMatchedUserResponse()),
      pageSize,
      pageNumber,
      total,
    );
  }
}
