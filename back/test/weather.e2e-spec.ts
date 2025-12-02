import { getConnectionToken } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('WeatherController (e2e)', () => {
  let app: NestExpressApplication;
  let connection: Connection;

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
    weather_code: 1,
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

  it('/weather (POST) - should create weather data', async () => {
    const response = await request(app.getHttpServer())
      .post('/weather')
      .send(weatherPayload)
      .expect(201);

    expect(response.body.temperature).toBe(weatherPayload.temperature);
  });

  it('/weather/current (GET) - should return the latest weather data', async () => {
    const response = await request(app.getHttpServer())
      .get('/weather/current')
      .expect(200);

    expect(response.body.temperature).toBe(weatherPayload.temperature);
  });

  it('/weather/export (GET) - should export as CSV', async () => {
    const response = await request(app.getHttpServer())
      .get('/weather/export')
      .query({ format: 'csv' })
      .expect(200);

    expect(response.header['content-type']).toMatch(/text\/csv/);
    expect(response.header['content-disposition']).toMatch(
      /attachment; filename=weather-export-\d{4}-\d{2}-\d{2}\.csv/,
    );
  });

  it('/weather/export (GET) - should export as XLSX', async () => {
    const response = await request(app.getHttpServer())
      .get('/weather/export')
      .query({ format: 'xlsx' })
      .expect(200);

    expect(response.header['content-type']).toMatch(
      /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/,
    );
    expect(response.header['content-disposition']).toMatch(
      /attachment; filename=weather-export-\d{4}-\d{2}-\d{2}\.xlsx/,
    );
  });

  it('/weather/export (GET) - should fail with invalid format', async () => {
    await request(app.getHttpServer())
      .get('/weather/export')
      .query({ format: 'invalid' })
      .expect(400);
  });
});
