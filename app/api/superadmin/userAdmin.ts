import { AxiosResponse } from "axios";
import {
  createPostRequest,
  createPutRequest,
  createRequest,
  deleteRequest,
} from "../request";

// Get User Admin
export const getUserAdmin = async (
  search: string,
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/superadmin/admins?search=${search}&page=${page}&limit=${limit}`
  );

//   Get Detal User Admin
export const getDetailUserAdmin = async (
  user_id: string
): Promise<AxiosResponse> =>
  createRequest(`/api/v1/superadmin/admins/${user_id}`);

// Post User Admin
export const postUserAdmin = async (
  identity_code: string,
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/superadmin/admins`, {
    identity_code: identity_code,
    name: name,
    email: email,
    password: password,
  });

// Update User Admin
export const putUserAdmin = async (
  user_id: string,
  identity_code: string,
  name: string,
  email: string,
  password: string,
  is_active: boolean
): Promise<AxiosResponse> =>
  createPutRequest(`/api/v1/superadmin/admins/${user_id}`, {
    identity_code: identity_code,
    name: name,
    email: email,
    password: password,
    is_active: is_active,
  });

// Delete User Admin
export const deleteUserAdmin = async (
  user_id: number
): Promise<AxiosResponse> =>
  deleteRequest(`/api/v1/superadmin/admins/${user_id}`);
