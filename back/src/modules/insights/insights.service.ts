import { Injectable, NotFoundException } from '@nestjs/common';
import { WeatherService } from '../weather/weather.service';
import { getWindSpeedInsight } from './util/wind-insights';
import { getWeatherVariable } from './util/weather-insights';
import { InsightsDTO } from './dto/insights.dto';

@Injectable()
export class InsightsService {
  constructor(private readonly weatherService: WeatherService) {}
  async getCurrentWeatherInsights() {
    const weatherData = await this.weatherService.getCurrentWeather();
    if (!weatherData) {
      return new NotFoundException();
    }

    const windSpeedInsight = getWindSpeedInsight(weatherData.wind_speed);
    const weatherVariable = getWeatherVariable(weatherData.weather_code);

    return new InsightsDTO({
      wind: windSpeedInsight,
      weather: weatherVariable,
    });
  }
}
