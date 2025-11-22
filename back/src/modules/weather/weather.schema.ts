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
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
