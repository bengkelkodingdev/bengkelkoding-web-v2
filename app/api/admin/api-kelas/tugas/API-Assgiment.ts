import axios from "axios";
import Cookies from "js-cookie";
import { AssignmentResponse } from "@/app/interface/Kelas";
import { AssignmentData } from "@/app/interface/Assigment";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const createAssigment = async (data: FormData, id: string) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/admin/classrooms/${id}/assignments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create assigment"
      );
    } else {
      console.error("Error creating assigment:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAssigmentAdmin = async (
  id: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/classrooms/${id}/assignments`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Assigment :", error);
    throw error;
  }
};

export const deleteAssigmentAdmin = async (
  idClassroom: string,
  idAssigment: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.delete(
      `${API_URL}/api/v1/admin/classrooms/${idClassroom}/assignments/${idAssigment}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};

// --- hapus nanti
export const getAssigmentLecture = async (
  id: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/lecture/classrooms/${id}/assignments`,
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
