import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  constructor(partial: Partial<UserDTO> = {}) {
    Object.assign(this, partial);
  }
}
