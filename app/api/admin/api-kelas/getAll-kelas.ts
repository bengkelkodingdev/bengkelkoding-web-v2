import axios from "axios";
import { KelasRespon } from "@/app/interface/Kelas";
import Cookies from "js-cookie";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const getAllClassroom = async (page: number): Promise<KelasRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${API_URL}/api/v2/admin/classrooms`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        page: page, // Include the page parameter in the request
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    throw error;
  }
};
