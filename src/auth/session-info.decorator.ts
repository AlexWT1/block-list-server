import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Sessioninfo = createParamDecorator(
  (_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().session,
);
