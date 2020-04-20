import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/user.service';
import { User } from '../../users/user.entity';
import { from, Observable } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService
  ) {
    super();
  }

  validate(uid: string): Observable<User> {
    return from(this.userService.findOne(uid));
  }
}
