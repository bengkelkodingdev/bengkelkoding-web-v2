import { Dosen } from "./Dosen";

export interface Kelas {
  id: number;
  lecture: Dosen;
  name: string;
  description: string;
  time_start: string;
  time_end: string;
  day: string;
  room: string;
  quota: number;
  start_date: string;
  start_date_formatted: string;
  max_absent: number;
}

export interface ClassroomData {
  classroom: {
    id: number;
    lecture: {
      identity_code: string;
      name: string;
      role: string;
    };
    name: string;
    description: string;
    time_start: string;
    time_end: string;
    day: string;
    room: string;
    quota: number;
    start_date: string;
    start_date_formatted: string;
    max_absent: number;
  };
  presences: Presence[];
  assignments: Assignment[];
}

export interface Presence {
  id: number;
  lecture: Lecture;
  student_count: number;
  time_start: string;
  time_end: string;
  day: string;
  room: string;
  week: number;
  presence_date: string;
  presence_date_formatted: string;
  is_enabled: number;
  is_enabled_label: string;
  qr_is_generated: number;
  qr_code: string;
  qr_generated_at: string;
  qr_expired_at: string;
}

interface Lecture {
  identity_code: string;
  name: string;
  role: string;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  start_time: string;
  deadline: string;
}

export interface Meta {
  status_code: number;
  success: boolean;
  message: string;
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: Links;
}

export interface Links {
  next: string | null;
  previous: string | null;
}

export interface KelasRespon {
  data: Kelas[];
  meta: Meta;
}

export interface ClassRoomRespon {
  data: ClassroomData[];
  meta: Meta;
}
