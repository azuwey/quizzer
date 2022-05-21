import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AccountsModule, AuthenticationModule],
})
export class AppModule {}
