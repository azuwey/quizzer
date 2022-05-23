import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { mockResultCorrect, mockResultIncorrect } from './result.mock.spec';
import { Attempt } from '../../src/quizzes/schemas/attempt.schema';

export const mockAttemptCorrect: Attempt = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  quiz: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  user: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  score: 1,
  results: [mockResultCorrect],
};

export const mockAttemptIncorrect: Attempt = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  quiz: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  user: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  score: 0,
  results: [mockResultIncorrect],
};

export const mockAttemptProvider = {
  provide: getModelToken(Attempt.name),
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
