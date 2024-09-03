import { Dosen } from "./Dosen";

export interface Kelas {
  id: number;
  path: number;
  name: string;
  lecture: string;
  period: string;
  description: string;
  time_start: string;
  time_end: string;
  day: string;
  room: string;
  quota: number;
  student_count: number;
  quota_left: number;
  task_percent: string;
  uts_percent: string;
  uas_percent: string;
  start_date: string;
  start_date_formatted: string;
  max_absent: number;
  total_session: number;
  total_attendance_count: number;
  total_absence_count: number;
  total_non_attendance_count: number;
  is_active: boolean;
}

interface Student {
  id: number;
  identity_code: string;
  name: string;
  email: string;
  semester: number;
}

export interface ClassroomData {
  students: Student[];
  classroom: Kelas;
  presences: Presence[];
  courses: Courses[];
  assignments: Assignment[];
  class_informations: ClassInformation[];
}

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
  total_class_session: number;
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
  attendance_count: number;
  absence_count: number;
  presence_date: string;
  presence_date_formatted: string;
  is_enabled: number;
  is_enabled_label: string;
  qr_is_generated: number;
  qr_code: string;
  qr_generated_at: string;
  qr_expired_at: string;
}

export interface pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: {
    next: string | null;
    previous: string | null;
  };
}

interface Lecture {
  identity_code: string;
  name: string;
  role: string;
}

export interface Assignment {
  id: string;
  title: string;
  type: string;
  description: string;
  start_time: string;
  file: string | null;
  deadline: string;
  student: {
    total_submitted: number;
    student_need_to_submit: number;
  };
}

export interface AssignmentResponse {
  data: Assignment[];
  meta: {
    status_code: number;
    success: boolean;
    message: string;
    pagination: pagination;
  };
}

export interface Courses {
  id: number;
  title: string;
  image: string;
  author: string;
  description: string;
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
  data: ClassroomData;
  meta: Meta;
}

export interface ClassInformation {
  id?: number;
  title: string;
  description: string;
}
