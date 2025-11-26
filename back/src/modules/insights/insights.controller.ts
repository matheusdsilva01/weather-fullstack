import { Controller, Get } from '@nestjs/common';
import { InsightsService } from './insights.service';

@Controller({
  path: 'weather',
})
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get('current/insights')
  getInsights() {
    return this.insightsService.getCurrentWeatherInsights();
  }
}
