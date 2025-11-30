import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

const currentWeatherMock = {
  latitude: -2,
  longitude: -44,
  apparent_temperature: 28,
  wind_direction: 31,
  wind_gusts: 36,
  wind_speed: 27,
  temperature: 27,
  time: '2025-11-28T20:30',
  precipitation: 0,
  cloud_cover: 23,
  relative_humidity: 75,
  weather_code: 1,
};

const weatherServiceMock = {
  getCurrentWeather: jest.fn(),
  postCurrentWeather: jest.fn(),
  exportCurrentWeather: jest.fn(),
};

describe('WeatherController', () => {
  let controller: WeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: weatherServiceMock,
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it('get current', async () => {
    weatherServiceMock.getCurrentWeather.mockResolvedValueOnce(
      currentWeatherMock,
    );
    const result = await controller.getCurrentWeather();
    expect(result).toEqual(currentWeatherMock);
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalled();
  });

  it('post current', async () => {
    weatherServiceMock.postCurrentWeather.mockResolvedValueOnce(
      currentWeatherMock,
    );
    const result = await controller.postCurrentWeather(currentWeatherMock);
    expect(result).toEqual(currentWeatherMock);
    expect(weatherServiceMock.postCurrentWeather).toHaveBeenCalledWith(
      currentWeatherMock,
    );
  });

  it('export current', async () => {
    const exportMock = {
      buffer: Buffer.from('test'),
      mimeType: 'text/plain',
      fileName: 'weather.csv',
    };
    weatherServiceMock.exportCurrentWeather.mockResolvedValueOnce(exportMock);
    const result = await controller.exportCurrentWeather('csv');

    expect(result).toBeDefined();
    expect(weatherServiceMock.exportCurrentWeather).toHaveBeenCalled();
  });
});
