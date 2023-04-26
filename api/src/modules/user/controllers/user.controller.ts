import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentJwt } from '../../auth/decorators/current-jwt.decorator';
import { JwtAccessTokenPayloadDto } from '../../auth/dtos/request/jwt-access-token-payload.dto'; 
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UpdateUserDto } from '../dtos/requests/update-user.dto';
import { UserDto } from '../dtos/responses/user.dto';
import { UserService } from '../services/user.service';
import { omit } from 'lodash';
import {
  NOT_ALLOWED_SELF_UPDATE,
  ONLY_ADMIN_SEARCH_FIELDS,
  USER_AVATAR_MAX_SIZE,
  USER_STATUS,
} from '../constants/user.constant';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { SearchUserDto } from '../dtos/requests/search-user.dto';
import { Pagination } from '../../../common/dtos/responses/pagination.dto';
import { ParseObjectIdPipe } from '../../../common/pipes/pase-object-id.pipe';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '../../file/dto/file.dto';
import { ImageValidator } from '../../file/validators/image.validator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('self')
  @HttpCode(HttpStatus.OK)
  async getSelf(@CurrentJwt() currentUser: JwtAccessTokenPayloadDto) {
    const user = await this.userService.getById(currentUser.id);
    return new UserDto(user).toSelfResponse();
  }

  @UseGuards(AuthGuard)
  @Put('self')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateSelf(
    @CurrentJwt() currentUser: JwtAccessTokenPayloadDto,
    @Body() payload: UpdateUserDto,
    @Request() req
  ) {
    console.log(req.body, payload)
    await this.userService.updateById(
      currentUser.id,
      omit(payload, NOT_ALLOWED_SELF_UPDATE) as UpdateUserDto,
    );
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException('User with this id does not exist.');
    }
    // check relationship between users to determie reponse types

    return new UserDto(user).toPublicResponse();
  }


  @UseGuards(AuthGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  async searchUser(@Query() query: SearchUserDto, @CurrentJwt() currentUser: JwtAccessTokenPayloadDto) {
    const { users, total } = await this.userService.search(
      omit({...query, status: USER_STATUS.ACTIVE, excludeIds: [currentUser.id], roles: ['user']}, ONLY_ADMIN_SEARCH_FIELDS) as SearchUserDto,
    );
    return new Pagination(
      users.map((user) => new UserDto(user)),
      query.pageSize,
      query.pageNumber,
      total,
    );
  }

  @UseGuards(AuthGuard)
  @Put('self/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.OK)
  async updateUserAvatar(@UploadedFile(new ParseFilePipe({validators: [new MaxFileSizeValidator({maxSize: USER_AVATAR_MAX_SIZE}), new ImageValidator()]})) avatar: Express.Multer.File, @CurrentUser() currentUser: JwtAccessTokenPayloadDto){
    const file = await this.userService.updateAvatar(currentUser.id, avatar);
    return new FileDto(file);
  }
}
