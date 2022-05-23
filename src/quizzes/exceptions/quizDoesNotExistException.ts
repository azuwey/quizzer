import { HttpException, HttpStatus } from '@nestjs/common';

export class QuizDoesNotExistException extends HttpException {
  constructor() {
    super('Quiz does not exist', HttpStatus.NOT_FOUND);
  }
}
