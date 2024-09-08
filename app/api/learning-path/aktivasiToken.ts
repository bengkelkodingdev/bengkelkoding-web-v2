import { AxiosResponse } from "axios";
import { createPostRequest } from "../request";

export const postAktivasiToken = async (
  idClassroom: number,
  token: string
): Promise<AxiosResponse> =>
  createPostRequest(`/api/v1/student/classrooms/enroll`, {
    classroom_id: idClassroom,
    token: token,
  });
