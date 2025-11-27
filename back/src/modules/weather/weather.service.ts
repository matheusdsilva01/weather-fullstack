import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCurrentWeatherDTO } from './dto/create-current-weather.dto';
import { WeatherDTO } from './dto/weather.dto';
import { Weather } from './weather.schema';
import {
  WeatherExportFormat,
  WeatherExportPayload,
  buildWeatherExport,
} from './util/weather-export.util';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  async getCurrentWeather(): Promise<WeatherDTO> {
    const weatherData = await this.weatherModel.findOne().exec();
    return new WeatherDTO(weatherData?.toObject());
  }

  async exportCurrentWeather(
    format: WeatherExportFormat,
  ): Promise<WeatherExportPayload> {
    const row = await this.getCurrentWeather();
    if (!row) {
      throw new NotFoundException();
    }
    return buildWeatherExport([row], format);
  }

  async postCurrentWeather(payload: CreateCurrentWeatherDTO): Promise<Weather> {
    const weather = new this.weatherModel(payload);

    if (
      await this.weatherModel
        .find({ latitude: payload.latitude, longitude: payload.longitude })
        .exec()
    ) {
      const updatedWeather = await this.weatherModel
        .findOneAndUpdate(
          { latitude: payload.latitude, longitude: payload.longitude },
          payload,
          { new: true },
        )
        .exec();
      return updatedWeather!.toObject();
    }
    return await weather.save();
  }
}
