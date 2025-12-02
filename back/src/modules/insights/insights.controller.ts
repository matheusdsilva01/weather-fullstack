import { Controller, Get, UseGuards } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { ApiResponse } from '@nestjs/swagger';
import { InsightsDTO } from './dto/insights.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
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
