import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../../../modules/auth/auth.service';
import { UserService } from '../../../../modules/users/src/user.service';
import { IS_PUBLIC } from '@app/common/decorators';
import { IAuthGuardUser } from '@app/contracts/users/interfaces/Responses/auth-guard-user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: IAuthGuardUser | undefined }>();

    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const tokenInfo = await this.authService.decodeToken(token);
    if (!tokenInfo) throw new UnauthorizedException('Invalid or expired token');

    const user = await this.userService.searchUserById(tokenInfo.user_id);
    if (!user) throw new UnauthorizedException('User not found');

    request.user = {
      id: user.id,
      email: user.email,
      is_confirmed: user.is_confirmed,
    };

    return true;
  }

  private extractBearerToken(req: Request): string | null {
    const h = req.headers.authorization;
    if (!h) return null;
    const [scheme, value] = h.split(' ');
    if (!scheme || !value || scheme.toLowerCase() !== 'bearer') return null;
    return value;
  }
}
