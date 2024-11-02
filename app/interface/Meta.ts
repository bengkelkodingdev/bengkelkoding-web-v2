export interface PaginationLinks {
  next: string | null;
  previous: string | null;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: PaginationLinks;
}

export interface Meta {
  status_code: number;
  success: boolean;
  message: string;
  pagination: Pagination;
}
