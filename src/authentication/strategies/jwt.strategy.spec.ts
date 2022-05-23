import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { mockUser } from '../../../test/mocks/user.mock.spec';
import { AuthenticationService } from '../authentication.service';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: AuthenticationService,
          useValue: {
            validateUserById: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  describe('validate', () => {
    it('should return an account', async () => {
      expect(await strategy.validate({ sub: mockUser._id.toString() })).toEqual(
        { _id: mockUser._id.toString() },
      );
    });

    it('should throw an error', async () => {
      jest
        .spyOn(authenticationService, 'validateUserById')
        .mockImplementationOnce(() => Promise.resolve(null));

      await expect(
        strategy.validate({ sub: 'xxxx.xxxx.xxxx' }),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
