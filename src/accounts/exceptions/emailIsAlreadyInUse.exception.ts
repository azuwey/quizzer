import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailIsAlreadyInUse extends HttpException {
  constructor() {
    super('This email is already in use', HttpStatus.CONFLICT);
  }
}
