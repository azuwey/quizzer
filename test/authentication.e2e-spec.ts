import { Test, TestingModule } from '@nestjs/testing';
import { APP_PIPE } from '@nestjs/core';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as request from 'supertest';
import { AuthenticationModule } from '../src/authentication/authentication.module';
import { User, UserSchema } from '../src/users/schemas/user.schema';
import {
  closeInMongoDaemonConnection,
  rootMongooseTestModule,
} from './mongoDaemon.testModule';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthenticationModule,
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        {
          provide: APP_PIPE,
          useExisting: ValidationPipe,
        },
        ValidationPipe,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/authentication/sign-up (POST)', () => {
    it(`should return an access_token with ${HttpStatus.CREATED} status code`, (done) => {
      request(app.getHttpServer())
        .post('/authentication/sign-up')
        .send({ emailAddress: 'test@test.com', password: '12345678' })
        .expect('Content-Type', /json/)
        .expect((response) => {
          if (!response.body.access_token) {
            return new Error('access_token missing from response');
          }
        })
        .expect(HttpStatus.CREATED, done);
    });

    it(`should return an error about the emailAddress with ${HttpStatus.BAD_REQUEST} status code`, (done) => {
      request(app.getHttpServer())
        .post('/authentication/sign-up')
        .send({ emailAddress: 'yo', password: '12345678' })
        .expect('Content-Type', /json/)
        .expect({
          statusCode: 400,
          message: ['emailAddress must be an email'],
          error: 'Bad Request',
        })
        .expect(HttpStatus.BAD_REQUEST, done);
    });

    it(`should return an error about the password with ${HttpStatus.BAD_REQUEST} status code`, (done) => {
      request(app.getHttpServer())
        .post('/authentication/sign-up')
        .send({ emailAddress: 'test@test.com', password: 'yo' })
        .expect('Content-Type', /json/)
        .expect({
          statusCode: 400,
          message: ['password must be longer than or equal to 8 characters'],
          error: 'Bad Request',
        })
        .expect(HttpStatus.BAD_REQUEST, done);
    });
  });

  describe('/authentication/sign-in (POST)', () => {
    // TODO: Fix me, user needs to be registered before it can login
    /* it(`should return an access_token with ${HttpStatus.CREATED} status code`, (done) => {
      request(app.getHttpServer())
        .post('/authentication/sign-in')
        .send({
          emailAddress: 'test@test.com',
          password: '12345678',
        })
        .expect('Content-Type', /json/)
        .expect((response) => {
          if (!response.body.access_token) {
            return new Error('access_token missing from response');
          }
        })
        .expect(HttpStatus.CREATED);
    }); */

    it(`should return an error with ${HttpStatus.BAD_REQUEST} status code`, (done) => {
      request(app.getHttpServer())
        .post('/authentication/sign-in')
        .send({
          emailAddress: 'account_does_not_exist@test.com',
          password: '12345678',
        })
        .expect('Content-Type', /json/)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        })
        .expect(HttpStatus.UNAUTHORIZED, done);
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongoDaemonConnection();
  });
});
