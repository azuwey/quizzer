import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Question } from '../../src/quizzes/schemas/question.schema';
import { mockAnswerCorrect, mockAnswerIncorrect } from './answer.mock.spec';

export const mockQuestion: Question = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  answers: [mockAnswerCorrect, mockAnswerIncorrect],
  question: 'Yes?',
  quiz: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
};

export const mockQuestionProvider = {
  provide: getModelToken(Question.name),
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
