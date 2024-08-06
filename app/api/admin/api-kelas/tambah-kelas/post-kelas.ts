import axios from "axios";
import Cookies from "js-cookie";
import { ClassFormData } from "@/app/interface/Kelas";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const createClassroom = async (data: ClassFormData) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/admin/classrooms/store`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create classroom"
      );
    } else {
      console.error("Error creating classroom:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
