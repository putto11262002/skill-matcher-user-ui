import {
  ForbiddenException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtAccessTokenPayloadDto } from '../dtos/request/jwt-access-token-payload.dto';
import { JwtRefreshTokenPayload } from '../dtos/request/jwt-refresh-token-payload.dto';
import { UserService } from '../../../modules/user/services/user.service';
import { User } from '../../../modules/user/schemas/user.schema';
import { SignUpDto } from '../dtos/request/sign-up.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async signUp(user: SignUpDto): Promise<User> {
    // verify  email first

    const createdUser = await this.userService.create({
      username: user.username,
      email: user.email,
      password: user.password,
      profile: { firstName: user.firstName, lastName: user.lastName },
    } as any);

    // send verification email
    return createdUser
  }

  async signIn(
    usernameOrEmail: string,
    password,
  ): Promise<{ refreshToken: string; accessToken: string; user: User }> {
    const [userByUsername, userByEmail] = await Promise.all([
      this.userService.getByUsername(usernameOrEmail),
      this.userService.getByEmail(usernameOrEmail),
    ]);
    const user = userByUsername || userByEmail;
    if (!user) {
      throw new UnauthorizedException('Incorrect username or email');
    }
    const isPasswordMatch = await this.verifyPassword(password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    const [refreshToken, accessToken] = await Promise.all([
      this.generateRefreshToken({ id: user._id, role: user.role }),
      this.generateAccessToken({
        id: user._id,
        role: user.role,
        username: user.username,
      }),
    ]);
    await this.userService.updateRefreshToken(user._id, refreshToken);
    return { refreshToken, accessToken, user };
  }

  async signOut(id: ObjectId | string): Promise<void> {
    await this.userService.updateRefreshToken(id, null);
  }

  async hashPassword(password): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async verifyPassword(password, hash): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateAccessToken(
    payload: JwtAccessTokenPayloadDto,
  ): Promise<string> {
    const secret = this.configService.get('auth.jwt.accessToken.secret');
    const expiresIn = this.configService.get('auth.jwt.accessToken.expiresIn');
    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  async generateRefreshToken(payload: JwtRefreshTokenPayload): Promise<string> {
    const secret = this.configService.get('auth.jwt.refreshToken.secret');
    const expiresIn = this.configService.get('auth.jwt.refreshToken.expiresIn');
    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  async verifyRefreshToken(
    refreshToken: string,
  ): Promise<{ payload: JwtRefreshTokenPayload; user: User }> {
    const secret = this.configService.get('auth.jwt.refreshToken.secret');
    var payload: any = {};
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, { secret });
    } catch {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getById(payload.id);
    if (user?.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }
    return { payload, user };
  }

  async verifyAccessToken(
    accessToken: string,
  ): Promise<{ payload: JwtAccessTokenPayloadDto; user: User }> {
    const secret = this.configService.get('auth.jwt.accessToken.secret');
    var payload: any = {};
    try {
      payload = await this.jwtService.verifyAsync(accessToken, { secret });
    } catch (e) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getById(payload.id);
    if (!user?.refreshToken) {
      throw new UnauthorizedException();
    }
    return { payload, user };
  }

  async refresh(refreshToken: string): Promise<string> {
    const { payload, user } = await this.verifyRefreshToken(refreshToken);
    const accessToken = await this.generateAccessToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });
    return accessToken;
  }
}
