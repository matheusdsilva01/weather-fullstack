import { getConnectionToken } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { getWeatherVariable } from '../src/modules/insights/util/weather-insights';
import { getWindSpeedInsight } from '../src/modules/insights/util/wind-insights';
import { InsightsDTO } from 'src/modules/insights/dto/insights.dto';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';

describe('InsightsController (e2e)', () => {
  let app: NestExpressApplication;
  let connection: Connection;
  let accessToken: string;

  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
  };

  const weatherPayload = {
    latitude: -23.5505,
    longitude: -46.6333,
    temperature: 25,
    time: new Date().toISOString(),
    wind_speed: 10,
    wind_direction: 180,
    wind_gusts: 15,
    apparent_temperature: 27,
    precipitation: 0,
    cloud_cover: 20,
    relative_humidity: 60,
    weather_code: 0,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = app.get(getConnectionToken());

    await request(app.getHttpServer())
      .post('/weather')
      .send(weatherPayload)
      .expect(201);
    await request(app.getHttpServer()).post('/user').send(testUser).expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);
    const body = response.body as AuthDTO;
    accessToken = body.access_token;
  });

  afterAll(async () => {
    if (connection) {
      await connection.dropDatabase();
    }
    await app.close();
  });

  it('/weather/current/insights (GET) - should return weather insights', async () => {
    const response = await request(app.getHttpServer())
      .get('/weather/current/insights')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const body = response.body as InsightsDTO;

    expect(body).toHaveProperty('wind');
    expect(body).toHaveProperty('weather');
    expect(body.wind).toBe(getWindSpeedInsight(weatherPayload.wind_speed));
    expect(body.weather).toBe(getWeatherVariable(weatherPayload.weather_code));
  });
});
