export interface DosenData {
  id: number;
  npp: string;
  name: string;
  email: string;
  is_active: number;
}

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

export interface DosenRespon {
  data: DosenData[];
  meta: Meta;
}
