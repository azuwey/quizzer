import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcrypt';
import { Types } from 'mongoose';
import { BCRYPT } from '../constants/constants';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import { AuthenticationService } from './authentication.service';
import { EmailIsAlreadyInUseException } from './exceptions/emailIsAlreadyInUse.exception';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userService: UsersService;

  const mockUser: User = {
    _id: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    emailAddress: 'test@test.com',
    passwordHash: hashSync('test', BCRYPT.ROUNDS),
  };

  const mockJwtSignature = 'xxxxx.xxxxx.xxxxx';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findOneByEmail: jest.fn().mockResolvedValue(mockUser),
            findOneById: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(mockJwtSignature),
          },
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    userService = module.get<UsersService>(UsersService);
  });

  describe('validateUserByEmail', () => {
    it('should return an account', async () => {
      expect(
        await service.validateUserByEmail({
          emailAddress: 'test@test.com',
          password: 'test',
        }),
      ).toEqual(mockUser);
    });

    it('should return null', async () => {
      expect(
        await service.validateUserByEmail({
          emailAddress: 'test@test.com',
          password: 'bad_password',
        }),
      ).toBe(null);
    });
  });

  describe('signUp', () => {
    it('should create an account', async () => {
      jest
        .spyOn(userService, 'findOneByEmail')
        .mockImplementationOnce(() => Promise.resolve(null));

      expect(
        await service.signUp({
          emailAddress: 'test@test.com',
          password: 'test',
        }),
      ).toEqual({
        access_token: mockJwtSignature,
      });
    });

    it('should throw an error', async () => {
      await expect(
        service.signUp({
          emailAddress: 'test@test.com',
          password: 'test',
        }),
      ).rejects.toThrowError(EmailIsAlreadyInUseException);
    });
  });

  describe('signIn', () => {
    it('should return an access_token', async () => {
      expect(await service.signIn(mockUser)).toEqual({
        access_token: mockJwtSignature,
      });
    });
  });
});
