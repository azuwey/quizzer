import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, AccountDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private accountModel: Model<AccountDocument>,
  ) {}

  create(createAccountDto: CreateUserDto): Promise<User> {
    return this.accountModel.create(createAccountDto);
  }

  findOne(emailAddress: string): Promise<User | null> {
    if (emailAddress === '') {
      return null;
    }

    return this.accountModel.findOne({ emailAddress }).exec();
  }
}
