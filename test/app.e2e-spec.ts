import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as Chance from 'chance';

const chance = new Chance();

const user = {
  email: chance.email(),
  password: chance.string(),
  accessToken: null,
  userId: null,
};
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET) 401 without JWT token', () => {
    return request(app.getHttpServer()).get('/users').expect(401);
  });

  it('/users to create a testing user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.userId).toBeDefined();
        user.userId = body.userId;
      });
  });

  it('/auth/login to login with the testing user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.accessToken).toBeDefined();
        user.accessToken = body.accessToken;
      });
  });

  it('/users/:userId to get user data', () => {
    return request(app.getHttpServer())
      .get(`/users/${user.userId}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.userId).toBe(user.userId);
        expect(body.password).toBeUndefined();
      });
  });

  it('/users/:userId to delete the testing user', () => {
    return request(app.getHttpServer())
      .delete(`/users/${user.userId}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .expect(200);
  });

  it('/users/:userId to get user data', () => {
    return request(app.getHttpServer())
      .get(`/users/${user.userId}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(404);
  });

  afterEach(() => {
    app.close();
  });
});
