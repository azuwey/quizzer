import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { Types } from 'mongoose';
import { BCRYPT } from '../../constants/constants';
import { User } from '../../users/schemas/user.schema';
import { AuthenticationService } from '../authentication.service';
import { LocalStrategy } from './local.strategy';

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
            validateUserByEmail: jest.fn().mockResolvedValue(mockAccount),
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
        .spyOn(authenticationService, 'validateUserByEmail')
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        strategy.validate('test@test.com', 'test'),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
