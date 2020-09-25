import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInTechDto {
  @IsEmail({}, { message: 'Provide a valid email' })
  email: string;
  @IsNotEmpty()
  password: string
}