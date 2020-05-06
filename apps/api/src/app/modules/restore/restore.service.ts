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
  ) {
    this.handleExpiredTokens().subscribe();
  }

  sendRestoreEmail(email) {
    return this.getToken(email);
  }

  /**
   * Создание токен для доступа к изменению
   * @param email
   */
  getToken(email: string) {
    return this.usersService.findOne({ email }).pipe(
      switchMap(({ uid }: User) =>
        from(
          this.restoreRepository.save({
            uid,
            expiresOn: new Date(Date.now() + 15552000000)
          })
        )
      )
    );
  }

  /**
   * Проверка токена
   * @param token
   */
  validateToken(token: string): Observable<RestoreToken> {
    return from(this.restoreRepository.findOne({ token }));
  }

  /**
   * Ручное удаление токена
   * @param token
   */
  destroyToken(token: string): Observable<any> {
    return from(this.restoreRepository.delete({ token }));
  }

  /**
   * Удалени токна после истечения его срока
   */
  private handleExpiredTokens() {
    return from(
      this.restoreRepository
        .createQueryBuilder('restore_token')
        .delete()
        .where('restore_token.expiresOn <= :currentDate', {
          currentDate: new Date()
        })
        .execute()
    );
  }
}
