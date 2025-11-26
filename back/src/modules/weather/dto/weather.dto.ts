export class WeatherDTO {
  latitude: number;
  longitude: number;
  apparent_temperature: number;
  wind_direction: number;
  wind_gusts: number;
  wind_speed: number;
  constructor(partial: Partial<WeatherDTO> = {}) {
    Object.assign(this, partial);
  }
}
