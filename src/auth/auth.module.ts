import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TechSchema } from './tech.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tech', schema: TechSchema }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
