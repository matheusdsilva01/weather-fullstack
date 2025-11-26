export class InsightsDTO {
  wind: string;
  weather: string;

  constructor(partial: Partial<InsightsDTO> = {}) {
    Object.assign(this, partial);
  }
}
