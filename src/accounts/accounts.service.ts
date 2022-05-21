import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './schemas/account.schema';

@Injectable()
export class AccountsService {
  create(createAccountDto: CreateAccountDto): Promise<Account> {
    throw 'This action adds a new account';
  }

  findOne(username: string): Promise<Account> {
    throw `This action returns an account with ${username} username`;
  }
}
