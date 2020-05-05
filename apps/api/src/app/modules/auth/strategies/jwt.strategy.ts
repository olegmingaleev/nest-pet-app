import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserDto } from '../dto/User.dto';
import { AUTH_CONFIG, SESSION_COOKIE } from '../auth.consts';
import { Request } from 'express';

const ExtractJwtFromSessionCookie = (name: string) => (req: Request) =>
  req && req.cookies[name];

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwtFromSessionCookie(SESSION_COOKIE),
        ExtractJwt.fromAuthHeaderAsBearerToken
      ]),
      ignoreExpiration: false,
      secretOrKey: AUTH_CONFIG.jwtSecret
    });
  }

  validate({ email, sub: { username, uid } }: any): Partial<UserDto> {
    return {
      email,
      uid,
      username
    };
  }
}
