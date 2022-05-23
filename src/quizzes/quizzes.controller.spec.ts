import { Test, TestingModule } from '@nestjs/testing';
import { mockAttemptCorrect } from '../../test/mocks/attempt.mock.spec';
import { mockQuiz } from '../../test/mocks/quiz.mock.spec';
import { mockUser } from '../../test/mocks/user.mock.spec';
import { IJwtAuthenticatedRequest } from '../authentication/interfaces/jwtAuthenticatedRequest.interface';
import { IStatistics } from './interfaces/statistics.interface';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { mockAnswerCorrect } from '../../test/mocks/answer.mock.spec';
import { mockQuestion } from '../../test/mocks/question.mock.spec';

describe('QuizzesController', () => {
  let controller: QuizzesController;

  const mockStatistics: IStatistics = {
    attempts: 1,
    averageScore: 1,
    completions: 1,
  };

  const mockRequest = {
    user: {
      _id: mockUser._id.toString(),
    },
  } as IJwtAuthenticatedRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [
        {
          provide: QuizzesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockQuiz),
            findOneId: jest.fn().mockResolvedValue(mockQuiz),
            findByUserId: jest.fn().mockResolvedValue(mockQuiz),
            attempt: jest.fn().mockResolvedValue(mockAttemptCorrect),
            statistics: jest.fn().mockResolvedValue(mockStatistics),
          },
        },
      ],
    }).compile();

    controller = module.get<QuizzesController>(QuizzesController);
  });

  describe('create', () => {
    it('should create a quiz and return it', async () => {
      expect(await controller.create(mockRequest, mockQuiz)).toEqual(mockQuiz);
    });
  });

  describe('getById', () => {
    it('should create a quiz and return it', async () => {
      expect(
        await controller.getById(mockRequest, mockQuiz._id.toString()),
      ).toEqual(mockQuiz);
    });
  });

  describe('getByUserId', () => {
    it('should create a quiz and return it', async () => {
      expect(
        await controller.getByUserId(mockRequest, mockUser._id.toString()),
      ).toEqual(mockQuiz);
    });
  });

  describe('attempt', () => {
    it('should create a quiz and return it', async () => {
      expect(
        await controller.attempt(mockRequest, {
          quizId: mockQuiz._id.toString(),
          answers: [
            {
              answerId: mockAnswerCorrect._id.toString(),
              questionId: mockQuestion._id.toString(),
            },
          ],
        }),
      ).toEqual(mockAttemptCorrect);
    });
  });
});
