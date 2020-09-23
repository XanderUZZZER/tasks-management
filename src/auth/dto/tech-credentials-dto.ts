import { IsEmail, IsString, Length } from "class-validator";

export class TechCredentialsDto {
  firstName: string;
  lastName: string;

  @IsEmail()
  email: string;

  //@IsString()
  @Length(6, 6, { message: 'pass length should be 6 chars' })
  password: string;
}