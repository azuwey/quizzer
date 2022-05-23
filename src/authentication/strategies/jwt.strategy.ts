import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT } from '../../constants/constants';
import { IJwtPayload } from '../interfaces/jwtPayload.interface';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT.SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authenticationService.validateUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { _id: payload.sub };
  }
}
