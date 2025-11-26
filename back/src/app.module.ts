import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { WeatherModule } from './modules/weather/weather.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { InsightsModule } from './modules/insights/insights.module';

@Module({
  imports: [
    WeatherModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    InsightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
