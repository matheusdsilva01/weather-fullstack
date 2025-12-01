import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { InsightsModule } from './modules/insights/insights.module';
import { UserModule } from './modules/user/user.module';
import { WeatherModule } from './modules/weather/weather.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    WeatherModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    InsightsModule,
    HealthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
