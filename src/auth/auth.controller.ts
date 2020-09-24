import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignUpTechDto } from './dto/signup-tech.dto';
import { AuthService } from './auth.service'
import { SignInTechDto } from './dto/signin-tech.dto';

@Controller('auth')
export class AuthController {
  constructor(private techService: AuthService) { }

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpTechDto: SignUpTechDto) {
    return this.techService.signUp(signUpTechDto);
  }

  @Post('/signin')
  signIn(@Body() signInTechDto: SignInTechDto) {
    return this.techService.signIn(signInTechDto);
  }
}
