import axios from "axios";
import { MenuPath } from "@/app/interface/LearningPath";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const getMenuLearningPath = async (): Promise<MenuPath[]> => {
  try {
    const response = await axios.get<{ data: MenuPath[] }>(
      `${API_URL}/api/v1/public/paths`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching path:", error);
    throw error;
  }
};
