import Axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const access_token = Cookies.get("access_token");

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

// Request
// Access Token + URL
export const createRequest = async (url: string): Promise<AxiosResponse> => {
  try {
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const response: AxiosResponse = await Axios.get(`${API_URL}${url}`, config);
    return response.data;
  } catch (error) {
    throw new Error(`API Request for ${url} failed`);
  }
};

// post request
export const createPostRequest = async (
  access_token: string,
  url: string,
  data: any
): Promise<AxiosResponse> => {
  try {
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const response: AxiosResponse = await Axios.post(
      `${API_URL}${url}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(`API POST Request for ${url} failed: ${error.message}`);
  }
};

// No Auth
export const createRequestNoAuth = async (
  url: string
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await Axios.get(`${API_URL}${url}`);
    return response.data;
  } catch (error) {
    throw new Error(`API Request for ${url} failed`);
  }
};
