import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { SignUpTechDto } from './dto/signup-tech.dto';
import { AuthService } from './auth.service'
import { SignInTechDto } from './dto/signin-tech.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTech } from './get-tech.decorator';
import { Tech } from './tech.model';

@Controller('auth')
export class AuthController {
  constructor(private techService: AuthService) { }

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpTechDto: SignUpTechDto) {
    return this.techService.signUp(signUpTechDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInTechDto: SignInTechDto): Promise<{ jwtToken: string }> {
    return this.techService.signIn(signInTechDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log('log in controller');
  //   console.log('user', req.user);

  //   console.log('tech', req.tech);
  // }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetTech() tech: Tech) {
    console.log(tech);
  }

  @Get('*')
  getAuth() {
    return 'auth controller'
  }
}
