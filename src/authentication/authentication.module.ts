import { Module } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AccountsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'default',
      signOptions: { expiresIn: process.env.EXPIRY ?? '1h' },
    }),
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
