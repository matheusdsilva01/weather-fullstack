import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiResponseProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;
  constructor(request: Partial<AuthDTO> = {}) {
    Object.assign(this, request);
  }
}
