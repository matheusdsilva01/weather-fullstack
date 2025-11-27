import { ApiProperty } from '@nestjs/swagger';

export class PaginationResultDTO<T> {
  @ApiProperty({
    isArray: true,
  })
  items: T;
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  itemsPerPage: number;
  constructor(request: Partial<PaginationResultDTO<T>> = {}) {
    Object.assign(this, request);
  }
}
