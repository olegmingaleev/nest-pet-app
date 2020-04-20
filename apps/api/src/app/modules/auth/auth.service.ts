import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  signin({ username, uid }: any) {
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
