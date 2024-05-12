import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  // console.log('Request.user: ' + request.userRequest);

  if (request.userRequest) {
    if (filter) {
      return request.userRequest[filter];
    } else {
      return request.userRequest;
    }
  } else {
    throw new NotFoundException(
      'Usuário não encontrado no Request. Use o AuthGuard para obter o usuário.',
    );
  }
});
