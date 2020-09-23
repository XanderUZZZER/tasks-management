import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TechCredentialsDto } from './dto/tech-credentials-dto';
import { Tech } from './tech.model';

@Controller('auth')
export class AuthController {

  constructor(private techService: AuthService) { }

  @Post('/signup')
  signUp(@Body(ValidationPipe) techCredentialsDto: TechCredentialsDto): Promise<void> {
    return this.techService.signUp(techCredentialsDto);
  }
}
