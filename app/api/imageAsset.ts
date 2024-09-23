import axios, { AxiosResponse } from "axios";
import { createRequest } from "@/app/api/request";
import Cookies from "js-cookie";
import { ImageSimple } from "../interface/Image";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const getAllImage = async (
  search: string,
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/image-assets?search=${search}&page=${page}&limit=${limit}`
  );

export const findImageData = async (idImg: string): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/image-assets/${idImg}`);

// Add image post

export const addImage = async (data: ImageSimple) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/admin/image-assets`,
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
      throw new Error(error.response.data.message || "Failed to upload image");
    } else {
      console.error("Error upload image:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
