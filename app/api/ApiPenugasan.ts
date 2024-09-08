import axios from "axios";
import Cookies from "js-cookie";
import { SubmissionResponse } from "../interface/Submission";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

export const getSubmissionAdmin = async (
  idClassroom: string,
  idAssignment: string,
  page: number = 1,
  perPage: number = 3
): Promise<SubmissionResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/classrooms/${idClassroom}/assignments/${idAssignment}/tasks?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Assigment :", error);
    throw error;
  }
};
