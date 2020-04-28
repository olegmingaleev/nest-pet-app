import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { from, Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Observable<User[]> {
    return from(this.usersRepository.find());
  }

  findOne(email: string): Observable<User> {
    return from(this.usersRepository.findOne({email}));
  }

  /**
   * TODO
   * пофиксить return тип
   */
  remove(id: string): Observable<any> {
    return from(this.usersRepository.delete(id));
  }

  create(user: CreateUserDto): Observable<User> {
    return from(this.usersRepository.save(user));
  }
}
