import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizzesService {
  create() {
    throw 'This creates a new quiz';
  }

  findOne(id: string) {
    throw 'This returns a quiz by id';
  }

  findByUserId(userId: string) {
    throw 'This returns an array of quizzes by userId';
  }

  attempt(id: string) {
    throw 'This returns the result of an attempt by id';
  }

  statistics(id: string) {
    throw 'This returns the statistics of a quiz by id';
  }
}
