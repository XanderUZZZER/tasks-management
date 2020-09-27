import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TechSchema } from './tech.model';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'tokenSecret',
      signOptions: {
        expiresIn: 3600
      }
    }),
    MongooseModule.forFeature([{ name: 'Tech', schema: TechSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
