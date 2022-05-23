import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  async validate(emailAddress: string, password: string): Promise<any> {
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
