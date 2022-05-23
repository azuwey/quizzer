import { getModelToken } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Types } from 'mongoose';
import { User } from '../../src/users/schemas/user.schema';
import { BCRYPT } from '../../src/constants/constants';

export const mockUser: User = {
  _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
  emailAddress: 'test@test.com',
  passwordHash: hashSync('12345678', BCRYPT.ROUNDS),
};

export const mockUserProvider = {
  provide: getModelToken(User.name),
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
