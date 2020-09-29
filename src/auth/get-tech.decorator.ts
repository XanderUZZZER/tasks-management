import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Tech } from "./tech.model";

export const GetTech = createParamDecorator((data: unknown, ctx: ExecutionContext): Tech => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
})