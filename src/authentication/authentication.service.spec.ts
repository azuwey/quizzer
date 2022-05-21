import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../accounts/accounts.service';
import { Account } from '../accounts/schemas/account.schema';
import { AuthenticationService } from './authentication.service';
import { EmailIsAlreadyInUseException } from './exceptions/emailIsAlreadyInUse.exception';
import { JwtService } from '@nestjs/jwt';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let accountService: AccountsService;

  const mockAccount: Account = {
    email: 'test@test.com',
    passwordHash:
      '$2y$12$R3Es6goCKnJ5hjOVlM4UruF7HEuXjWO4LgNsbtpO3OV0oGqYP5b8C', // hash of "test" rounds at 12
  };

  const mockJwtSignature = 'xxxxx.xxxxx.xxxxx';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: AccountsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockAccount),
            findOne: jest.fn().mockResolvedValue(mockAccount),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(mockJwtSignature),
          },
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    accountService = module.get<AccountsService>(AccountsService);
  });

  describe('validateUser', () => {
    it('should return an account', async () => {
      expect(await service.validateUser('test@test.com', 'test')).toEqual(
        mockAccount,
      );
    });

    it('should return null', async () => {
      expect(await service.validateUser('test@test.com', 'bad_password')).toBe(
        null,
      );
    });
  });

  describe('signUp', () => {
    it('should create an account', async () => {
      jest
        .spyOn(accountService, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(null));

      expect(await service.signUp(mockAccount)).not.toThrow();
    });

    it('should throw an error', async () => {
      expect(async () => await service.signUp(mockAccount)).toThrowError(
        new EmailIsAlreadyInUseException(),
      );
    });
  });

  describe('signIn', () => {
    it('should return an access_token', async () => {
      expect(await service.signIn(mockAccount)).toEqual({
        access_token: mockJwtSignature,
      });
    });
  });
});
