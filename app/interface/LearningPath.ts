export interface Course {
  id: number;
  title: string;
  image: string;
  background_image: string;
  author: string;
  brief_description: string;
  description: string;
  level: string;
  rating: number;
  student_count: number;
  module_count: number;
}

export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  course: Course;
}

// Define the path interface
export interface Path {
  id: number;
  name: string;
  description: string;
}

// Define the data interface for the response
export interface DataPath {
  path: Path;
  roadmap: RoadmapStep[];
}

// Define the meta interface for the response
export interface Meta {
  status_code: number;
  success: boolean;
  message: string;
}

// kelas aktif
export interface ListKelasPath {
  id: number;
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
}

export interface ListKelasPathResponse {
  data: ListKelasPath[];
}

// Define the main response interface
export interface PathResponse {
  data: DataPath;
  meta: Meta;
}

export interface MenuPath {
  id: number;
  name: string;
}

export interface ResponMenuPath {
  data: MenuPath;
}
