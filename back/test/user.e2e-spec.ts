import { getConnectionToken } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserDTO } from 'src/modules/user/dto/user.dto';
import { PaginationResultDTO } from 'src/modules/shared/dto/pagination-result.dto';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';

describe('UserController (e2e)', () => {
  let app: NestExpressApplication;
  let connection: Connection;
  let accessToken: string;
  let createdUser: UserDTO;

  const testUser = {
    name: 'E2E User',
    email: 'e2e@example.com',
    password: 'password123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = app.get(getConnectionToken());
  });

  afterAll(async () => {
    if (connection) {
      await connection.dropDatabase();
    }
    await app.close();
  });

  it('/user (POST) - should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(testUser)
      .expect(201);

    createdUser = response.body as UserDTO;
    expect(createdUser).toHaveProperty('_id');
    expect(createdUser.email).toBe(testUser.email);
    expect(createdUser.name).toBe(testUser.name);
  });

  it('/auth/login (POST) - should login and return token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);

    const body = response.body as AuthDTO;
    expect(response.body).toHaveProperty('access_token');
    accessToken = body.access_token;
  });

  it('/user (GET) - should list users (with token)', async () => {
    const response = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ page: 1, pageSize: 10 })
      .expect(200);

    const body = response.body as PaginationResultDTO<UserDTO[]>;
    expect(response.body).toHaveProperty('items');
    expect(Array.isArray(body.items)).toBe(true);
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.totalItems).toBeGreaterThan(0);
  });

  it('/user (GET) - should fail without token', async () => {
    await request(app.getHttpServer()).get('/user').expect(401);
  });

  it('/user/:id (PUT) - should update user', async () => {
    const newName = 'Updated E2E User';
    const response = await request(app.getHttpServer())
      .put(`/user/${createdUser._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: newName })
      .expect(200);

    expect(response.text).toBe('true');

    const listResponse = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    const body = listResponse.body as PaginationResultDTO<UserDTO[]>;
    const updatedUser = body.items.find(
      (user) => user._id === createdUser._id,
    ) as UserDTO;
    expect(updatedUser.name).toBe(newName);
  });

  it('/user/:id (DELETE) - should delete user', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/user/${createdUser._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.text).toBe('true');

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(401);
  });
});
