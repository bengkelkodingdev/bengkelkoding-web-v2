export interface AdminData {
  id: number;
  identity_code: string;
  name: string;
  email: string;
  is_active: number;
}
export interface DosenData {
  id: number;
  npp: string;
  name: string;
  email: string;
  is_active: number;
  password: string;
}

export interface AssistantData {
  id: number;
  nim: string;
  name: string;
  email: string;
  is_active: number;
  password: string;
}

export interface StudentData {
  id: number;
  nim: string;
  name: string;
  email: string;
  is_active: number;
  password: string;
}

export interface UpAdminData {
  id: number;
  identity_code: string;
  name: string;
  email: string;
  is_active: boolean;
  password: string;
}

export interface UpDosenData {
  id: number;
  identity_code: string;
  name: string;
  email: string;
  is_active: boolean;
  password: string;
}

export interface UpAsistenData {
  id: number;
  identity_code: string;
  name: string;
  email: string;
  is_active: boolean;
  password: string;
}

export interface UpStudentData {
  id: number;
  identity_code: string;
  name: string;
  email: string;
  is_active: boolean;
  password: string;
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

export interface AdminResponse {
  data: AdminData[];
  meta: Meta;
}

export interface DosenRespon {
  data: DosenData[];
  meta: Meta;
}

export interface AssistantRespon {
  data: AssistantData[];
  meta: Meta;
}

export interface StudentRespon {
  data: StudentData[];
  meta: Meta;
}
