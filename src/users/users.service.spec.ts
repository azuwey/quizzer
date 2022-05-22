import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from './users.service';
import { User, AccountDocument } from './schemas/user.schema';

describe('AccountsService', () => {
  let service: UsersService;
  let model: Model<AccountDocument>;

  const mockUser: User = {
    _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    emailAddress: 'test@test.com',
    passwordHash: 'some_bcrypt_hash',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<AccountDocument>>(getModelToken(User.name));
  });

  describe('create', () => {
    it('should return a user', async () => {
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockUser));

      expect(await service.create(mockUser)).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      expect(await service.findOne('test@test.com')).toEqual(mockUser);
    });

    it('should return null', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      expect(await service.findOne('')).toBe(null);
    });
  });
});
