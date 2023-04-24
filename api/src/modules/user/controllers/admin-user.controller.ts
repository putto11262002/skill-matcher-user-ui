import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { Roles } from '../../../modules/auth/decorators/roles.decorator';
import { AuthGuard } from '../../../modules/auth/guards/auth.guard';
import { RoleGuard } from '../../../modules/auth/guards/role.guard';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { SearchUserDto } from '../dtos/requests/search-user.dto';
import { UpdateUserDto } from '../dtos/requests/update-user.dto';
import { UserDto } from '../dtos/responses/user.dto';
import { UserService } from '../services/user.service';
import { ParseObjectIdPipe } from '../../../common/pipes/pase-object-id.pipe';
import { Types } from 'mongoose';

@ApiTags('Admin')
@Roles('admin', 'root')
@UseGuards(RoleGuard)
@Controller('admin/user')
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() payload: CreateUserDto) {
    await this.userService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(@Body() payload: UpdateUserDto, @Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    await this.userService.updateById(id, payload);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException('User with this id does not exist.');
    }

    return new UserDto(user).toAdminUserResponse();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    await this.userService.deleteById(id);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async searchUser(@Query() query: SearchUserDto) {
    const { users, total } = await this.userService.search(query);
    return new Pagination(
      users.map((user) => new UserDto(user).toAdminUserResponse()),
      query.pageSize,
      query.pageNumber,
      total,
    );
  }
}
