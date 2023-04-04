import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { UserDto } from 'src/modules/user/dtos/response/user.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const req: Request = context.switchToHttp().getRequest();
    const token =
      typeof req.headers.authorization === 'string'
        ? req.headers.authorization.replace('Bearer', '').trim()
        : null;
    if (!token) {
      throw new UnauthorizedException();
    }



   
    const {payload, user} = await this.authService.verifyAccessToken(token);
   

    if (requiredRoles && !requiredRoles.includes(user.role)) {
      throw new ForbiddenException();
    }
    req['user'] = payload;

    return true;
  }
}
