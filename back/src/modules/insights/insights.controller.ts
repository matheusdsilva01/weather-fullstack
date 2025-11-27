import { Controller, Get } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { ApiResponse } from '@nestjs/swagger';
import { InsightsDTO } from './dto/insights.dto';

@Controller({
  path: 'weather',
})
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get('current/insights')
  @ApiResponse({ status: 200, type: InsightsDTO })
  getInsights() {
    return this.insightsService.getCurrentWeatherInsights();
  }
}
