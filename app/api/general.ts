import { AxiosResponse } from "axios";
import { createRequest } from "./request";

// User Name
export const getName = async (access_token: string): Promise<AxiosResponse> =>
  createRequest(access_token, "/api/v1/auth/name");

// User Identity Code
export const getIdentityCode = async (
  access_token: string
): Promise<AxiosResponse> =>
  createRequest(access_token, "/api/v1/auth/identity-code");

// User Role
export const getRole = async (access_token: string): Promise<AxiosResponse> =>
  createRequest(access_token, "/api/v1/auth/role");

// Profile
// Get Profile
export const getProfile = async (
  access_token: string
): Promise<AxiosResponse> =>
  createRequest(access_token, "/api/v1/auth/profile");
