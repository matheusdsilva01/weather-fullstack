import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { InsightsModule } from './modules/insights/insights.module';
import { UserModule } from './modules/user/user.module';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [
    WeatherModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    InsightsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
