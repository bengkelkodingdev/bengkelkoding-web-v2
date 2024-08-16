interface Lecture {
  identity_code: string;
  name: string;
  role: string;
}

interface Presence {
  id: number;
  lecture: Lecture;
  classroom_name: string;
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
  qr_code: string | null;
  qr_generated_at: string | null;
  qr_expired_at: string;
}

export interface Student {
  id: number;
  identity_code: string;
  name: string;
  email: string;
  is_present: boolean;
  is_present_label: string;
}

interface AbsenceStudent {
  id: number;
  identity_code: string;
  name: string;
  email: string;
  absence_type: string;
  notes: string;
  attachment: string | null;
  approve_status: number;
  approve_status_label: string;
}

export interface detailSesi {
  presence: Presence;
  students: Student[];
  absence_students: AbsenceStudent[];
  meta: {
    status_code: number;
    success: boolean;
    message: string;
    pagination: Record<string, unknown>;
  };
}
