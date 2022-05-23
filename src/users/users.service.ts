import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private accountModel: Model<UserDocument>,
  ) {}

  create(createAccountDto: CreateUserDto): Promise<User> {
    return this.accountModel.create(createAccountDto);
  }

  findOneByEmail(emailAddress: string): Promise<User | null> {
    if (emailAddress === '') {
      return null;
    }

    return this.accountModel.findOne({ emailAddress }).exec();
  }

  findOneById(id: string): Promise<User | null> {
    if (id === '') {
      return null;
    }

    return this.accountModel.findOne({ _id: id }).exec();
  }
}
