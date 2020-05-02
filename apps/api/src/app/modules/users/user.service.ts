import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Observable<User[]> {
    return from(this.usersRepository.find());
  }

  findOne(email: string): Observable<User> {
    return from(this.usersRepository.findOne({ email }));
  }

  /**
   * TODO
   * пофиксить return тип
   */
  remove(user: User): Observable<any> {
    return from(this.usersRepository.delete(user));
  }

  create(user: CreateUserDto): Observable<User> {
    return from(this.usersRepository.save(user));
  }

  update(user: User, entity: Partial<User>): Observable<void> {
    return from(
      this.usersRepository.update(
        user,
        // TODO Исправить типы
        entity as any
      )
    ).pipe(mapTo(undefined));
  }

  addField(user: User, name: string, value: number | string) {
    return from(this.usersRepository.increment(user, name, value));
  }
}
