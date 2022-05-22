import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Answer } from './schemas/answer.schema';
import { Attempt } from './schemas/attempt.schema';
import { Question } from './schemas/question.schema';
import { Quiz } from './schemas/quiz.schema';
import { QuizzesService } from './quizzes.service';

describe('QuizService', () => {
  let service: QuizzesService;

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
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(Quiz.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
  });

  describe('createQuiz', () => {
    it('should create a new quiz', () => {
      expect(service.create(mockQuiz, 'aaaaaaaaaaaaaaaaaaaaaaaa')).toEqual(
        mockQuiz,
      );
    });
  });

  describe('findOne', () => {
    it('should return a quiz', () => {
      expect(service.findOne('aaaaaaaaaaaaaaaaaaaaaaaa')).toEqual(mockQuiz);
    });

    it('should return null', () => {
      expect(service.findOne('aaaaaaaaaaaaaaaaaaaaaaab')).toEqual(null);
    });
  });

  describe('findByUserId', () => {
    it('should return an array of quizzes', () => {
      expect(service.findByUserId('aaaaaaaaaaaaaaaaaaaaaaaa')).toContainEqual([
        mockQuiz,
      ]);
    });

    it('should return an empty array', () => {
      expect(service.findOne('aaaaaaaaaaaaaaaaaaaaaaab')).toContainEqual([]);
    });
  });

  describe('attempt', () => {
    it('should create a new attempt with 0 score', () => {
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
        score: 0,
      };
      expect(
        service.attempt(
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
      ).toEqual({});
    });

    it('should create a new attempt with 0 score because of unanswered questions', () => {
      const expectedResult: Attempt = {
        _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
        quiz: mockQuiz._id,
        user: mockUser._id,
        results: [],
        score: 0,
      };
      expect(
        service.attempt(
          {
            quizId: mockQuiz._id.toString(),
            answers: [],
          },
          'aaaaaaaaaaaaaaaaaaaaaaaa',
        ),
      ).toEqual({});
    });

    it('should create a new attempt with 1 score', () => {
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
        score: 1,
      };
      expect(
        service.attempt(
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
      ).toEqual({});
    });
  });
});
