import { AxiosResponse } from "axios";
import {
  createPostRequest,
  createPutRequest,
  createRequest,
  deleteRequest,
} from "@/app/api/request";

// Admin

export const postInformationAdmin = async (
  idClassroom: number,
  titleInformation: string,
  descInformation: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/admin/classrooms/${idClassroom}/informations`, {
    title: titleInformation,
    description: descInformation,
  });

export const deleteInformationAdmin = async (
  idClassroom: number,
  idInfo: number
): Promise<AxiosResponse> =>
  deleteRequest(
    `/api/v1/admin/classrooms/${idClassroom}/informations/${idInfo}`
  );

export const updateInformationAdmin = async (
  idClassroom: number,
  idInfo: number,
  titleInformation: string,
  descInformation: string,
  access_token: string
): Promise<AxiosResponse> =>
  createPutRequest(
    `/api/v1/admin/classrooms/${idClassroom}/informations/${idInfo}`,
    {
      title: titleInformation,
      description: descInformation,
    },
    access_token
  );

// Lecture

export const postInformationLecture = async (
  idClassroom: number,
  titleInformation: string,
  descInformation: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/lecture/classrooms/${idClassroom}/informations`, {
    title: titleInformation,
    description: descInformation,
  });

export const deleteInformationLecture = async (
  idClassroom: number,
  idInfo: number
): Promise<AxiosResponse> =>
  deleteRequest(
    `/api/v1/lecture/classrooms/${idClassroom}/informations/${idInfo}`
  );

export const updateInformationLecture = async (
  idClassroom: number,
  idInfo: number,
  titleInformation: string,
  descInformation: string,
  access_token: string
): Promise<AxiosResponse> =>
  createPutRequest(
    `/api/v1/lecture/classrooms/${idClassroom}/informations/${idInfo}`,
    {
      title: titleInformation,
      description: descInformation,
    },
    access_token
  );

// Assistant

export const postInformationAssistant = async (
  idClassroom: number,
  titleInformation: string,
  descInformation: string
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/assistant/classrooms/${idClassroom}/informations`,
    {
      title: titleInformation,
      description: descInformation,
    }
  );

export const deleteInformationAssistant = async (
  idClassroom: number,
  idInfo: number
): Promise<AxiosResponse> =>
  deleteRequest(
    `/api/v1/assistant/classrooms/${idClassroom}/informations/${idInfo}`
  );

export const updateInformationAssistant = async (
  idClassroom: number,
  idInfo: number,
  titleInformation: string,
  descInformation: string,
  access_token: string
): Promise<AxiosResponse> =>
  createPutRequest(
    `/api/v1/assistant/classrooms/${idClassroom}/informations/${idInfo}`,
    {
      title: titleInformation,
      description: descInformation,
    },
    access_token
  );
