import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistException extends HttpException {
  constructor() {
    super('A user with this account already exists', HttpStatus.BAD_REQUEST);
  }
}
