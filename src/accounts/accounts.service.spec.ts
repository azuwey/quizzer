import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { Account } from './schemas/account.schema';
import { AccountDoesNotExistException } from './exceptions/accountDoesNotExist.exception';
import { EmailIsAlreadyInUse } from './exceptions/emailIsAlreadyInUse.exception';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AccountsService', () => {
  let service: AccountsService;
  let model: Model<Account>;

  const mockAccount = {
    email: 'test@test.com',
    passwordHash:
      '$2y$12$ptQ57YEK4LyBkOevis7mVe3qdaK0wiNtFHYhOPobuDbsZ5I3s/W1C', // hash of "test" at cost 12
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getModelToken(Account.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockAccount),
            constructor: jest.fn().mockResolvedValue(mockAccount),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    model = module.get<Model<Account>>(getModelToken(Account.name));
  });

  describe('create', () => {
    it('should return an account', async () => {
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockAccount));

      expect(
        await service.create({
          email: 'test@test.com',
          password: 'test',
        }),
      ).toEqual(mockAccount);
    });

    it('should throw an error', async () => {
      const newAccount = {
        email: 'test@test.com',
        password: 'test',
      };

      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(mockAccount));

      expect(() => service.create(newAccount)).toThrowError(
        EmailIsAlreadyInUse,
      );
    });
  });

  describe('findOne', () => {
    it('should return an account', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockAccount),
      } as any);

      expect(await service.findOne('test')).toEqual(mockAccount);
    });

    it('should throw an error', async () => {
      expect(() => service.findOne('')).toThrowError(
        AccountDoesNotExistException,
      );
    });
  });
});
