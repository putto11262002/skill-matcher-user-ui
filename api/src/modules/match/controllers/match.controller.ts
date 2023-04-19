import { Controller, Delete, HttpCode, HttpStatus, Inject, Param, Post, Put, UseGuards, forwardRef } from "@nestjs/common";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { PaerseObjectIdPipe } from "../../../common/pipes/pase-object-id.pipe";
import { ObjectId } from "mongodb";
import { MatchService } from "../services/match.service";
import { CurrentCurrent } from "../../auth/decorators/current-user.decorator";
import { User } from "../../user/schemas/user.schema";
import { MATCH_USER_STATUS } from "../constants/match.constant";
import { UserService } from "../../user/services/user.service";
import { MatchDto } from "../dto/responses/match.dto";

@UseGuards(AuthGuard)
@Controller()
export class MatchController {
    constructor(private readonly matchService: MatchService, @Inject(forwardRef(() => UserService)) private readonly userService: UserService){}

    @Post('user/self/match/:userId')
    @HttpCode(HttpStatus.OK)
    async createMatch(@CurrentCurrent() currentUser: User,@Param('userId', PaerseObjectIdPipe) userId: ObjectId){
        const matchTarget = await this.userService.getById(userId.toString());
        const createdMatch = await this.matchService.createMatch(currentUser, MATCH_USER_STATUS.ACCEPTED, matchTarget, MATCH_USER_STATUS.PENDING);
        return new MatchDto(createdMatch);
    }

    @Put('user/self/match/accept')
    @HttpCode(HttpStatus.NO_CONTENT)
    async acceptMatch(){

    }

    @Delete('user/self/match')


    
}