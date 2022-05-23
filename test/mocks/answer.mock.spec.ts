import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Answer } from '../../src/quizzes/schemas/answer.schema';

export const mockAnswerCorrect: Answer = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  answer: 'Yes',
  isCorrect: true,
  question: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
};

export const mockAnswerIncorrect: Answer = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaab'),
  answer: 'No',
  isCorrect: false,
  question: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
};

export const mockAnswerProvider = {
  provide: getModelToken(Answer.name),
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
