import { AxiosResponse } from "axios";
import {
  createPostRequest,
  createPutRequest,
  createRequest,
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
