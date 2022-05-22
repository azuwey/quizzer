import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { Types } from 'mongoose';
import { Account } from '../accounts/schemas/account.schema';
import { AccountsService } from '../accounts/accounts.service';
import { BCRYPT } from '../constants/constants';
import { SignUpDto } from './dto/signUp.dto';
import { EmailIsAlreadyInUseException } from './exceptions/emailIsAlreadyInUse.exception';
import { IAuthResponse } from './interfaces/authResponse.interface';

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
    const account = await this.accountsService.findOne(emailAddress);

    if (account !== null && compareSync(password, account.passwordHash)) {
      return account;
    }

    return null;
  }

  async signUp(signUpDto: SignUpDto): Promise<IAuthResponse> {
    const account = await this.accountsService.findOne(signUpDto.emailAddress);

    if (account !== null) {
      throw new EmailIsAlreadyInUseException();
    }

    const newAccount = await this.accountsService.create({
      emailAddress: signUpDto.emailAddress,
      passwordHash: hashSync(signUpDto.password, BCRYPT.ROUNDS),
    });

    const { _id } = await this.accountsService.create(newAccount);

    return this.createAuthResponse(_id);
  }

  async signIn(account: Account): Promise<IAuthResponse> {
    return this.createAuthResponse(account._id);
  }

  private createAuthResponse(_id: Types.ObjectId) {
    return { access_token: this.jwtService.sign({ _id }) };
  }
}
