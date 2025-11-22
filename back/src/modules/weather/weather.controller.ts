import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateCurrentWeatherDTO } from './dto/create-current-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/current')
  getCurrentWeather() {
    return this.weatherService.getCurrentWeather();
  }

  @Post()
  postCurrentWeather(@Body() payload: CreateCurrentWeatherDTO) {
    return this.weatherService.postCurrentWeather(payload);
  }
}
