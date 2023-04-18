import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateUserSkillDto } from '../dtos/requests/create-user-skill.dot';
import { UserSkillService } from '../services/user-skill.service';
import { UserSkillDto } from '../dtos/responses/user-skill.dto';
import { CurrentJwt } from '../../auth/decorators/current-jwt.decorator';
import { JwtAccessTokenPayloadDto } from '../../auth/dtos/request/jwt-access-token-payload.dto';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/schemas/user.schema';
import { UpdateUserSkillDto } from '../dtos/requests/update-user-skill.dto';
import { omit } from 'lodash';
import { NOT_ALLOW_SELF_UPDATE_FIELDS } from '../constants/user-skill.constant';
import { CurrentCurrent } from '../../auth/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Controller()
export class UserSkillController {
  constructor(
    private readonly userSkillService: UserSkillService,
    private readonly userService: UserService,
  ) {}

  @Post('user/self/skill')
  @HttpCode(HttpStatus.CREATED)
  async addSelfSkill(
    @Body() payload: CreateUserSkillDto,
    @CurrentCurrent() currentUser: User,
  ) {
    const userSkill = await this.userSkillService.addSkill(
      payload,
      currentUser,
    );
    return new UserSkillDto(userSkill).toSelfResponse();
  }

  @Delete('user/self/skill/:name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeSkill(
    @Param('name') skillName: string,
    @CurrentJwt() currentUser: JwtAccessTokenPayloadDto,
  ) {
    await this.userSkillService.removeSkill(skillName, currentUser.id);
  }

  @Put('user/self/skill/:name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateSkill(
    @Body() payload: UpdateUserSkillDto,
    @Param('name') skillName: string,
    @CurrentJwt() currentUser: JwtAccessTokenPayloadDto,
  ) {
    await this.userSkillService.updateUserSkill(
      omit(payload, NOT_ALLOW_SELF_UPDATE_FIELDS) as any,
      skillName,
      currentUser.id,
    );
  }

  @Get('user/self/skill')
  @HttpCode(HttpStatus.OK)
  async getSelfSkill(@CurrentJwt() currentUser: JwtAccessTokenPayloadDto) {
    const userSkills = await this.userSkillService.getUserSkills(currentUser.id);
    return userSkills.map((userSkill) => new UserSkillDto(userSkill).toSelfResponse());
  }

  @Get('user/:userId/skill')
  async getUserSkill(@Param('userId') userId: string) {
 
    const userSkills = await this.userSkillService.getUserSkills(userId);
    return userSkills.map((userSkill) => new UserSkillDto(userSkill).toPublicResponse());
  }
}
