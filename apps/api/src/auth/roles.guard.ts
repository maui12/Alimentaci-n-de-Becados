import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, type Rol } from '../common/roles.js';
import type { JwtPayload } from './jwt-payload.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Rol[] | undefined>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!roles?.length) return true;
    const usuario = ctx.switchToHttp().getRequest<{ user?: JwtPayload }>().user;
    return !!usuario && roles.includes(usuario.rol);
  }
}
