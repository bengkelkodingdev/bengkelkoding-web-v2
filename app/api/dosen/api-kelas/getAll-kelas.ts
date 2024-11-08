import axios, { AxiosResponse } from "axios";
import { KelasRespon } from "@/app/interface/Kelas";
import { createRequest } from "../../request";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

import Cookies from "js-cookie";

export const getAllClassroom = async (): Promise<KelasRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${API_URL}/api/v1/admin/classrooms`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    throw error;
  }
};
