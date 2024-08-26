import { AxiosResponse } from "axios";
import { createRequestNoAuth } from "../request";

// get Detail
export const getDetailLearningPaths = async (
  id: number
): Promise<AxiosResponse> =>
  createRequestNoAuth(`/api/v1/public/paths/${id}/detail`);

// get List Kelas
export const getListKelasLearningPath = async (
  id: number
): Promise<AxiosResponse> =>
  createRequestNoAuth(`/api/v1/public/paths/${id}/classrooms`);
