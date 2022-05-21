import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account, AccountDocument } from './schemas/account.schema';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountModel.create(createAccountDto);
  }

  findOne(emailAddress: string): Promise<Account | null> {
    if (emailAddress === '') {
      return null;
    }

    return this.accountModel.findOne({ emailAddress }).exec();
  }
}