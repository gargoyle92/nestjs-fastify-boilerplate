import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthorizedUser } from '@/shared/types/auth.types';

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as AuthorizedUser;

  return user;
});
