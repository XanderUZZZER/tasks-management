import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpTechDto } from './dto/signup-tech.dto';
import { Tech } from './tech.model';
import * as bcrypt from 'bcryptjs';
import { SignInTechDto } from './dto/signin-tech.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Tech') private readonly techModel: Model<Tech>) { }

  async signUp(singUpTechDto: SignUpTechDto) {
    const {
      firstName,
      lastName,
      email,
      password
    } = singUpTechDto;

    try {
      const tech = new this.techModel({
        firstName,
        lastName,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      tech.password = await bcrypt.hash(password, salt);

      await tech.save();
      return `User with ${tech.email} successfully saved`;
    }
    catch (error) {
      if (error.code === 11000) {// duplicate email error code
        return new ConflictException('email already taken, provide another email')
      } else {
        console.log('err occured', error);
        return new InternalServerErrorException(error);
      }
    }
  }

  async signIn(singInTechDto: SignInTechDto) {
    const {
      email,
      password
    } = singInTechDto;

    try {
      const tech = await this.techModel.findOne({ email });

      if (!tech) {
        return new NotFoundException('email not found');
      }

      const isMatch = await bcrypt.compare(password, tech.password);

      if (!isMatch) {
        return new NotFoundException('invalid pass');
      }
      console.log(tech);
      return tech;
    }
    catch (error) {
      console.log('Error during signing in...');
      console.log(error);
      return error;
    }
  }
}
