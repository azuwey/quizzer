import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { Account } from './schemas/account.schema';
import { AccountDoesNotExistException } from './exceptions/accountDoesNotExist.exception';
import { EmailIsAlreadyInUse } from './exceptions/emailIsAlreadyInUse.exception';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // TODO: Mock database connection
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  describe('create', () => {
    it('should return an account', async () => {
      const result: Account = {
        email: 'test@test.com',
        passwordHash: 'some_bcrypt_hash',
      };
      // TODO: Mock bcrypt hashing
      expect(
        await service.create({
          email: 'test@test.com',
          password: 'hello',
        }),
      ).toEqual(result);
    });

    it('should throw an error', async () => {
      const newAccount = {
        email: 'test@test.com',
        password: 'hello',
      };

      const accounts: Account[] = [];
      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        if (accounts.length === 0) {
          return null;
        } else {
          return accounts[0];
        }
      });

      // TODO: Mock database record creation

      expect(await service.create(newAccount)).toEqual({
        email: 'test@test.com',
        passwordHash: 'some_bcrypt_hash',
      });

      expect(() => service.create(newAccount)).toThrowError(
        EmailIsAlreadyInUse,
      );
    });
  });

  describe('findOne', () => {
    it('should return an account', async () => {
      const result: Account = {
        email: 'test@test.com',
        passwordHash: 'some_bcrypt_hash',
      };
      expect(await service.findOne('test')).toEqual(result);
    });

    it('should throw an error', async () => {
      expect(() => service.findOne('')).toThrowError(
        AccountDoesNotExistException,
      );
    });
  });
});
