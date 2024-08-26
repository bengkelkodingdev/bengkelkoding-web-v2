interface Presence {
  id: number;
  classroom_name: string;
  time_start: string;
  time_end: string;
  day: string;
  presence_date: string;
  presence_date_formatted: string;
  room: string;
  week: number;
}

interface Student {
  id: number;
  identity_code: string;
  name: string;
}

export interface Absence {
  id: number;
  absence_type: string;
  notes: string;
  approve_changed_at: string;
  approve_changed_at_formatted: string;
  approve_note: string | null;
  approve_status: number;
  approve_status_label: string;
  attachment: string;
  presence: Presence;
  student: Student;
}

export interface statusAbsence {
  approve_status: number;
  approve_note: string;
}

// export interface ResponAbsence {
//   absence: Absence[];
//   presence: Presence[];
//   student: Student[];
//   meta: {
//     status_code: number;
//     success: boolean;
//     message: string;
//   };
// }
