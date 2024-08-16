import axios from "axios";
import Cookies from "js-cookie";
import { ClassRoomRespon, KelasRespon } from "@/app/interface/Kelas";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const getDetailClassroom = async (
  id: string
): Promise<ClassRoomRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v2/admin/classrooms/${id}/detail`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching classroom details:", error);
    throw error;
  }
};
