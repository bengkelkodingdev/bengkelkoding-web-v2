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

export interface ImageSimple {
  id: number;
  title: string;
  description: string;
  file: string;
  path_name: string;
  full_url: string;
}

export interface ImageRespon {
  data: ImageSimple[];
  meta: Meta;
}
