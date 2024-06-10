import Axios, { AxiosResponse } from "axios";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

// Request
// Access Token + URL
export const createRequest = async (
  access_token: string,
  url: string
): Promise<AxiosResponse> => {
  try {
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const response: AxiosResponse = await Axios.get(`${API_URL}${url}`, config);
    return response.data;
  } catch (error) {
    throw new Error(`API Request for ${url} failed`);
  }
};
