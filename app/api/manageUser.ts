import axios, { AxiosResponse } from "axios";
import { createPostRequest, createRequest } from "@/app/api/request";
import Cookies from "js-cookie";
import { DosenData, UpDosenData } from "../interface/UserManagement";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

// Get + Find data User

// - Admin
export const getAllAdminData = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/superadmin/admins`);

export const findAdminData = async (id: string): Promise<AxiosResponse> =>
  createRequest(`/api/v1/superadmin/admins/${id}`);

// - Lecture
export const getAllLectureData = async (
  search: string,
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/lectures?search=${search}&page=${page}&limit=${limit}`
  );

export const findLectureData = async (id: string): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/lectures/${id}`);

// - Assistant
export const getAllAssistantData = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/assistants`);

export const findAssistantData = async (id: string): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/assistants/${id}`);

// - Student
export const getAllStudentData = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/students`);

export const findStudentData = async (id: string): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/students/${id}`);

// POST

export const createLecture = async (data: UpDosenData) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/admin/lectures`,
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
        error.response.data.message || "Failed to create lecture"
      );
    } else {
      console.error("Error creating lecture:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

// Update

export const updateLecture = async (data: UpDosenData, idLecture: number) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/api/v1/admin/lectures/${idLecture}`,
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
        error.response.data.message || "Failed to create lecture"
      );
    } else {
      console.error("Error creating lecture:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

// Delete
export const deleteLecture = async (idLecture: number) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.delete(
      `${API_URL}/api/v1/admin/lectures/${idLecture}`,
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
        error.response.data.message || "Failed to delete classroom"
      );
    } else {
      console.error("Error deleting classroom:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
