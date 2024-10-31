interface PaginationLinks {
  next: string | null;
  previous: string | null;
}

interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: PaginationLinks;
}

interface Meta {
  status_code: number;
  success: boolean;
  message: string;
  pagination: Pagination;
}

export interface Token {
  id: number;
  token: string;
  started: string;
  expired: string;
  is_used: boolean;
  is_expired: boolean;
}

export interface Tokens {
  data: Token[];
  meta: Meta;
}
