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
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAccessTokenPayloadDto } from '../../auth/dtos/request/jwt-access-token-payload.dto';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/schemas/user.schema';
import { UpdateUserSkillDto } from '../dtos/requests/update-user-skill.dto';
import { omit } from 'lodash';
import { NOT_ALLOW_SELF_UPDATE_FIELDS } from '../constants/user-skill.constant';

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
    @CurrentUser() currentUser: User,
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
    @CurrentUser() currentUser: User,
  ) {
    await this.userSkillService.removeSkill(skillName, currentUser);
  }

  @Put('user/self/skill/:name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateSkill(
    @Body() payload: UpdateUserSkillDto,
    @Param('name') skillName: string,
    @CurrentUser() currentUser: User,
  ) {
    await this.userSkillService.updateUserSkill(
      omit(payload, NOT_ALLOW_SELF_UPDATE_FIELDS),
      skillName,
      currentUser,
    );
  }

  @Get('user/self/skill')
  @HttpCode(HttpStatus.OK)
  async getSelfSkill(@CurrentUser() currentUser: User) {
    const userSkills = await this.userSkillService.getUserSkills(currentUser);
    return userSkills.map((userSkill) => new UserSkillDto(userSkill).toSelfResponse());
  }

  @Get('user/:userId/skill')
  async getUserSkill(@Param('userId') userId: string) {
    const user = await this.userService.getById(userId);
    const userSkills = await this.userSkillService.getUserSkills(user);
    return userSkills.map((userSkill) => new UserSkillDto(userSkill).toPublicResponse());
  }
}
