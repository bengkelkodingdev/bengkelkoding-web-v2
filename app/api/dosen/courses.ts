import { AxiosResponse } from "axios";
import { createRequest } from "../request";

// List Courses
export const getLectureListCourses = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/lecture/courses`);

// Course List Articles
export const getLectureListArticles = async (
  course_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/lecture/courses/${course_id}/articles`);

// Course Detail Articles
export const getLectureDetailArticles = async (
  course_id: number,
  article_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/lecture/courses/${course_id}/articles/${article_id}`);
