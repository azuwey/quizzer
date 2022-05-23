import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  mockAnswerCorrect,
  mockAnswerIncorrect,
  mockAnswerProvider,
} from '../../test/mocks/answer.mock.spec';
import {
  mockAttemptCorrect,
  mockAttemptIncorrect,
  mockAttemptProvider,
} from '../../test/mocks/attempt.mock.spec';
import {
  mockQuestion,
  mockQuestionProvider,
} from '../../test/mocks/question.mock.spec';
import { mockQuiz, mockQuizProvider } from '../../test/mocks/quiz.mock.spec';
import {
  mockResultCorrect,
  mockResultProvider,
} from '../../test/mocks/result.mock.spec';
import { mockModel } from '../../test/utils/createMockModel.spec';
import { mockUser } from '../../test/mocks/user.mock.spec';
import { QUIZ } from '../constants/constants';
import { QuizDoesNotExistException } from './exceptions/quizDoesNotExistException';
import { Answer, AnswerDocument } from './schemas/answer.schema';
import { Attempt, AttemptDocument } from './schemas/attempt.schema';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { Result, ResultDocument } from './schemas/result.schema';
import { QuizzesService } from './quizzes.service';

describe('QuizService', () => {
  let service: QuizzesService;
  let attemptModel: Model<Attempt>;
  let quizModel: Model<Quiz>;
  let questionModel: Model<Question>;
  let answerModel: Model<Answer>;
  let resultModel: Model<Result>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        mockAnswerProvider,
        mockAttemptProvider,
        mockQuestionProvider,
        mockQuizProvider,
        mockResultProvider,
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
    quizModel = module.get<Model<QuizDocument>>(getModelToken(Quiz.name));
    questionModel = module.get<Model<QuestionDocument>>(
      getModelToken(Question.name),
    );
    answerModel = module.get<Model<AnswerDocument>>(getModelToken(Answer.name));
    attemptModel = module.get<Model<AttemptDocument>>(
      getModelToken(Attempt.name),
    );
    resultModel = module.get<Model<ResultDocument>>(getModelToken(Result.name));
  });

  describe('createQuiz', () => {
    it('should create a new quiz', async () => {
      jest.spyOn(quizModel, 'create').mockImplementationOnce(() =>
        Promise.resolve(
          mockModel<Quiz>({
            _id: mockQuiz._id,
            owner: mockQuiz.owner,
            questions: [],
            attempts: [],
          }),
        ),
      );

      jest.spyOn(questionModel, 'create').mockImplementationOnce(() =>
        Promise.resolve(
          mockModel<Question>({
            _id: mockQuestion._id,
            quiz: mockQuiz._id,
            question: mockQuestion.question,
            answers: [],
          }),
        ),
      );

      jest.spyOn(answerModel, 'create').mockImplementation(mockModel);

      expect(
        await service.create(mockQuiz, 'aaaaaaaaaaaaaaaaaaaaaaaa'),
      ).toEqual(mockQuiz);
    });
  });

  describe('findOneId', () => {
    it('should return a quiz', async () => {
      jest
        .spyOn(quizModel, 'findOne')
        .mockImplementationOnce(() => mockModel<Quiz>(mockQuiz) as any);

      expect(await service.findOneId(mockQuiz._id.toString())).toEqual(
        mockQuiz,
      );
    });

    it('should throw an QuizDoesNotExistException exception', async () => {
      jest.spyOn(quizModel, 'findOne').mockImplementationOnce(
        () =>
          ({
            populate: jest.fn().mockImplementationOnce(() => ({
              exec: jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(null)),
            })),
          } as any),
      );

      await expect(
        service.findOneId(mockQuiz._id.toString()),
      ).rejects.toThrowError(QuizDoesNotExistException);
    });
  });

  describe('findByUserId', () => {
    it('should return a quiz', async () => {
      jest
        .spyOn(quizModel, 'findOne')
        .mockImplementationOnce(() => mockModel<Quiz>(mockQuiz) as any);

      expect(await service.findByUserId(mockUser._id.toString())).toEqual(
        mockQuiz,
      );
    });

    it('should throw an QuizDoesNotExistException exception', async () => {
      jest.spyOn(quizModel, 'findOne').mockImplementationOnce(
        () =>
          ({
            populate: jest.fn().mockImplementationOnce(() => ({
              exec: jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(null)),
            })),
          } as any),
      );

      await expect(
        service.findByUserId(mockQuiz._id.toString()),
      ).rejects.toThrowError(QuizDoesNotExistException);
    });
  });

  describe('attempt', () => {
    it('should return an attempt', async () => {
      jest
        .spyOn(quizModel, 'findOne')
        .mockImplementationOnce(() => mockModel<Quiz>(mockQuiz) as any);

      const mockAttemptModel = mockModel<Attempt>({
        _id: mockAttemptCorrect._id,
        quiz: mockQuiz._id,
        user: mockUser._id,
        score: 0,
        results: [],
      });

      jest
        .spyOn(attemptModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockAttemptModel));

      jest
        .spyOn(mockAttemptModel, 'toObject')
        .mockReturnValue(mockAttemptCorrect);

      jest.spyOn(resultModel, 'create').mockImplementation(mockModel);

      expect(
        await service.attempt(
          {
            quizId: mockQuiz._id.toString(),
            answers: [
              {
                answerId: mockAnswerCorrect._id.toString(),
                questionId: mockQuestion._id.toString(),
              },
            ],
          },
          'aaaaaaaaaaaaaaaaaaaaaaaa',
        ),
      ).toEqual(mockAttemptCorrect);
    });

    it('should throw an QuizDoesNotExistException exception', async () => {
      jest.spyOn(quizModel, 'findOne').mockImplementationOnce(
        () =>
          ({
            populate: jest.fn().mockImplementationOnce(() => ({
              exec: jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(null)),
            })),
          } as any),
      );

      await expect(
        service.attempt(
          {
            quizId: mockQuiz._id.toString(),
            answers: [
              {
                answerId: mockAnswerCorrect._id.toString(),
                questionId: mockQuestion._id.toString(),
              },
            ],
          },
          'aaaaaaaaaaaaaaaaaaaaaaaa',
        ),
      ).rejects.toThrowError(QuizDoesNotExistException);
    });
  });

  describe('statistics', () => {
    it('should return { attempts: 1, completions: 1, averageScore: 1 } (user selected correct answer)', async () => {
      jest.spyOn(quizModel, 'findOne').mockImplementationOnce(
        () =>
          mockModel<Quiz>({
            ...mockQuiz,
            attempts: [mockAttemptCorrect],
          }) as any,
      );

      expect(await service.statistics(mockQuiz._id.toString())).toEqual({
        attempts: 1,
        completions: 1,
        averageScore: 1,
      });
    });

    it('should return { attempts: 1, completions: 0, averageScore: 0 } (user not selected correct answer)', async () => {
      jest.spyOn(quizModel, 'findOne').mockImplementationOnce(
        () =>
          mockModel<Quiz>({
            ...mockQuiz,
            attempts: [mockAttemptIncorrect],
          }) as any,
      );

      expect(await service.statistics(mockQuiz._id.toString())).toEqual({
        attempts: 1,
        completions: 0,
        averageScore: 0,
      });
    });

    it('should return { attempts: 1, completions: 1, averageScore:1 } (user not selected anything because all answers were wrong)', async () => {
      jest.spyOn(quizModel, 'findOne').mockImplementationOnce(
        () =>
          mockModel<Quiz>({
            _id: mockQuiz._id,
            owner: mockQuiz.owner,
            questions: [
              {
                _id: mockQuestion._id,
                quiz: mockQuiz._id,
                question: mockQuestion.question,
                answers: [mockAnswerIncorrect],
              },
            ],
            attempts: [
              {
                _id: mockAttemptCorrect._id,
                quiz: mockQuiz._id,
                user: mockUser._id,
                score: 1,
                results: [
                  {
                    _id: mockResultCorrect._id,
                    attempt: mockAttemptCorrect._id,
                    question: mockQuestion._id,
                    answer: new Types.ObjectId(QUIZ.UNSELECTED_ANSWER),
                    isCorrect: true,
                  },
                ],
              },
            ],
          }) as any,
      );

      expect(await service.statistics(mockQuiz._id.toString())).toEqual({
        attempts: 1,
        completions: 1,
        averageScore: 1,
      });
    });

    it('should throw an QuizDoesNotExistException exception', async () => {
      jest.spyOn(quizModel, 'findOne').mockImplementationOnce(
        () =>
          ({
            populate: jest.fn().mockImplementationOnce(() => ({
              exec: jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(null)),
            })),
          } as any),
      );

      await expect(
        service.statistics(mockQuiz._id.toString()),
      ).rejects.toThrowError(QuizDoesNotExistException);
    });
  });
});
