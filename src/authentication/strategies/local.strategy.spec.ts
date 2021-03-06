import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { mockUser } from '../../../test/mocks/user.mock.spec';
import { AuthenticationService } from '../authentication.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthenticationService,
          useValue: {
            validateUserByEmail: jest.fn().mockResolvedValue(mockUser),
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
      expect(
        await strategy.validate(mockUser.emailAddress, '12345678'),
      ).toEqual(mockUser);
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
