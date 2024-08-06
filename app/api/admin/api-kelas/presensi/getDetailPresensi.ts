import axios from "axios";
import Cookies from "js-cookie";

import { detailSesi } from "@/app/interface/DetailSesi";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const getDetailQrSession = async (id: number): Promise<detailSesi> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/presences/${id}/detail`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};
