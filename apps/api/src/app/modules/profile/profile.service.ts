import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { UserDto } from '../auth/dto/User.dto';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Password } from '../../shared/static/password/password.service';
import { comparePassword } from '../auth/helpers/compare-password.operator';

export const ExistedUsername = HttpException.createBody(
  'UserDto with this username exist',
  undefined,
  HttpStatus.FORBIDDEN
);

@Injectable()
export class ProfileService {
  constructor(private usersService: UsersService) {}

  getProfile({ uid }: UserDto) {
    return this.usersService.findOne(
      { uid },
      {
        select: ['email', 'uid', 'username']
      }
    );
  }

  setPassword(
    { email }: UserDto,
    curPassword: string,
    password: string
  ): Observable<void> {
    return this.usersService.findOne({ email }).pipe(
      comparePassword(curPassword),
      switchMap(user =>
        this.usersService.update(user, {
          password: Password.hash(password)
        })
      )
    );
  }

  setUsername({ email }: UserDto, username: string) {
    return this.usersService
      .findOne({ email })
      .pipe(switchMap(user => this.usersService.update(user, { username })));
  }
}
