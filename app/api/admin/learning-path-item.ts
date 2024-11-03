import { AxiosResponse } from "axios";
import {
  createPostRequest,
  createPutRequest,
  createRequest,
  deleteRequest,
} from "../request";

// List Learning Path Item
export const getAdminListLearningPathItem = async (
  learning_path_id: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/learning-paths/${learning_path_id}/learning-items`
  );

// Course Detail Learning Path Item
export const getAdminDetailLearningPathItem = async (
  learning_path_id: number,
  learning_item_id: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/learning-paths/${learning_path_id}/learning-items/${learning_item_id}`
  );

// Create Learning Path Item
export const postAdminLearningPathItem = async (
  learning_path_id: number,
  course_id: number,
  title: string,
  description: string
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/admin/learning-paths/${learning_path_id}/learning-items`,
    {
      course_id: course_id,
      title: title,
      description: description,
    }
  );

// Update Learning Path Item
export const putAdminLearningPathItem = async (
  learning_path_id: number,
  learning_item_id: number,
  course_id: number,
  title: string,
  description: string
): Promise<AxiosResponse> =>
  createPutRequest(
    `/api/v1/admin/learning-paths/${learning_path_id}/learning-items/${learning_item_id}`,
    {
      course_id: course_id,
      title: title,
      description: description,
    }
  );

// Delete Lerning Path Item
export const deleteAdminLerningPathItem = async (
  learning_path_id: number,
  learning_item_id: number
): Promise<AxiosResponse> =>
  deleteRequest(
    `/api/v1/admin/learning-paths/${learning_path_id}/learning-items/${learning_item_id}`
  );

// Put Sort Learning Path Item
interface SortLearningItems {
  id: number;
  sort_order: number;
}
export const putAdminSortLearningPathItem = async (
  learning_path_id: number,
  learning_items: SortLearningItems[]
): Promise<AxiosResponse> =>
  createPutRequest(
    `/api/v1/admin/learning-paths/${learning_path_id}/learning-items`,
    {
      learning_items,
    }
  );
