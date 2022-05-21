import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../accounts/schemas/account.schema';
import { AccountsService } from '../accounts/accounts.service';
import { ISignInResponse } from './interfaces/signInResponse.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Account | null> {
    throw 'This validates the user and then returns it';
  }

  async signUp(account: Account): Promise<void> {
    throw 'This creates a new user and then returns an object that contains an access_token';
  }

  async signIn(account: Account): Promise<ISignInResponse> {
    throw 'This returns an object that contains an access_token';
  }
}
