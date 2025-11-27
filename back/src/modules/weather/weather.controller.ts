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
import { ApiResponse } from '@nestjs/swagger';
import { WeatherDTO } from './dto/weather.dto';
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/current')
  @ApiResponse({ status: 200, type: WeatherDTO })
  getCurrentWeather(): Promise<WeatherDTO> {
    return this.weatherService.getCurrentWeather();
  }

  @Post()
  @ApiResponse({ status: 201, type: WeatherDTO })
  postCurrentWeather(
    @Body() payload: CreateCurrentWeatherDTO,
  ): Promise<WeatherDTO> {
    return this.weatherService.postCurrentWeather(payload);
  }

  @Get('/export')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  @ApiResponse({ status: 200, type: StreamableFile })
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
