import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.URI || 'mongodb://user:password@localhost:27017/weather',
    ),
  ],
})
export class DatabaseModule {}
