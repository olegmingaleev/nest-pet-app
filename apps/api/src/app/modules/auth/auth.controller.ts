import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLocalGuard } from './guards/auth-local.guard';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthLocalGuard)
  login(@Req() req: Request): Observable<any> {
    return this.authService.getAccessToken(req.user as any).pipe(
      map(({ access_token }) => {
        req.res.setHeader('Authorization', `jwt ${access_token}`);
      })
    );
  }
}
