export class PaginationResultDTO<T> {
  items: T;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  constructor(request: Partial<PaginationResultDTO<T>> = {}) {
    Object.assign(this, request);
  }
}
