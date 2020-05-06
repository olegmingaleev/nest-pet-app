import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../users/users.entity';
import { comparePassword } from './helpers/compare-password.operator';
import { SignInDto } from './dto/SignIn.dto';

export class AccessToken {
  constructor(public access_token: string) {}
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  getAccessToken(user$: Observable<SignInDto>): Observable<AccessToken> {
    return user$.pipe(
      map(
        ({ email, username, uid }) =>
          new AccessToken(
            this.jwtService.sign({
              email,
              sub: {
                username,
                uid
              }
            })
          )
      )
    );
  }

  validate(email: string, password: string): Observable<User> {
    const select: (keyof SignInDto)[] = [
      'email',
      'username',
      'uid',
      'password'
    ];

    return this.usersService
      .findOne(
        { email },
        {
          select
        }
      )
      .pipe(comparePassword(password));
  }
}
