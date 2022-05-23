import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Result } from '../../src/quizzes/schemas/result.schema';

export const mockResultCorrect: Result = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  attempt: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  question: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  answer: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
};

export const mockResultIncorrect: Result = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  attempt: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  question: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaab'),
  answer: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
};

export const mockResultProvider = {
  provide: getModelToken(Result.name),
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
