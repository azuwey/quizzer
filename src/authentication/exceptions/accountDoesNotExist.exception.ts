import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountDoesNotExistException extends HttpException {
  constructor() {
    super('This account does not exist', HttpStatus.NOT_FOUND);
  }
}
