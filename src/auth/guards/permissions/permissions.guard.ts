import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Permissions } from './permissions'
import { PERMISSIONS_KEY } from './permissions.decorator'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Permissions[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    // Todo: Controller that requires ALL roles
    return requiredRoles.some((role) => user.roles?.includes(role))
  }
}
