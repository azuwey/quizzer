import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { Attempt } from './schemas/attempt.schema';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  create(): Quiz {
    throw 'This creates a new quiz';
  }

  findOne(id: string): Quiz {
    throw 'This returns a quiz by id';
  }

  findByUserId(userId: string): Quiz[] {
    throw 'This returns an array of quizzes by userId';
  }

  attempt(id: string): Attempt {
    throw 'This returns the result of an attempt by id';
  }

  statistics(id: string) {
    throw 'This returns the statistics of a quiz by id';
  }

  private _getScoreOfAttempt(attempt: Attempt): number {
    throw 'This returns the score of an attempt';
  }
}
