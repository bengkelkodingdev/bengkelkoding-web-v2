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
    task_percent: string;
    uts_percent: string;
    uas_percent: string;
  };
  presences: Presence[];
  assignments: Assignment[];
}

// types.ts

export interface ClassFormData {
  name: string;
  lecture_id: number;
  path_id: number;
  period_id: number;
  description: string;
  quota: number;
  day: number;
  time_start: string;
  time_end: string;
  room: string;
  task_percent: number;
  uts_percent: number;
  uas_percent: number;
  start_date: string;
  max_absent: number;
  jml_pertemuan: number;
}

export interface Presence {
  id: number;
  lecture: {
    identity_code: string;
    name: string;
    role: string;
  };
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
