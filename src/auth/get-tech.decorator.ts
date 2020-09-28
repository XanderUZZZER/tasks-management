import { createParamDecorator } from "@nestjs/common";
import { Tech } from "./tech.model";

export const GetTech = createParamDecorator((data, req): Tech => {
  console.log('log in middleware');

  console.log('req', req);
  console.log('user', req.user);
  console.log('tech', req.tech);
  return req.tech;
})