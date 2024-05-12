import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {

    const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

   // console.log({requeridRoles})

    if (!requeridRoles) {
      return true;
    }




    const { userRequest } = context.switchToHttp().getRequest();

   // console.log(requeridRoles , userRequest);

    const rolesFilted = requeridRoles.filter(role => role === userRequest.ROLE);

    return rolesFilted.length > 0;
  }
}
