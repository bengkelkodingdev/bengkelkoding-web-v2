interface Submission {
  id: number;
  name: string;
  status: string;
  status_label: string;
  file_url: string | null;
  grade: number | null;
  comment: string | null;
  submit_date: string | null;
}

interface Meta {
  status_code: number;
  success: boolean;
  message: string;
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: {
      next: string | null;
      previous: string | null;
    };
  };
}

export interface SubmissionResponse {
  data: Submission[];
  meta: Meta;
}
