import { mergeMap } from 'rxjs/operators';
import { MonoTypeOperatorFunction, of } from 'rxjs';
import { User } from '../../users/users.entity';
import { Password } from '../../../shared/static/password/password.service';
import { WrongPasswordException } from '../exceptions/password.exception';

export function comparePassword(
  password: string
): MonoTypeOperatorFunction<User | any> {
  return input$ =>
    input$.pipe(
      mergeMap<User, User | any>(user => {
        if (user && Password.compare(password, user.password)) {
          return of(user);
        }

        throw new WrongPasswordException();
      })
    );
}
