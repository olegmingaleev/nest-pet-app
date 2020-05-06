import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { Observable } from 'rxjs';
import { User } from './users.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  register(@Body() { username, email, password }): Observable<User> {
    return this.usersService.create(
      new CreateUserDto(username, email, password)
    );
  }

  @Get()
  getAll(): Observable<User[]> {
    return this.usersService.findAll();
  }

  @Get(':uid')
  getByUserId(@Query('uid') uid: string): Observable<User> {
    return this.usersService.findOne({ uid });
  }

  @Delete(':uid')
  disable(@Query('uid') uid: string) {
    this.usersService.update(
      { uid },
      {
        disabled: true
      }
    );
  }
}
