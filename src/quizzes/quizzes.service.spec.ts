import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, models, Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Answer } from './schemas/answer.schema';
import { Attempt, AttemptDocument } from './schemas/attempt.schema';
import { Question } from './schemas/question.schema';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { QuizzesService } from './quizzes.service';

describe('QuizService', () => {
  let service: QuizzesService;
  let attemptModel: Model<Attempt>;
  let quizModel: Model<Quiz>;

  const mockUser: User = {
    _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    emailAddress: 'test@test.com',
    passwordHash: 'some_bcrypt_hash',
  };
  const mockAnswers: Answer[] = [
    {
      _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
      question: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
      answer: 'Wasssup?',
      isCorrect: true,
    },
    {
      _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaab'),
      question: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
      answer: 'Yo?',
    },
  ];
  const mockQuestions: Question[] = [
    {
      _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
      quiz: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
      question: 'Wasssup?',
      answers: mockAnswers,
    },
  ];
  const mockQuiz: Quiz = {
    _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    owner: mockUser._id,
    questions: mockQuestions,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: getModelToken(Attempt.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(Quiz.name),
          useValue: {
            findOne: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockQuiz),
            }),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockQuiz]),
            }),
            create: jest.fn().mockResolvedValue(mockQuiz),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
    quizModel = module.get<Model<QuizDocument>>(getModelToken(Quiz.name));
    attemptModel = module.get<Model<AttemptDocument>>(
      getModelToken(Attempt.name),
    );
  });

  describe('createQuiz', () => {
    it('should create a new quiz', async () => {
      expect(
        await service.create(mockQuiz, 'aaaaaaaaaaaaaaaaaaaaaaaa'),
      ).toEqual(mockQuiz);
    });
  });

  describe('findOne', () => {
    it('should return a quiz', async () => {
      expect(await service.findOne('aaaaaaaaaaaaaaaaaaaaaaaa')).toEqual(
        mockQuiz,
      );
    });

    it('should return null', async () => {
      jest.spyOn(quizModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      expect(await service.findOne('aaaaaaaaaaaaaaaaaaaaaaab')).toEqual(null);
    });
  });

  describe('findByUserId', () => {
    it('should return an array of quizzes', async () => {
      expect(await service.findByUserId('aaaaaaaaaaaaaaaaaaaaaaaa')).toEqual([
        mockQuiz,
      ]);
    });

    it('should return an empty array', async () => {
      jest.spyOn(quizModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      expect(await service.findByUserId('aaaaaaaaaaaaaaaaaaaaaaab')).toEqual(
        [],
      );
    });
  });

  describe('attempt', () => {
    it('should create a new attempt with 0 score', async () => {
      const expectedResult: Attempt = {
        _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
        quiz: mockQuiz._id,
        user: mockUser._id,
        results: [
          {
            _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
            attempt: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
            question: mockQuestions[0]._id,
            answer: mockQuestions[0].answers[1]._id,
          },
        ],
      };

      jest
        .spyOn(attemptModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(expectedResult));

      expect(
        await service.attempt(
          {
            quizId: mockQuiz._id.toString(),
            answers: [
              {
                questionId: mockQuestions[0]._id.toString(),
                answerId: mockQuestions[0].answers[1]._id.toString(),
              },
            ],
          },
          'aaaaaaaaaaaaaaaaaaaaaaaa',
        ),
      ).toEqual(expectedResult);
    });

    it('should create a new attempt with 0 score because of unanswered questions', async () => {
      const expectedResult: Attempt = {
        _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
        quiz: mockQuiz._id,
        user: mockUser._id,
        results: [],
      };

      jest
        .spyOn(attemptModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(expectedResult));

      expect(
        await service.attempt(
          {
            quizId: mockQuiz._id.toString(),
            answers: [],
          },
          'aaaaaaaaaaaaaaaaaaaaaaaa',
        ),
      ).toEqual(expectedResult);
    });

    it('should create a new attempt with 1 score', async () => {
      const expectedResult: Attempt = {
        _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
        quiz: mockQuiz._id,
        user: mockUser._id,
        results: [
          {
            _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
            attempt: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
            question: mockQuestions[0]._id,
            answer: mockQuestions[0].answers[0]._id,
          },
        ],
      };

      jest
        .spyOn(attemptModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(expectedResult));

      expect(
        await service.attempt(
          {
            quizId: mockQuiz._id.toString(),
            answers: [
              {
                questionId: mockQuestions[0]._id.toString(),
                answerId: mockQuestions[0].answers[0]._id.toString(),
              },
            ],
          },
          'aaaaaaaaaaaaaaaaaaaaaaaa',
        ),
      ).toEqual({
        ...expectedResult,
        score: 1,
      });
    });

    it('should create a new attempt with 1 score because it only has incorrect answers', async () => {
      const expectedResult: Attempt = {
        _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
        quiz: mockQuiz._id,
        user: mockUser._id,
        results: [
          {
            _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
            attempt: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
            question: mockQuestions[0]._id,
            answer: mockQuestions[0].answers[0]._id,
          },
        ],
      };

      jest.spyOn(models, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockQuiz,
          questions: [
            {
              ...mockQuestions[0],
              answers: [mockAnswers[1]],
            },
          ],
        }),
      });

      jest
        .spyOn(attemptModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(expectedResult));

      expect(
        await service.attempt(
          {
            quizId: mockQuiz._id.toString(),
            answers: [
              {
                questionId: mockQuestions[0]._id.toString(),
                answerId: mockQuestions[0].answers[0]._id.toString(),
              },
            ],
          },
          'aaaaaaaaaaaaaaaaaaaaaaaa',
        ),
      ).toEqual({
        ...expectedResult,
        score: 1,
      });
    });
  });
});
