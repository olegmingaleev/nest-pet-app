import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Request } from 'express';
import { RestoreService } from '../restore.service';
import { mapTo, tap } from 'rxjs/operators';

@Injectable()
export class RestoreTokenGuard implements CanActivate {
  constructor(private restoreService: RestoreService) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const { token } = req.params;

    if (!token) {
      return of(false);
    }

    return this.restoreService.validate(token).pipe(
      tap(({ uid }) => {
        req.user = {
          uid
        };
      }),
      mapTo(true)
    );
  }
}
