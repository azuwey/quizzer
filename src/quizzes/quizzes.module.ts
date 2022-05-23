import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';
import { JwtStrategy } from '../authentication/strategies/jwt.strategy';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { Attempt, AttemptSchema } from './schemas/attempt.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { Result, ResultSchema } from './schemas/result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    MongooseModule.forFeature([{ name: Attempt.name, schema: AttemptSchema }]),
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
    AuthenticationModule,
  ],
  providers: [QuizzesService, JwtStrategy],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
