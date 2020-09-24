import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpTechDto } from './dto/signup-tech.dto';
import { Tech } from './tech.model';
import { genSalt, hash, compare } from 'bcryptjs';
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

    const tech = new this.techModel({
      firstName,
      lastName,
      email,
      password
    });

    const salt = await genSalt(10);
    tech.password = await hash(password, salt);

    const result = await tech.save();
    console.log(result);
    return result;
  }

  async signIn(singInTechDto: SignInTechDto) {
    const {
      email,
      password
    } = singInTechDto;

    try {
      let tech = await this.techModel.findOne({ email });//.select('-password');
      //console.log(tech);

      if (!tech) {
        return new NotFoundException('email not found');
      }

      const isMatch = await compare(password, tech.password);

      if (!isMatch) {
        return new NotFoundException('invalid pass');
      }
      //const result = await tech.save();
      console.log(tech);
      return tech;
    }
    catch (error) {
      console.log('in catch');
      console.log(error);
      return error;

    }


  }
}
