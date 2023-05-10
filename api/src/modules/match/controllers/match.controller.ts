import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import mongoose from 'mongoose';
import { MatchService } from '../services/match.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../user/schemas/user.schema';
import { UserService } from '../../user/services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestMatchDto } from '../dto/requests/request-match.dto';

@ApiTags('Match')
@UseGuards(AuthGuard)
@Controller()
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
  ) {}

  @Post('match-request')
  @HttpCode(HttpStatus.NO_CONTENT)
  async requestMatch(
    @CurrentUser() currentUser: User,
    @Body() payload: RequestMatchDto,
  ) {
    await this.matchService.requestMatch(currentUser._id, payload.userId);
  }

  @Put('match-request/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  async acceptRequest(
    @CurrentUser() currentUser: User,
    @Body() payload: RequestMatchDto
  ){
    await this.matchService.acceptRequestAndMatch(payload.userId, currentUser._id);
  }

  @Put('match-request/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  async declineRequest(
    @CurrentUser() currentUser: User,
    @Body() payload: RequestMatchDto
  ){
    await this.matchService.rejectRequest(payload.userId, currentUser._id);
  }

  @Delete('match/user/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unmatch(
    @CurrentUser() currentUser: User,
    @Param('userId') userId: mongoose.Types.ObjectId
  ){
    await this.matchService.unmatch(currentUser._id, userId)
  }

}
