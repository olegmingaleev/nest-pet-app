import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../auth/interfaces/user';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { validatePassword } from '../../shared/operators/validate/validate-password';

@Injectable()
export class ProfileService {
  constructor(private usersService: UsersService) {}

  setPassword(
    { email }: User,
    curPassword: string,
    password: string
  ): Observable<void> {
    return this.usersService.findOne(email).pipe(
      validatePassword(curPassword),
      mergeMap(user =>
        this.usersService.update(user, {
          password
        })
      )
    );
  }
}
