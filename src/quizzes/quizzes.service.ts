import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttemptDto } from './dto/createAttempt.dto';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { Attempt, AttemptDocument } from './schemas/attempt.schema';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { IStatistics } from './interfaces/statistics.interface';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Attempt.name) private attemptModel: Model<AttemptDocument>,
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
  ) {}

  create(createQuizDto: CreateQuizDto, userId: string): Promise<Quiz> {
    throw 'This creates a new quiz';
  }

  findOne(id: string): Promise<Quiz | null> {
    throw 'This returns a quiz by id';
  }

  findByUserId(userId: string): Promise<Quiz[]> {
    throw 'This returns an array of quizzes by userId';
  }

  attempt(
    createAttemptDto: CreateAttemptDto,
    userId: string,
  ): Promise<Attempt> {
    throw 'This returns the result of an attempt by id';
  }

  private _calculateStatisticsOfQuiz(quiz: Quiz): IStatistics {
    throw 'This returns the statistics of a quiz';
  }

  private _calculateScoreOfAttempt(attempt: Attempt): number {
    throw 'This returns the score of an attempt';
  }
}
