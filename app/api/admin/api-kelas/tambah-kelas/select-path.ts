import axios, { AxiosResponse } from "axios";
import {
  SelectDosenRespon,
  SelectPathRespon,
} from "@/app/interface/SelectData";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

import Cookies from "js-cookie";

export const getSelectPaths = async (): Promise<SelectPathRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${API_URL}/api/v1/admin/dropdown/paths`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching dosen:", error);
    throw error;
  }
};
