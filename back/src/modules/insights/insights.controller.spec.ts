import { Test, TestingModule } from '@nestjs/testing';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';
import { InsightsDTO } from './dto/insights.dto';

const insightsMock = new InsightsDTO({
  wind: 'Moderate wind speed',
  weather: 'Clear weather',
});

const insightsServiceMock = {
  getCurrentWeatherInsights: jest.fn(),
};

describe('InsightsController', () => {
  let controller: InsightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsightsController],
      providers: [
        {
          provide: InsightsService,
          useValue: insightsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<InsightsController>(InsightsController);
  });

  it('current insights', async () => {
    insightsServiceMock.getCurrentWeatherInsights.mockResolvedValueOnce(
      insightsMock,
    );
    const result = await controller.getInsights();
    expect(result).toEqual(insightsMock);
    expect(insightsServiceMock.getCurrentWeatherInsights).toHaveBeenCalled();
  });
});
