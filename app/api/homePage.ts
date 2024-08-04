import { AxiosResponse } from "axios";
import { createRequestNoAuth } from "./request";

// Statistics
export const getStatistics = async (): Promise<AxiosResponse> =>
  createRequestNoAuth("/api/v1/public/homepage/dashboard");

// Testimonies
export const getTestimonies = async (): Promise<AxiosResponse> =>
  createRequestNoAuth("/api/v1/public/homepage/testimonies");

// FAQs
export const getFaqs = async (): Promise<AxiosResponse> =>
  createRequestNoAuth("/api/v1/public/homepage/faqs");

// List All Path
export const getHomeListPath = async (): Promise<AxiosResponse> =>
  createRequestNoAuth("/api/v1/public/homepage/paths");

// Path Detail
export const getHomePathDetail = async (
  pathId: number
): Promise<AxiosResponse> =>
  createRequestNoAuth(`/api/v1/public/homepage/paths/${pathId}/course-detail`);
