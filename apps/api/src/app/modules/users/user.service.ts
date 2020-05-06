import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { Password } from '../../shared/static/password/password.service';
import { UserExistException } from './exceptions/UserExist.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Observable<User[]> {
    return from(this.usersRepository.find());
  }

  findOne(user: Partial<User>, options?: any): Observable<User> {
    return from(this.usersRepository.findOne(user, options));
  }

  /**
   * TODO
   * пофиксить return тип
   */
  remove(user: User): Observable<any> {
    return from(this.usersRepository.delete(user));
  }

  create(user: CreateUserDto): Observable<User> {
    // TODO Добавить шаги для проверки пользователя до обращения к базе
    return from(
      this.usersRepository.save({
        ...user,
        password: Password.hash(user.password)
      })
    ).pipe(
      // TODO Подумать о рефакторе
      catchError(({ code }) => {
        if (code === 'ER_DUP_ENTRY') {
          throw new UserExistException();
        }

        return EMPTY;
      })
    );
  }

  update(user: User, entity: Partial<User>): Observable<void> {
    return from(this.usersRepository.update(user, entity)).pipe(
      mapTo(undefined)
    );
  }

  addField(user: User, name: string, value: number | string) {
    return from(this.usersRepository.increment(user, name, value));
  }
}
