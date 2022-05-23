import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { Types } from 'mongoose';
import { BCRYPT } from '../constants/constants';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import { EmailIsAlreadyInUseException } from './exceptions/emailIsAlreadyInUse.exception';
import { IAuthResponse } from './interfaces/authResponse.interface';
import { SignInDto } from './dto/signInDto';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountsService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByEmail({
    emailAddress,
    password,
  }: SignInDto): Promise<User | null> {
    const account = await this.accountsService.findOneByEmail(emailAddress);

    if (account !== null && compareSync(password, account.passwordHash)) {
      return account;
    }

    return null;
  }

  async validateUserById(id: string): Promise<User | null> {
    return await this.accountsService.findOneById(id);
  }

  async signUp(signUpDto: SignUpDto): Promise<IAuthResponse> {
    const account = await this.accountsService.findOneByEmail(
      signUpDto.emailAddress,
    );

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

  async signIn(account: User): Promise<IAuthResponse> {
    return this.createAuthResponse(account._id);
  }

  private createAuthResponse(_id: Types.ObjectId): IAuthResponse {
    return { access_token: this.jwtService.sign({ sub: _id }) };
  }
}
