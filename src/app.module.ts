import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AccountsModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<MongooseModuleFactoryOptions>('database'),
    }),
  ],
})
export class AppModule {}
