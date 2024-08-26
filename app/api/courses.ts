import { AxiosResponse } from "axios";
import { createRequestNoAuth } from "./request";

// List Courses
export const getListCourses = async (search: string): Promise<AxiosResponse> =>
  createRequestNoAuth(`/api/v1/public/courses?search=${search}`);

// Detail Courses
export const getDetailCourse = async (id: number): Promise<AxiosResponse> =>
  createRequestNoAuth(`/api/v1/public/courses/${id}/detail`);
