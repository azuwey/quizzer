import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { QuizzesModule } from './quizzes/quiz.module';
import configuration from './config/configuration';

@Module({
  imports: [
    UsersModule,
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
    QuizzesModule,
  ],
})
export class AppModule {}
