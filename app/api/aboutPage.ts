import { AxiosResponse } from "axios";
import { createRequestNoAuth } from "./request";

// Statistics
export const getAboutStatistics = async (): Promise<AxiosResponse> =>
  createRequestNoAuth("/api/v1/public/about");
