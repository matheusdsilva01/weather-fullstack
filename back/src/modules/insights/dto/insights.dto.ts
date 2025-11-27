import { ApiProperty } from '@nestjs/swagger';

export class InsightsDTO {
  @ApiProperty()
  wind: string;

  @ApiProperty()
  weather: string;

  constructor(partial: Partial<InsightsDTO> = {}) {
    Object.assign(this, partial);
  }
}
