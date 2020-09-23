import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Tech } from './tech.model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TechCredentialsDto } from './dto/tech-credentials-dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Tech') private readonly techModel: Model<Tech>) { }

  async getAllTechs(): Promise<Tech[]> {
    //return this.tasks;
    const techs = await this.techModel.find().exec();
    return techs;
  }

  async signUp(techCredentialsDto: TechCredentialsDto): Promise<void> {
    const { firstName, lastName, email, password } = techCredentialsDto;

    const tech = new this.techModel({
      firstName,
      lastName,
      email,
      password
    });
    try {
      const result = await tech.save();
      console.log(result);
    }
    catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new ConflictException('conflict exeption')
      } else {
        throw new InternalServerErrorException('internal error1')
      }
    }
    //return result;
  }
}
