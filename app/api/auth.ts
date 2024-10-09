import Axios, { AxiosResponse } from "axios";
import { LoginResponse } from "../component/types/auth";
import Cookies from "js-cookie";
import { createPutRequest } from "./request";

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

// Logout
export const logout = async (): Promise<void> => {
  const access_token = Cookies.get("access_token");

  try {
    const apiUrl = `${API_URL}/api/v1/auth/logout`;
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    await Axios.post(apiUrl, null, config);
    Cookies.remove("access_token");
    Cookies.remove("user_role");
  } catch (error) {
    throw new Error("Logout failed");
  }
};

// Change Profile /api/v1/auth/profile
export const putProfile = async (
  old_password: string,
  new_password: string,
  retype_password: string
): Promise<AxiosResponse> =>
  createPutRequest("/api/v1/auth/profile", {
    old_password: old_password,
    new_password: new_password,
    retype_password: retype_password,
  });
