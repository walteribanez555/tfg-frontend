export type PaginationResponseDto<T> =  {
  limit: number;
  offset: number;
  items: T[];
  total: number;
}
