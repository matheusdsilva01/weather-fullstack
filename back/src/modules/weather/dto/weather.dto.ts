export class WeatherDTO {
  latitude: number;
  longitude: number;
  apparent_temperature: number;
  wind_direction: number;
  wind_gusts: number;
  wind_speed: number;
  temperature: number;
  time: string;
  precipitation: number;
  cloud_cover: number;
  relative_humidity: number;
  weather_code: number;
  constructor(partial: Partial<WeatherDTO> = {}) {
    Object.assign(this, partial);
  }
}
