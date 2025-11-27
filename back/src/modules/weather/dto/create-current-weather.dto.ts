import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrentWeatherDTO {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  temperature: number;

  @ApiProperty()
  time: string;

  @ApiProperty()
  wind_speed: number;

  @ApiProperty()
  wind_direction: number;

  @ApiProperty()
  wind_gusts: number;

  @ApiProperty()
  apparent_temperature: number;

  @ApiProperty()
  precipitation: number;

  @ApiProperty()
  cloud_cover: number;

  @ApiProperty()
  relative_humidity: number;

  @ApiProperty()
  weather_code: number;

  constructor(partial: Partial<CreateCurrentWeatherDTO> = {}) {
    Object.assign(this, partial);
  }
}
