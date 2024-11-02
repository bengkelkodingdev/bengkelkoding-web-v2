import { AxiosResponse } from "axios";
import { createRequest } from "../request";

// Get Admin Dashboard
export const getAdminDashboard = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/dashboards`);
