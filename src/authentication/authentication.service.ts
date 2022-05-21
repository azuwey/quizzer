import { Injectable } from '@nestjs/common';
import { Account } from '../accounts/schemas/account.schema';
import { ISignInResponse } from '../accounts/interfaces/signInResponse.interface';
import { ISignUpResponse } from '../accounts/interfaces/signUpResponse.interface';

@Injectable()
export class AuthenticationService {
  async validateUser(
    username: string,
    password: string,
  ): Promise<Account | null> {
    throw 'This validates the user and then returns it';
  }

  async signUp(account: Account): Promise<ISignUpResponse> {
    throw 'This creates a new user and then returns an object that contains an access_token';
  }

  async signIn(account: Account): Promise<ISignInResponse> {
    throw 'This returns an object that contains an access_token';
  }
}
