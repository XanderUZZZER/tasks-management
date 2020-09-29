import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from "./jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tech } from "./tech.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('Tech')
    private readonly techModel: Model<Tech>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'tokenSecret'
    });
  }

  async validate(payload: JwtPayload): Promise<Tech> {
    const { email } = payload;
    const tech = await this.techModel.findOne({ email });
    console.log('jwt strategy', tech);

    if (!tech) {
      throw new UnauthorizedException();
    }

    return tech;
  }
}