import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WeatherDocument = HydratedDocument<Weather>;

@Schema()
export class Weather {
  _id: Types.ObjectId;
  @Prop()
  longitude: number;
  @Prop()
  latitude: number;

  @Prop()
  temperature: number;
  @Prop()
  time: string;
  @Prop()
  wind_speed: number;
  @Prop()
  wind_direction: number;
  @Prop()
  wind_gusts: number;
  @Prop()
  apparent_temperature: number;
  @Prop()
  precipitation: number;
  @Prop()
  cloud_cover: number;
  @Prop()
  relative_humidity: number;
  @Prop()
  weather_code: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
