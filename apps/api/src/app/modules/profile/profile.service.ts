import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../auth/interfaces/user';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { validatePassword } from '../../shared/operators/validate/validate-password';

export const ExistedUsername = HttpException.createBody(
  'User with this username exist',
  undefined,
  HttpStatus.FORBIDDEN
);

@Injectable()
export class ProfileService {
  constructor(private usersService: UsersService) {}

  setPassword(
    { email }: User,
    curPassword: string,
    password: string
  ): Observable<void> {
    return this.usersService.findOne({ email }).pipe(
      validatePassword(curPassword),
      mergeMap(user =>
        this.usersService.update(user, {
          password
        })
      )
    );
  }

  setUsername({ email }: User, username: string) {
    return this.usersService
      .findOne({ email })
      .pipe(switchMap(user => this.usersService.update(user, { username })));
  }
}
