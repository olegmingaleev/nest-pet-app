import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  signin(user$: Observable<any>) {
    return user$.pipe(
      map(({ email }) => ({
        access_token: this.jwtService.sign({
          email
        })
      }))
    );
  }

  validate(email: string, password: string): Observable<User> {
    return this.usersService.findOne(email).pipe(
      filter(user => user && user.password === password),
      map(user => {
        console.log(user);

        return user || null;
      })
    );
  }
}
