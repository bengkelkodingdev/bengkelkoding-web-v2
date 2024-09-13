import { AxiosResponse } from "axios";
import { createPostRequest, createRequest } from "@/app/api/request";

// Get data User

// - Admin
export const getAllAdminData = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/superadmin/admins`);

// - Lecture
export const getAllLectureData = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/lectures`);

// - Assistant
export const getAllAssistantData = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/assistants`);

// - Student
export const getAllStudentData = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/students`);
