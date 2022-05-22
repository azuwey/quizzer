import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
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
        await controller.signIn({
          user: {
            _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
            emailAddress: 'test@test.com',
            passwordHash: 'test',
          },
        } as ISignInRequest),
      ).toEqual(mockResponse);
    });
  });
});
