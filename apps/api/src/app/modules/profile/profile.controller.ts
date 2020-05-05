import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private profile: ProfileService) {}

  @Get()
  getProfile(@Req() req) {
    return this.profile.getProfile(req.user);
  }

  @Post('password')
  setPassword(@Req() req, @Body() { curPassword, password }) {
    return this.profile
      .setPassword(req.user, curPassword, password)
      .pipe(catchError(err => of(err)));
  }

  @Post('username')
  setUsername(@Req() req, @Body() { username }) {
    return this.profile
      .setUsername(req.user, username)
      .pipe(catchError(err => of(err)));
  }
}
