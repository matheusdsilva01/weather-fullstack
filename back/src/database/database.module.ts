import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `${process.env.SCHEME}://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`,
    ),
  ],
})
export class DatabaseModule {}
