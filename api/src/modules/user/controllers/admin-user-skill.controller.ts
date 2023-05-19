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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateUserSkillDto } from '../dtos/requests/create-user-skill.dot';
import { UserSkillService } from '../services/user-skill.service';
import { UserSkillDto } from '../../skill/dtos/responses/user-skill.dto';
import { CurrentJwt } from '../../auth/decorators/current-jwt.decorator';
import { JwtAccessTokenPayloadDto } from '../../auth/dtos/request/jwt-access-token-payload.dto';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { UpdateUserSkillDto } from '../dtos/requests/update-user-skill.dto';
import { omit } from 'lodash';
import { NOT_ALLOW_SELF_UPDATE_FIELDS } from '../constants/user-skill.constant';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ParseObjectIdPipe } from '../../../common/pipes/pase-object-id.pipe';
import { Types } from 'mongoose';
import { SearchUserSkillByUserDto } from '../dtos/requests/search-user-skill-by-user.dto';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
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
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
  ) {
    
    const userSkill = await this.userSkillService.addSkill(
      payload,
      userId
    );
    return new UserSkillDto(userSkill).toAdminResponse();
  }

  @Delete('user/:userId/skill/:name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeSkill(
    @Param('name') skillName: string,
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
  ) {
    await this.userSkillService.removeSkill(skillName, userId);
  }

  @Put('user/:userId/skill/:name')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateSkill(
    @Body() payload: UpdateUserSkillDto,
    @Param('name') skillName: string,
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
  ) {
  
    await this.userSkillService.updateUserSkill(
      payload,
      skillName,
      userId,
    );
  }

  @Get('user/:userId/skill')
  @HttpCode(HttpStatus.OK)
  async getSelfSkill(@Param('userId', ParseObjectIdPipe) userId: Types.ObjectId, @Query() query: SearchUserSkillByUserDto) {
  
    const {userSkills, total, pageNumber, pageSize} = await this.userSkillService.getUserSkills(userId, query);
    return new Pagination(userSkills.map((userSkill) => new UserSkillDto(userSkill).toAdminResponse()), pageSize, pageNumber, total);
  }


}
