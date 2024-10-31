import { AxiosResponse } from "axios";
import { createPostRequest, createRequest, deleteRequest } from "../request";

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

// Create Courses
export const postAdminCourses = async (
  image: string,
  background_image: string,
  title: string,
  author: string,
  url_trailer: string,
  description: string,
  brief_description: string,
  tools: string,
  teaching_method: string,
  level: string,
  category: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/admin/courses`, {
    image: image,
    background_image: background_image,
    title: title,
    author: author,
    url_trailer: url_trailer,
    description: description,
    brief_description: brief_description,
    tools: tools,
    teaching_method: teaching_method,
    level: level,
    category: category,
  });

// Delte Course
export const deleteAdminCourse = async (
  course_id: number
): Promise<AxiosResponse> =>
  deleteRequest(`/api/v1/admin/courses/${course_id}`);
