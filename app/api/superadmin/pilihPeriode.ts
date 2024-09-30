import { AxiosResponse } from "axios";
import { createPostRequest, createRequest } from "../request";

// Post Set Active Period
export const postSetActivePeriod = async (
  year: string,
  semester: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/superadmin/periods`, {
    year: year,
    semester: semester,
  });

// Get List Periods
export const getListPeriods = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/superadmin/periods`);

// Get Activate Period
export const getActivatePeriod = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/superadmin/periods/active`);
