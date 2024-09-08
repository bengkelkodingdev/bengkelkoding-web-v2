import { AxiosResponse } from "axios";
import {
  createPostRequest,
  createPutRequest,
  createRequest,
  deleteRequest,
} from "@/app/api/request";

export const postInformationAdmin = async (
  idClassroom: number,
  titleInformation: string,
  descInformation: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/admin/classrooms/${idClassroom}/informations`, {
    title: titleInformation,
    description: descInformation,
  });

// /api/v1/admin/classrooms/2/informations/9

export const deleteInformationAdmin = async (
  idClassroom: number,
  idInfo: number,
  access_token: string
): Promise<AxiosResponse> =>
  deleteRequest(
    `/api/v1/admin/classrooms/${idClassroom}/informations/${idInfo}`,
    access_token
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
