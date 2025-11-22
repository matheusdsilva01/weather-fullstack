import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCurrentWeatherDTO } from './dto/create-current-weather.dto';
import { Weather } from './weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  async getCurrentWeather(): Promise<Weather | null> {
    return await this.weatherModel.findOne().exec();
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
