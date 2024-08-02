import axios, { AxiosResponse } from "axios";
import { KelasRespon } from "@/app/interface/Kelas";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

import { PathResponse } from "@/app/interface/LearningPath";

export const getDetaiLearningPath = async (
  id: number
): Promise<PathResponse> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/public/paths/${id}/detail`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching path:", error);
    throw error;
  }
};
