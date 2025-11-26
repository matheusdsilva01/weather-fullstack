export class CreateCurrentWeatherDTO {
  latitude: number;
  longitude: number;
  temperature: number;
  time: string;
  wind_speed: number;
  wind_direction: number;
  wind_gusts: number;
  apparent_temperature: number;
  precipitation: number;
  cloud_cover: number;
  relative_humidity: number;
  weather_code: number;
}
