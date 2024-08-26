import { AxiosResponse } from "axios";
import { createRequest } from "../request";

// Get Statistics
export const getStudentStatistics = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/student/dashboard/statistics`);

// Get Classrooms
export const getStudentClassrooms = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/student/dashboard/classrooms`);

// Get Classroom Detail
export const getStudentClassroomDetail = async (
  classroom_id: string
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/student/classrooms/${classroom_id}/detail`);

// Get Assignments
export const getStudentAssignments = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/student/dashboard/assignments`);

