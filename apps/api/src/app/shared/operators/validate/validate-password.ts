import { mergeMap } from 'rxjs/operators';
import { MonoTypeOperatorFunction, of, throwError } from 'rxjs';
import { User } from '../../../modules/users/users.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Password } from '../../static/password/password.service';

export const WrongPasswordException = HttpException.createBody(
  'Wrong login or password',
  'Unauthorized',
  HttpStatus.UNAUTHORIZED
);

export function validatePassword(
  password: string
): MonoTypeOperatorFunction<User | any> {
  return input$ =>
    input$.pipe(
      mergeMap<User, User | any>(user =>
        user && Password.compare(password, user.password)
          ? of(user)
          : throwError(WrongPasswordException)
      )
    );
}
