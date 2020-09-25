import { IsEmail, Length } from "class-validator";

export class SignUpTechDto {
  firstName: string;
  lastName: string;
  @IsEmail({}, { message: 'Provide a valid email' })
  email: string;

  @Length(6, 6, { message: 'Pass length should be 6 chars' })
  password: string
}