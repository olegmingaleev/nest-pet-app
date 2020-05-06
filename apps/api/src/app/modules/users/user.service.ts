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
    return from(this.usersRepository.save(user)).pipe(
      // TODO Подумать о рефакторе
      catchError(({ code }) => {
        if (code === 'ER_DUP_ENTRY') {
          throw new UserExistException();
        }

        return EMPTY;
      })
    );
  }

  update(user: Partial<User>, entity: Partial<User>): Observable<any> {
    return from(this.usersRepository.update(user, entity));
  }
}
