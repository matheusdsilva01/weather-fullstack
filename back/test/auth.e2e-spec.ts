import { getConnectionToken } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';
import { UserDTO } from 'src/modules/user/dto/user.dto';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: NestExpressApplication;
  let connection: Connection;
  let createdUser: UserDTO;

  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
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
      await connection.close();
    }
    await app.close();
  });

  it('should create a user for authentication', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(testUser)
      .expect(201);

    createdUser = response.body as UserDTO;
    expect(createdUser).toHaveProperty('_id');
    expect(createdUser.email).toBe(testUser.email);
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('access_token');
  });

  it('/auth/profile (GET) - success', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);
    const body: AuthDTO = loginResponse.body as AuthDTO;
    const token = body.access_token;

    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const profileBody: UserDTO = response.body as UserDTO;
    expect(profileBody).toHaveProperty('_id');
    expect(profileBody.email).toBe(testUser.email);
  });

  it('/auth/login (POST) - failure (wrong password)', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      })
      .expect(401);
  });

  it('/auth/login (POST) - failure (user not found)', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      })
      .expect(401);
  });

  it('/auth/profile (GET) - failure (no token)', async () => {
    await request(app.getHttpServer()).get('/auth/profile').expect(401);
  });
});
