import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../users/users.entity';
import { validatePassword } from '../../shared/operators/validate/validate-password';

export class AccessToken {
  constructor(public access_token: string) {}
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  getAccessToken(user$: Observable<any>): Observable<AccessToken> {
    return user$.pipe(
      map(({ email }) => new AccessToken(this.jwtService.sign({ email })))
    );
  }

  validate(email: string, password: string): Observable<User> {
    return this.usersService
      .findOne({ email })
      .pipe(validatePassword(password));
  }
}
