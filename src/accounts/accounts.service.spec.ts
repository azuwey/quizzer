import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { Account, AccountDocument } from './schemas/account.schema';
import { Model } from 'mongoose';

describe('AccountsService', () => {
  let service: AccountsService;
  let model: Model<AccountDocument>;

  const mockAccount = {
    email: 'test@test.com',
    passwordHash: 'some_bcrypt_hash',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getModelToken(Account.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    model = module.get<Model<AccountDocument>>(getModelToken(Account.name));
  });

  describe('create', () => {
    it('should return an account', async () => {
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockAccount));

      expect(await service.create(mockAccount)).toEqual(mockAccount);
    });
  });

  describe('findOne', () => {
    it('should return an account', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockAccount),
      } as any);

      expect(await service.findOne('test@test.com')).toEqual(mockAccount);
    });

    it('should return null', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      expect(await service.findOne('')).toBe(null);
    });
  });
});
