import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dtos/requests/create-user.dto';
import { UserDto } from 'src/modules/user/dtos/responses/user.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAccessTokenPayloadDto } from '../dtos/request/jwt-access-token-payload.dto';
import { LoginDto } from '../dtos/request/login.dto';
import { RefreshDto } from '../dtos/request/refresh.dto';
import { SignUpDto } from '../dtos/request/sign-up.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() payload: SignUpDto): Promise<void>{
    await this.authService.signUp(payload);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() payload: LoginDto): Promise<{refreshToken: string, accessToken: string, user: UserDto}> {
    const { refreshToken, accessToken, user} = await this.authService.signIn(
      payload.usernameOrEmail,
      payload.password,
    );

   
    return { refreshToken, accessToken, user: new UserDto(user) };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() payload: RefreshDto): Promise<{accessToken: string}> {
    const accessToken = await this.authService.refresh(payload.refreshToken);
    return { accessToken };
  }

  @UseGuards(AuthGuard)
  @Delete('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(@CurrentUser() currentUser: JwtAccessTokenPayloadDto): Promise<void> {
    this.authService.signOut(currentUser.id)
    
  }
}
