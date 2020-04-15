import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './interfaces/user';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signin({ username, uid }: User) {
    return {
      access_token: this.jwtService.sign({
        username,
        sub: {
          uid
        }
      })
    };
  }
}
