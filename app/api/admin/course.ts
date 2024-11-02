import { AxiosResponse } from "axios";
import {
  createPatchRequest,
  createPostRequest,
  createPutRequest,
  createRequest,
  deleteRequest,
} from "../request";

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

// Update Courses
export const putAdminCourses = async (
  course_id: string,
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
  createPutRequest(`/api/v1/admin/courses/${course_id}`, {
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

// Delete Course
export const deleteAdminCourse = async (
  course_id: number
): Promise<AxiosResponse> =>
  deleteRequest(`/api/v1/admin/courses/${course_id}`);

// Detail Courses
export const getAdminCourse = async (
  course_id: string
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/courses/${course_id}`);

// List Section Courses
export const getAdminSectionCourse = async (
  course_id: string
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/courses/${course_id}/sections`);

// Create Section Course
export const postAdminSectionCourses = async (
  course_id: string,
  name: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/admin/courses/${course_id}/sections`, {
    name: name,
  });

// Update Section Course
export const patchAdminSectionCourses = async (
  course_id: string,
  section_id: string,
  name: string
): Promise<AxiosResponse> =>
  createPatchRequest(
    `/api/v1/admin/courses/${course_id}/sections/${section_id}`,
    {
      name: name,
    }
  );

// Delete Section Course
export const deleteAdminSectionCourses = async (
  course_id: string,
  section_id: string
): Promise<AxiosResponse> =>
  deleteRequest(`/api/v1/admin/courses/${course_id}/sections/${section_id}`);

// Update Sort Section Course
interface SortSection {
  id: number;
  sort_order: number;
}
export const putAdminSortSectionCourses = async (
  course_id: string,
  section_id: string,
  sort_section: SortSection
): Promise<AxiosResponse> =>
  createPutRequest(
    `/api/v1/admin/courses/${course_id}/sections/${section_id}`,
    {
      section: sort_section,
    }
  );

// List Article Courses
export const getAdminArticleCourse = async (
  course_id: string,
  section_id: string
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/courses/${course_id}/sections/${section_id}/articles`
  );

// Detail Article Courses
export const getAdminDetailArticleCourse = async (
  course_id: string,
  section_id: string,
  article_id: string
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/courses/${course_id}/sections/${section_id}/articles/${article_id}`
  );

// Create Article Course
export const postAdminArticleCourses = async (
  course_id: string,
  section_id: string,
  title: string,
  content: string
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/admin/courses/${course_id}/sections/${section_id}/articles`,
    {
      title: title,
      content: content,
    }
  );

// Update Article Course
export const putAdminArticleCourses = async (
  course_id: string,
  section_id: string,
  article_id: string,
  title: string,
  content: string
): Promise<AxiosResponse> =>
  createPutRequest(
    `/api/v1/admin/courses/${course_id}/sections/${section_id}/articles/${article_id}`,
    {
      title: title,
      content: content,
    }
  );

// Delete Article Course
export const deleteAdminArticleCourses = async (
  course_id: string,
  section_id: string,
  article_id: string
): Promise<AxiosResponse> =>
  deleteRequest(
    `/api/v1/admin/courses/${course_id}/sections/${section_id}/articles/${article_id}`
  );

// Update Sort Article
interface SortSection {
  id: number;
  sort_order: number;
}

export const putAdminSortArticleCourses = async (
  course_id: string,
  section_id: string,
  articles: SortSection[]
): Promise<AxiosResponse> =>
  createPutRequest(
    `/api/v1/admin/courses/${course_id}/sections/${section_id}/articles`,
    { articles }
  );
