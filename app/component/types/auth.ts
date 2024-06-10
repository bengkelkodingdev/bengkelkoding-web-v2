export interface Meta {
  status_code: number;
  success: boolean;
  message?: string;
  pagination?: object;
  error?: string;
}

export interface LoginResponse {
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  meta: Meta;
}
