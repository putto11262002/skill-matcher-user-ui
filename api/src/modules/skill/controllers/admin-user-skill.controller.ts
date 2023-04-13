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
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Roles('admin', 'root')
@UseGuards(RoleGuard)
@Controller('admin')
export class AdminUserSkillController {
  constructor(
    private readonly userSkillService: UserSkillService,
    private readonly userService: UserService,
  ) {}

  @Post('user/:userId/skill')
  @HttpCode(HttpStatus.CREATED)
  async addSelfSkill(
    @Body() payload: CreateUserSkillDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.getById(userId);
    const userSkill = await this.userSkillService.addSkill(
      payload,
      user,
    );
    return new UserSkillDto(userSkill).toAdminResponse();
  }

  @Delete('user/:userId/skill/:name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeSkill(
    @Param('name') skillName: string,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.getById(userId)
    await this.userSkillService.removeSkill(skillName, user);
  }

  @Put('user/:userId/skill/:name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateSkill(
    @Body() payload: UpdateUserSkillDto,
    @Param('name') skillName: string,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.getById(userId);
    await this.userSkillService.updateUserSkill(
      payload,
      skillName,
      user,
    );
  }

  @Get('user/:userId/skill')
  @HttpCode(HttpStatus.OK)
  async getSelfSkill(@Param('userId') userId: string) {
    const user = await this.userService.getById(userId)
    const userSkills = await this.userSkillService.getUserSkills(user);
    return userSkills.map((userSkill) => new UserSkillDto(userSkill).toAdminResponse());
  }

  @Get('user/:userId/skill')
  async getUserSkill(@Param('userId') userId: string) {
    const user = await this.userService.getById(userId);
    const userSkills = await this.userSkillService.getUserSkills(user);
    return userSkills.map((userSkill) => new UserSkillDto(userSkill).toAdminResponse());
  }
}
