import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { Observable } from 'rxjs';
import { User } from './users.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post('create')
  register(@Body() {
    email,
    password
  }): Observable<User> {
    return this.usersService.create(new CreateUserDto(email, password));
  }
}
