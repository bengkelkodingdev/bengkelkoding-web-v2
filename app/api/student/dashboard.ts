import { AxiosResponse } from "axios";
import { createPostRequest, createPutRequest, createRequest } from "../request";

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

// Get Detail Assignment
export const getStudentAssignmentDetail = async (
  classroom_id: string,
  assignment_id: string
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/student/classrooms/${classroom_id}/assignments/${assignment_id}/detail`
  );

// Post Upload Task
export const postUploadTask = async (
  classroom_id: string,
  assignment_id: string,
  answer_file: File,
  comment: string
): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append("answer_file", answer_file);
  formData.append("comment", comment);

  return await createPostRequest(
    `/api/v1/mobile/student/assignment/classroom/${classroom_id}/assignments/${assignment_id}/task`,
    formData
  );
};

// Post Submit Task
export const postSubmitTask = async (
  classroom_id: string,
  assignment_id: string
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/mobile/student/assignment/classroom/${classroom_id}/assignments/${assignment_id}/task/submit`
  );

// Get Presences This Week
export const getPresencesThisWeek = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/student/dashboard/presences`);

// Get All Presences
export const getPresences = async (
  classroom_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/student/classrooms/${classroom_id}/presences`);
