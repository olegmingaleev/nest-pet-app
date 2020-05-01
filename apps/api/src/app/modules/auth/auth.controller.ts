import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLocalGuard } from './guards/auth-local.guard';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SESSION_COOKIE } from './auth.consts';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthLocalGuard)
  login(@Req() req: Request): Observable<any> {
    return this.authService.getAccessToken(req.user as any).pipe(
      map(({ access_token }) => {
        req.res.cookie(SESSION_COOKIE, access_token);
      })
    );
  }

  @Get('signout')
  @UseGuards(JwtAuthGuard)
  signOut(@Req() req: Request) {
    req.res.cookie(SESSION_COOKIE, null);
  }
}
