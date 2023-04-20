import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query, UseGuards, forwardRef } from "@nestjs/common";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { ParseObjectIdPipe } from "../../../common/pipes/pase-object-id.pipe";
import { ObjectId } from "mongoose";
import { MatchService } from "../services/match.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { User } from "../../user/schemas/user.schema";
import { MATCH_STATUS, MATCH_USER_STATUS, NOT_ALLOW_USER_SEARCH_FIELDS } from "../constants/match.constant";
import { UserService } from "../../user/services/user.service";
import { MatchDto } from "../dto/responses/match.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SearchMatchQueryDto } from "../dto/requests/search-match-query.dto";
import { Pagination } from "../../../common/dtos/responses/pagination.dto";
import { omit } from "lodash";

@ApiTags('Match')
@UseGuards(AuthGuard)
@Controller()
export class MatchController {
    constructor(private readonly matchService: MatchService, @Inject(forwardRef(() => UserService)) private readonly userService: UserService){}

    @Post('user/self/match/:userId')
    @HttpCode(HttpStatus.OK)
    async createMatch(@CurrentUser() currentUser: User,@Param('userId', ParseObjectIdPipe) userId: ObjectId){
        const matchTarget = await this.userService.getById(userId.toString());
        const createdMatch = await this.matchService.createMatch(currentUser, MATCH_USER_STATUS.ACCEPTED, matchTarget, MATCH_USER_STATUS.PENDING);
        return new MatchDto(createdMatch);
    }

    @Put('user/self/match/:id/accept')
    @HttpCode(HttpStatus.NO_CONTENT)
    async acceptMatch(@CurrentUser() currentUser: User, @Param('id', ParseObjectIdPipe) id: ObjectId){
        await this.matchService.updateMatchUserStatus(id, currentUser._id, MATCH_USER_STATUS.ACCEPTED);
    }

    @Delete('user/self/match/:id/decline')
    @HttpCode(HttpStatus.NO_CONTENT)
    async rejectMatch(@CurrentUser() currentUser: User, @Param('id', ParseObjectIdPipe) id: ObjectId ){
        await this.matchService.updateMatchUserStatus(id, currentUser._id, MATCH_USER_STATUS.DECLINED)
    }

    @Get('user/self/match')
    async searchMatchByUser(@CurrentUser() currentUser: User,  @Query() query: SearchMatchQueryDto){
        const {matches, total, pageNumber, pageSize} = await this.matchService.searchMatchByUser(currentUser._id, omit({...query}, NOT_ALLOW_USER_SEARCH_FIELDS) as any);
        return new Pagination(matches, pageSize, pageNumber, total);
    }
}