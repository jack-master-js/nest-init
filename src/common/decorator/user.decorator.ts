import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log('request: ', request.body);
    const user = request.body;

    return data ? user && user[data] : user;
  },
);