import { AxiosResponse } from "axios";
import { createRequest } from "../request";

// List Courses
export const getAssistantListCourses = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/assistant/courses`);

// Course List Articles
export const getAssistantListArticles = async (
  course_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/assistant/courses/${course_id}/articles`);

// Course Detail Articles
export const getAssistantDetailArticles = async (
  course_id: number,
  article_id: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/assistant/courses/${course_id}/articles/${article_id}`
  );
