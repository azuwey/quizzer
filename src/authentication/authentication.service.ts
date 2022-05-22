import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../accounts/schemas/account.schema';
import { AccountsService } from '../accounts/accounts.service';
import { IAuthResponse } from './interfaces/authResponse.interface';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    emailAddress: string,
    password: string,
  ): Promise<Account | null> {
    throw 'This validates the user and then returns it';
  }

  async signUp(signUpDto: SignUpDto): Promise<IAuthResponse> {
    throw 'This creates a new user and then returns an object that contains an access_token';
  }

  async signIn(signInDto: SignInDto): Promise<IAuthResponse> {
    throw 'This returns an object that contains an access_token';
  }
}
