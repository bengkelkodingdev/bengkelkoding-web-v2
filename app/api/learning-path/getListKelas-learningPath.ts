import axios, { AxiosResponse } from "axios";
import {
  ListKelasPath,
  ListKelasPathResponse,
} from "@/app/interface/LearningPath";
const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const getListKelasLearningPath = async (
  id: number
): Promise<ListKelasPathResponse> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/public/paths/${id}/classrooms`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching kelas:", error);
    throw error;
  }
};
