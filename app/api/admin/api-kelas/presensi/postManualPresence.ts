import axios from "axios";
import Cookies from "js-cookie";
import { Student } from "@/app/interface/DetailSesi";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const postManualPresence = async (
  id: number,
  student: Student
): Promise<any> => {
  // Jika respons dari server tidak berupa `Student`, ubah tipe kembalian di sini
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/admin/presences/${id}/attendances/store`,
      {
        student_id: student.id,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to update presence"
      );
    } else {
      console.error("Error updating presence:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
