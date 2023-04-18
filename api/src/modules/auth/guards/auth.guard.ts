import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
   

    const req: Request = context.switchToHttp().getRequest();
    const token =
      typeof req.headers.authorization === 'string'
        ? req.headers.authorization.replace('Bearer', '').trim()
        : null;
    if (!token) {
      throw new UnauthorizedException();
    }

    const { payload, user } = await this.authService.verifyAccessToken(token);

    req['user'] = user;
    req['jwt-payload'] = payload

    return true;
  }
}
