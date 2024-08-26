import { AxiosResponse } from "axios";
import { createRequest } from "../request";

// (ADMIN) get AllClassroom

export const getAllClassroomAdmin1 = async (
  access_token: string
): Promise<AxiosResponse> =>
  createRequest(access_token, `api/v1/admin/classrooms`);
