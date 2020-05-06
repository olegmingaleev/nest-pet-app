import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RestoreService } from './restore.service';
import { UsersService } from '../users/user.service';
import { Request } from 'express';
import { RestoreTokenGuard } from './guards/restore-token.guard';
import { finalize } from 'rxjs/operators';

@Controller('restore')
export class RestoreController {
  constructor(
    private restoreService: RestoreService,
    private usersService: UsersService
  ) {}

  @Post()
  createRestoreToken(
    @Body('email')
    email: string
  ) {
    return this.restoreService.sendRestoreEmail(email);
  }

  @Post('password/:token')
  @UseGuards(RestoreTokenGuard)
  setPassword(@Req() req: Request, @Body('password') password: string) {
    return this.usersService
      .update(req.user, {
        password
      })
      .pipe(
        finalize(() => {
          this.restoreService.destroyToken(req.params.token);
        })
      );
  }
}
