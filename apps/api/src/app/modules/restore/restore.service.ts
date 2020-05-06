import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestoreToken } from './restore-token.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { UsersService } from '../users/user.service';
import { switchMap } from 'rxjs/operators';
import { User } from '../users/users.entity';

@Injectable()
export class RestoreService {
  constructor(
    @InjectRepository(RestoreToken)
    private restoreRepository: Repository<RestoreToken>,
    private usersService: UsersService
  ) {}

  sendRestoreEmail(email) {
    return this.getToken(email);
  }

  getToken(email: string) {
    return this.usersService.findOne({ email }).pipe(
      switchMap(({ uid }: User) =>
        from(
          this.restoreRepository.save({
            uid,
            expiresOn: new Date(Date.now() - 15552000000)
          })
        )
      )
    );
  }

  validate(token: string): Observable<RestoreToken> {
    return from(this.restoreRepository.findOne({ token }));
  }
}
