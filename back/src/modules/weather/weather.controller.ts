import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { CreateCurrentWeatherDTO } from './dto/create-current-weather.dto';
import { WeatherService } from './weather.service';
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

  @Get('/export')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async exportCurrentWeather(
    @Query('format') format?: string,
  ): Promise<StreamableFile> {
    if (!format || (format !== 'csv' && format !== 'xlsx')) {
      throw new BadRequestException(
        `Invalid format '${format}'. Supported formats are csv and xlsx`,
      );
    }
    const payload = await this.weatherService.exportCurrentWeather(format);

    return new StreamableFile(payload.buffer, {
      type: payload.mimeType,
      disposition: `attachment; filename=${payload.fileName}`,
    });
  }
}
