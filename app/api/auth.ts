import Axios, { AxiosResponse } from "axios";
import { LoginResponse } from "../component/types/auth";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

// Authentication
// Login
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const apiUrl = `${API_URL}/api/v1/auth/login`;
    const response: AxiosResponse = await Axios.post(apiUrl, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
