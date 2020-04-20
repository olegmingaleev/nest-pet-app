import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from './modules/auth/guards/auth-local.guard';
import { Request } from 'express';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { User } from './modules/users/user.entity';
import { UsersService } from './modules/users/user.service';
import { CreateUserDto } from './modules/users/dto/CreateUser.dto';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('users/create')
  register(@Body() {
    username,
    password
  }): Observable<User> {
    return this.usersService.create(new CreateUserDto(username, password));
  }

  @UseGuards(AuthLocalGuard)
  @Post('auth/login')
  login(@Req() req: Request)  {
    return this.authService.signin(req.user as any);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
