import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Type,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ParseObjectIdPipe } from '../../../common/pipes/pase-object-id.pipe';
import { ObjectId, Types } from 'mongoose';
import { MatchService } from '../services/match.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../user/schemas/user.schema';
import {
  MATCH_USER_STATUS,
  NOT_ALLOW_USER_SEARCH_FIELDS,
} from '../constants/match.constant';
import { UserService } from '../../user/services/user.service';
import { MatchDto } from '../dto/responses/match.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchMatchQueryDto } from '../dto/requests/search-match-query.dto';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { omit } from 'lodash';
import { createMatchDto } from '../dto/requests/create-match.dto';

@ApiTags('Match')
@UseGuards(AuthGuard)
@Controller()
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Post('user/self/match')
  @HttpCode(HttpStatus.OK)
  async createMatch(
    @CurrentUser() currentUser: User,
    @Body() payload: createMatchDto,
  ) {
    const matchTarget = await this.userService.getById(payload.userId);
    const createdMatch = await this.matchService.createMatch(
      currentUser,
      MATCH_USER_STATUS.ACCEPTED,
      matchTarget,
      MATCH_USER_STATUS.PENDING,
    );
    return new MatchDto(createdMatch);
  }

  @Put('user/self/match/:userId/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  async acceptMatch(
    @CurrentUser() currentUser: User,
    @Param('userId', ParseObjectIdPipe) otherId: Types.ObjectId,
  ) {
    await this.matchService.acceptMatch(currentUser._id, otherId);
  }

  @Delete('user/self/match/:userId/decline')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectMatch(
    @CurrentUser() currentUser: User,
    @Param('userId', ParseObjectIdPipe) otherId: Types.ObjectId,
  ) {
    await this.matchService.declineMatch(currentUser._id, otherId);
  }

  // @Get('user/self/match/:id')
  // @HttpCode(HttpStatus.OK)
  // async getMyMatch(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser() currentUser: User){
  //   const match = await this.matchService.getMatch(id, currentUser._id);
  //   return new MatchDto(match);
  // }

  @Delete('user/self/match/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unmatch(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser() user: User,
  ) {
    await this.matchService.deleteMatch(id, user._id);
  }

  @Get('user/self/match')
  async searchMatchByUser(
    @CurrentUser() currentUser: User,
    @Query() query: SearchMatchQueryDto,
  ) {
    const { matches, total, pageNumber, pageSize } =
      await this.matchService.searchMatches({
        includeIds: [currentUser._id],
        ...query,
      });
    return new Pagination(matches, pageSize, pageNumber, total);
  }
}
