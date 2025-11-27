import { ApiProperty } from '@nestjs/swagger';

export class WeatherDTO {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  apparent_temperature: number;

  @ApiProperty()
  wind_direction: number;

  @ApiProperty()
  wind_gusts: number;

  @ApiProperty()
  wind_speed: number;

  @ApiProperty()
  temperature: number;

  @ApiProperty()
  time: string;

  @ApiProperty()
  precipitation: number;

  @ApiProperty()
  cloud_cover: number;

  @ApiProperty()
  relative_humidity: number;

  @ApiProperty()
  weather_code: number;

  constructor(partial: Partial<WeatherDTO> = {}) {
    Object.assign(this, partial);
  }
}
