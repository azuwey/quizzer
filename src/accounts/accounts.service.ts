import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account, AccountDocument } from './schemas/account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private catModel: Model<AccountDocument>,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    throw 'This action adds a new account';
  }

  findOne(emailAddress: string): Promise<Account | null> {
    throw `This action returns an account with ${emailAddress} emailAddress`;
  }
}
