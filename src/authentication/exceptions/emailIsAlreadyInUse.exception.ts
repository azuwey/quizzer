import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailIsAlreadyInUseException extends HttpException {
  constructor() {
    super('This email is already in use', HttpStatus.CONFLICT);
  }
}
