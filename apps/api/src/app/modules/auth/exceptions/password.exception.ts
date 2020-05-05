import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPasswordException extends HttpException {
  constructor() {
    super('Wrong login or password', HttpStatus.UNAUTHORIZED);
  }
}
