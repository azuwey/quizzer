import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Quiz } from '../../src/quizzes/schemas/quiz.schema';
import { mockQuestion } from './question.mock.spec';

export const mockQuiz: Quiz = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  questions: [mockQuestion],
  owner: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  attempts: [],
};

export const mockQuizProvider = {
  provide: getModelToken(Quiz.name),
  useValue: {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
    populate: jest.fn(),
    toObject: jest.fn(),
  },
};
