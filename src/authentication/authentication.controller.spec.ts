import { Test, TestingModule } from '@nestjs/testing';
import { mockUser } from '../../test/mocks/user.mock.spec';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { ISignInRequest } from './interfaces/signInRequest.interface';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  const mockResponse = { access_token: 'xxxxx.xxxxx.xxxxx' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            signUp: jest.fn().mockResolvedValue(mockResponse),
            signIn: jest.fn().mockResolvedValue(mockResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  describe('signUp', () => {
    it('should create an account', async () => {
      expect(
        await controller.signUp({
          emailAddress: 'test@test.com',
          password: 'test',
        }),
      ).toEqual(mockResponse);
    });
  });

  describe('signIn', () => {
    it('should return an access_token', async () => {
      expect(
        await controller.signIn({ user: mockUser } as ISignInRequest),
      ).toEqual(mockResponse);
    });
  });
});
