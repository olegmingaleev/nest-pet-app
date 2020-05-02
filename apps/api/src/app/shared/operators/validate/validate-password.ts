import { mergeMap } from 'rxjs/operators';
import { MonoTypeOperatorFunction, of, throwError } from 'rxjs';
import { User } from '../../../modules/users/users.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

export const WrongPassword = HttpException.createBody(
  'Wrong login or password',
  undefined,
  HttpStatus.UNAUTHORIZED
);

export function validatePassword(
  password: string
): MonoTypeOperatorFunction<User | any> {
  return input$ =>
    input$.pipe(
      mergeMap<User, User | any>(user =>
        user && user.password === password
          ? of(user)
          : throwError(WrongPassword)
      )
    );
}
