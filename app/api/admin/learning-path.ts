import { AxiosResponse } from "axios";
import {
  createPostRequest,
  createPutRequest,
  createRequest,
  deleteRequest,
} from "../request";

// List Learning Path
export const getAdminListLearningPath = async (
  search: string,
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/learning-paths?search=${search}&page=${page}&limit=${limit}`
  );

// Course Detail Learning Path
export const getAdminDetailLearningPath = async (
  learning_path_id: number
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/learning-paths/${learning_path_id}`);

// Create Learning Path
export const postAdminLearningPath = async (
  name: string,
  description: string,
  image: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/admin/learning-paths`, {
    name: name,
    description: description,
    image: image,
  });

// Update Learning Path
export const putAdminLearningPath = async (
  learning_path_id: number,
  name: string,
  description: string,
  image: string
): Promise<AxiosResponse> =>
  createPutRequest(`/api/v1/admin/learning-paths/${learning_path_id}`, {
    name: name,
    description: description,
    image: image,
  });

// Delete Lerning Path
export const deleteAdminLerningPath = async (
  learning_path_id: number
): Promise<AxiosResponse> =>
  deleteRequest(`/api/v1/admin/learning-paths/${learning_path_id}`);
