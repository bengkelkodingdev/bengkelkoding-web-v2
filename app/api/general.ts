import { AxiosResponse } from "axios";
import { createRequest } from "./request";

// User Name
export const getName = async (): Promise<AxiosResponse> =>
  createRequest("/api/v1/auth/name");

// User Identity Code
export const getIdentityCode = async (): Promise<AxiosResponse> =>
  createRequest("/api/v1/auth/identity-code");

// User Role
export const getRole = async (): Promise<AxiosResponse> =>
  createRequest("/api/v1/auth/role");

// Profile
// Get Profile
export const getProfile = async (): Promise<AxiosResponse> =>
  createRequest("/api/v1/auth/profile");
