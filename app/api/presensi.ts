import axios from "axios";
import Cookies from "js-cookie";
import { Presence } from "@/app/interface/Kelas";
import { detailSesi } from "@/app/interface/DetailSesi";
import { Student } from "@/app/interface/DetailSesi";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

// Detail
export const getDetailQrSessionAdmin = async (
  id: number
): Promise<detailSesi> => {
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

export const getDetailQrSessionLecture = async (
  id: number
): Promise<detailSesi> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/lecture/presences/${id}/detail`,
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

export const getDetailQrSessionAssistant = async (
  id: number
): Promise<detailSesi> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/assistant/presences/${id}/detail`,
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

// Genearate Qr
export const getGenerateQrAdmin = async (id: string): Promise<Presence> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/presences/${id}/generate-qr`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data.presence;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

export const getGenerateQrLecture = async (id: string): Promise<Presence> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/lecture/presences/${id}/generate-qr`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data.presence;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

export const getGenerateQrAssistant = async (id: string): Promise<Presence> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/assistant/presences/${id}/generate-qr`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data.presence;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

// Post Manual
export const postManualPresenceAdmin = async (
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

export const postManualPresenceLecture = async (
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
      `${API_URL}/api/v1/lecture/presences/${id}/attendances/store`,
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

export const postManualPresenceAssistant = async (
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
      `${API_URL}/api/v1/assistant/presences/${id}/attendances/store`,
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

// Update week (Detail Kelas) presence
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

export const updatePresenceAssistant = async (
  id: number,
  updatedPresence: string
): Promise<Presence> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/api/v1/assistant/presences/${id}/update`,
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
