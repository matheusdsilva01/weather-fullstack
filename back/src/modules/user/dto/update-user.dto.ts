import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  name: string;

  constructor(request: Partial<UpdateUserDTO> = {}) {
    Object.assign(this, request);
  }
}
