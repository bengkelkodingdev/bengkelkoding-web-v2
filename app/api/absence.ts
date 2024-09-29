import { AxiosResponse } from "axios";
import { createPostRequest, createRequest } from "@/app/api/request";

// get all absence
export const getAllAbsence = async (
  search: string,
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/admin/presences/absences?search=${search}&page=${page}&limit=${limit}`
  );

export const getAllAbsenceLecture = async (
  search: string,
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/lecture/presences/absences?search=${search}&page=${page}&limit=${limit}`
  );

export const getAllAbsenceAssistant = async (
  search: string,
  page: number,
  limit: number
): Promise<AxiosResponse> =>
  createRequest(
    `/api/v1/assistant/presences/absences?search=${search}&page=${page}&limit=${limit}`
  );

// post update status in absence termasuk didalam sesi pertemuan ada izin
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

export const postUpdateStatusAbsenceAssistant = async (
  idClassroom: number,
  idAbsence: number,
  status: number,
  approve_note: string
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/assistant/presences/${idClassroom}/absences/${idAbsence}`,
    { approve_status: status, approve_note: approve_note }
  );
