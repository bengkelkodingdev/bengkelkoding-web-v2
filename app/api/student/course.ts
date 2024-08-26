import { AxiosResponse } from "axios";
import { createRequest } from "../request";

// Course List Articles
export const getListArticles = async (
  course_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/student/course/${course_id}/articles`);

// Course Detail Articles
export const getDetailArticles = async (
  course_id: number,
  article_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/student/course/${course_id}/articles/${article_id}`);
