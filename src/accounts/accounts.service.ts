import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './schemas/account.schema';

@Injectable()
export class AccountsService {
  create(createAccountDto: CreateAccountDto): Promise<Account> {
    throw 'This action adds a new account';
  }

  findOne(emailAddress: string): Promise<Account | null> {
    throw `This action returns an account with ${emailAddress} emailAddress`;
  }
}
