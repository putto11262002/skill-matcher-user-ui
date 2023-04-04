import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from 'src/modules/user/dtos/responses/user.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req: Request = context.switchToHttp().getRequest();
    const token =
      typeof req.headers.authorization === 'string'
        ? req.headers.authorization.replace('Bearer', '').trim()
        : null;
    if (!token) {
      throw new UnauthorizedException();
    }

    const {payload, user} = await this.authService.verifyAccessToken(token);
      
  

    req['user'] = payload;

    return true;
  }
}
