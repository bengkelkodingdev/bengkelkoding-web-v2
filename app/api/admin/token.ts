import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { createPostRequest, createRequest } from "../request";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

// format date
const formatDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Get List Tokens
export const getListTokens = async (
  used: string,
  expired: string,
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/tokens?used=${used}&expired=${expired}&page=${page}&limit=${limit}`
  );

// Get Export Tokens
export const getExportTokens = async (used: string, expired: string) => {
  const access_token = Cookies.get("access_token");
  if (!access_token) throw new Error("Access token not found");

  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
    responseType: "blob",
  };

  const url = `/api/v1/admin/tokens/export?used=${used}&expired=${expired}`;
  const response = await Axios.get(`${API_URL}${url}`, config);

  return response.data;
};

// Post Generate Tokens
export const postGenerateToken = async (
  total_token: number,
  start_date: string,
  end_date: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/admin/tokens/generate`, {
    token_count: total_token,
    started: formatDate(start_date),
    expired: formatDate(end_date),
  });
