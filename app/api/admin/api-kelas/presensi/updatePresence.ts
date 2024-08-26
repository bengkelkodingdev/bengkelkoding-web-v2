import axios from "axios";
import Cookies from "js-cookie";
import { Presence } from "@/app/interface/Kelas";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const updatePresenceAdmin = async (
  id: number,
  updatedPresence: string
): Promise<Presence> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/api/v1/admin/presences/${id}/update`,
      {
        presence_date: updatedPresence,
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
    console.error("Error updating presence:", error);
    throw error;
  }
};

export const updatePresenceLecture = async (
  id: number,
  updatedPresence: string
): Promise<Presence> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/api/v1/lecture/presences/${id}/update`,
      {
        presence_date: updatedPresence,
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
    console.error("Error updating presence:", error);
    throw error;
  }
};