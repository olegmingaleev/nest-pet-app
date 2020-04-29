import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from './modules/auth/guards/auth-local.guard';
import { Request } from 'express';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
