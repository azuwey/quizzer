import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise, Types } from 'mongoose';
import { CreateAttemptDto } from './dto/createAttempt.dto';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { IStatistics } from './interfaces/statistics.interface';
import { Answer, AnswerDocument } from './schemas/answer.schema';
import { Attempt, AttemptDocument } from './schemas/attempt.schema';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { Result, ResultDocument } from './schemas/result.schema';
import { QuizDoesNotExistException } from './exceptions/quizDoesNotExistException';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Attempt.name) private attemptModel: Model<AttemptDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(Result.name) private ResultModel: Model<ResultDocument>,
  ) {}

  async create(createQuizDto: CreateQuizDto, userId: string): Promise<Quiz> {
    const quiz = await this.quizModel.create({
      owner: new Types.ObjectId(userId),
      questions: [],
      attempts: [],
    });

    for (let question of createQuizDto.questions) {
      let newQuestion = await this.questionModel.create({
        question: question.question,
        answers: [],
        quiz: quiz._id,
      });

      let newAnswers = await Promise.all(
        question.answers.map((answer) => {
          return this.answerModel.create({
            ...answer,
            question: newQuestion._id,
          });
        }),
      );

      newQuestion.answers.push(...newAnswers);
      await newQuestion.save();

      quiz.questions.push(newQuestion);
    }

    await quiz.save();

    return (
      await quiz.populate([{ path: 'questions', populate: ['answers'] }])
    ).toObject();
  }

  async findOneId(id: string): Promise<Quiz | null> {
    const quiz = await this.quizModel
      .findOne({ _id: new Types.ObjectId(id) })
      .populate([{ path: 'questions', populate: ['answers'] }])
      .exec();

    if (quiz === null) {
      throw new QuizDoesNotExistException();
    }

    return quiz.toObject();
  }

  async findByUserId(userId: string): Promise<Quiz[]> {
    const quiz = await this.quizModel
      .findOne({ owner: new Types.ObjectId(userId) })
      .populate([{ path: 'questions', populate: ['answers'] }])
      .exec();

    if (quiz === null) {
      throw new QuizDoesNotExistException();
    }

    return quiz.toObject();
  }

  async attempt(
    createAttemptDto: CreateAttemptDto,
    userId: string,
  ): Promise<Attempt> {
    throw 'This returns an attempt';
  }

  async statistics(id: string): Promise<IStatistics> {
    throw 'This calculates and then returns the statistics of a quiz by id';
  }
}
