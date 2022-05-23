import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User, UserDocument } from './schemas/user.schema';
import { mockUser, mockUserProvider } from '../../test/mocks/user.mock.spec';

describe('AccountsService', () => {
  let service: UsersService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, mockUserProvider],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  describe('create', () => {
    it('should return a user', async () => {
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockUser));

      expect(await service.create(mockUser)).toEqual(mockUser);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      expect(await service.findOneByEmail('test@test.com')).toEqual(mockUser);
    });

    it('should return null', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      expect(await service.findOneByEmail('does_not_exist@test.com')).toBe(
        null,
      );
    });
  });

  describe('findOneById', () => {
    it('should return a user', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      expect(await service.findOneById('aaaaaaaaaaaaaaaaaaaaaaaa')).toEqual(
        mockUser,
      );
    });

    it('should return null', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      expect(await service.findOneById('aaaaaaaaaaaaaaaaaaaaaaab')).toBe(null);
    });
  });
});
