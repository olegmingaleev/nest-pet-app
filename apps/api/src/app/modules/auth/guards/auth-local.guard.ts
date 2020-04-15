import { Injectable } from '@angular/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthLocalGuard extends AuthGuard('local') {}
