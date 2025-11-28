import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCurrentWeatherDTO {
  @ApiProperty()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty()
  @IsNotEmpty()
  temperature: number;

  @ApiProperty()
  @IsNotEmpty()
  time: string;

  @ApiProperty()
  @IsNotEmpty()
  wind_speed: number;

  @ApiProperty()
  @IsNotEmpty()
  wind_direction: number;

  @ApiProperty()
  @IsNotEmpty()
  wind_gusts: number;

  @ApiProperty()
  @IsNotEmpty()
  apparent_temperature: number;

  @ApiProperty()
  @IsNotEmpty()
  precipitation: number;

  @ApiProperty()
  @IsNotEmpty()
  cloud_cover: number;

  @ApiProperty()
  @IsNotEmpty()
  relative_humidity: number;

  @ApiProperty()
  @IsNotEmpty()
  weather_code: number;

  constructor(partial: Partial<CreateCurrentWeatherDTO> = {}) {
    Object.assign(this, partial);
  }
}
