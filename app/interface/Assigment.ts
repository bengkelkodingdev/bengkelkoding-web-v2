export interface AssignmentData {
  title: string;
  type: string;
  description: string;
  file: string | null;
  start_time: string;
  deadline: string;
  created_at: string;
  updated_at: string;
}

export interface MetaData {
  status_code: number;
  success: boolean;
  message: string;
}

export interface AssignmentResponse {
  data: AssignmentData;
  meta: MetaData;
}
