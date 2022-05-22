import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import { Types } from 'mongoose';
import { LocalStrategy } from './local.strategy';
import { User } from '../../users/schemas/user.schema';
import { BCRYPT } from '../../constants/constants';
import { AuthenticationService } from '../authentication.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authenticationService: AuthenticationService;

  const mockAccount: User = {
    _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    emailAddress: 'test@test.com',
    passwordHash: hashSync('test', BCRYPT.ROUNDS),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthenticationService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue(mockAccount),
          },
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  describe('validate', () => {
    it('should return an account', async () => {
      expect(await strategy.validate('test@test.com', 'test')).toEqual(
        mockAccount,
      );
    });

    it('should throw an error', async () => {
      jest
        .spyOn(authenticationService, 'validateUser')
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        strategy.validate('test@test.com', 'test'),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
