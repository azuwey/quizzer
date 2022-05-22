import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'default',
      signOptions: { expiresIn: process.env.EXPIRY ?? '1h' },
    }),
    PassportModule,
  ],
  providers: [AuthenticationService, LocalStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
