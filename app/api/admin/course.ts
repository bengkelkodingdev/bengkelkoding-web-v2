import { AxiosResponse } from "axios";
import { createRequest } from "../request";

// List Courses
export const getAdminListCourses = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/courses`);

// Course List Articles
export const getAdminListArticles = async (
  course_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/courses/${course_id}/articles`);

// Course Detail Articles
export const getAdminDetailArticles = async (
  course_id: number,
  article_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/courses/${course_id}/articles/${article_id}`);
