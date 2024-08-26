import { AxiosResponse } from "axios";
import { createPostRequest, createRequest } from "@/app/api/request";

// get all absence
export const getAllAbsence = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/admin/presences/absences`);

export const getAllAbsenceLecture = async (): Promise<AxiosResponse> =>
  createRequest(`/api/v1/lecture/presences/absences`);

// post update status in absence
export const postUpdateStatusAbsenceAdmin = async (
  idClassroom: number,
  idAbsence: number,
  status: number,
  approve_note: string
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/admin/presences/${idClassroom}/absences/${idAbsence}`,
    { approve_status: status, approve_note: approve_note }
  );

export const postUpdateStatusAbsenceLecture = async (
  idClassroom: number,
  idAbsence: number,
  status: number,
  approve_note: string
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/lecture/presences/${idClassroom}/absences/${idAbsence}`,
    { approve_status: status, approve_note: approve_note }
  );
