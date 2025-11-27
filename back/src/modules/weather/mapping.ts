import { TypeMapper } from 'ts-mapper';
import { WeatherDTO } from './dto/weather.dto';
import { Weather } from './weather.schema';

class Mapper extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<Weather, WeatherDTO>()
      .map(
        (src) => src.latitude,
        (dest) => dest.latitude,
      )
      .map(
        (src) => src.longitude,
        (dest) => dest.longitude,
      )
      .map(
        (src) => src.temperature,
        (dest) => dest.temperature,
      )
      .map(
        (src) => src.apparent_temperature,
        (dest) => dest.apparent_temperature,
      )
      .map(
        (src) => src.wind_direction,
        (dest) => dest.wind_direction,
      )
      .map(
        (src) => src.wind_speed,
        (dest) => dest.wind_speed,
      )
      .map(
        (src) => src.wind_gusts,
        (dest) => dest.wind_gusts,
      )
      .map(
        (src) => src.cloud_cover,
        (dest) => dest.cloud_cover,
      )
      .map(
        (src) => src.relative_humidity,
        (dest) => dest.relative_humidity,
      )
      .map(
        (src) => src.time,
        (dest) => dest.time,
      )
      .map(
        (src) => src.precipitation,
        (dest) => dest.precipitation,
      )
      .map(
        (src) => src.weather_code,
        (dest) => dest.weather_code,
      );
  }
}

export const mapper = new Mapper();
