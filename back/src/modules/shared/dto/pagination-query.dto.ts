export class PaginationQueryDTO {
  page: number;
  pageSize: number;
  constructor(request: Partial<PaginationQueryDTO> = {}) {
    Object.assign(this, request);
  }
}
