import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/schemas/user.schema';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'emailAddress',
    });
  }

  async validate(emailAddress: string, password: string): Promise<User> {
    const user = await this.authenticationService.validateUserByEmail({
      emailAddress,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
