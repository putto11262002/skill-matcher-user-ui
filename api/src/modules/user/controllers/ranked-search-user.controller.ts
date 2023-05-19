import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RankedSearchUserService } from '../services/ranked-search-user.service';
import { SearchDto } from '../../../common/dtos/requests/search.dto';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../schemas/user.schema';
import { RankedSearchDto } from '../dtos/requests/ranked-search.dto';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { UserDto } from '../dtos/responses/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('user/self/rank')
export class RankedSearchUserController {
  constructor(private readonly rankedSearchService: RankedSearchUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRank(@Query() query: SearchDto, @CurrentUser() currentUser: User) {
    const { users, total, pageNumber, pageSize } =
      await this.rankedSearchService.search(currentUser._id, {
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
      } as RankedSearchDto);
      return new Pagination(
        users.map(u => new UserDto(u).toPublicResponse()),
        pageSize,
        pageNumber,
        total
      )
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  async rankedSearch(@Query() query: RankedSearchDto, @CurrentUser() currentUser: User) {
    const { users, total, pageNumber, pageSize } =
      await this.rankedSearchService.search(currentUser._id, {
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        q: query.q,
        skills: query.skills,
        skillRole: query.skillRole
      } as RankedSearchDto);
      return new Pagination(
        users.map(u => new UserDto(u).toPublicResponse()),
        pageSize,
        pageNumber,
        total
      )
  }

}
