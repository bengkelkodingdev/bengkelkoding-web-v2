import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SubmissionResponse } from "../interface/Submission";
import { AssignmentResponse } from "@/app/interface/Kelas";
import { AssignmentData } from "@/app/interface/Assigment";
import { createPostRequest } from "./request";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

// admin
export const createAssigment = async (data: FormData, id: string) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/admin/classrooms/${id}/assignments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create assigment"
      );
    } else {
      console.error("Error creating assigment:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAssigmentAdmin = async (
  id: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/classrooms/${id}/assignments`,
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

export const getDetailAssignmentAdmin = async (
  classroomId: string,
  assignmentId: string
): Promise<AssignmentData> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/classrooms/${classroomId}/assignments/${assignmentId}/detail`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to fetch assignment details"
      );
    } else {
      console.error("Error fetching assignment details:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteAssigmentAdmin = async (
  idClassroom: string,
  idAssigment: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.delete(
      `${API_URL}/api/v1/admin/classrooms/${idClassroom}/assignments/${idAssigment}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};

export const updateAssignmentAdmin = async (
  data: FormData,
  classroomId: string,
  assignmentId: string
) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/admin/classrooms/${classroomId}/assignments/${assignmentId}?_method=PUT`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to update assignment"
      );
    } else {
      console.error("Error updating assignment:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

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

export const postGradeAdmin = async (
  idClassroom: string,
  idAssignment: string,
  idTask: number,
  inpuScore: number
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/admin/classrooms/${idClassroom}/assignments/${idAssignment}/tasks/${idTask}/grade`,
    {
      score: inpuScore,
    }
  );

// lecture

export const createAssigmentLecture = async (data: FormData, id: string) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/lecture/classrooms/${id}/assignments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create assigment"
      );
    } else {
      console.error("Error creating assigment:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAssigmentLecture = async (
  id: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/lecture/classrooms/${id}/assignments`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching classroom details:", error);
    throw error;
  }
};

export const getDetailAssignmentLecture = async (
  classroomId: string,
  assignmentId: string
): Promise<AssignmentData> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/lecture/classrooms/${classroomId}/assignments/${assignmentId}/detail`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to fetch assignment details"
      );
    } else {
      console.error("Error fetching assignment details:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteAssigmentLecture = async (
  idClassroom: string,
  idAssigment: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.delete(
      `${API_URL}/api/v1/lecture/classrooms/${idClassroom}/assignments/${idAssigment}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};

export const updateAssignmentLecture = async (
  data: FormData,
  classroomId: string,
  assignmentId: string
) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/lecture/classrooms/${classroomId}/assignments/${assignmentId}?_method=PUT`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to update assignment"
      );
    } else {
      console.error("Error updating assignment:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getSubmissionLecture = async (
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
      `${API_URL}/api/v1/lecture/classrooms/${idClassroom}/assignments/${idAssignment}/tasks?per_page=${perPage}&page=${page}`,
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

export const postGradeLecture = async (
  idClassroom: string,
  idAssignment: string,
  idTask: number,
  inpuScore: number
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/lecture/classrooms/${idClassroom}/assignments/${idAssignment}/tasks/${idTask}/grade`,
    {
      score: inpuScore,
    }
  );

// assistant

export const createAssigmentAssistant = async (data: FormData, id: string) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/assistant/classrooms/${id}/assignments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create assigment"
      );
    } else {
      console.error("Error creating assigment:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAssigmentAssistant = async (
  id: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/assistant/classrooms/${id}/assignments`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching classroom details:", error);
    throw error;
  }
};

export const getDetailAssignmentAssistant = async (
  classroomId: string,
  assignmentId: string
): Promise<AssignmentData> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/assistant/classrooms/${classroomId}/assignments/${assignmentId}/detail`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to fetch assignment details"
      );
    } else {
      console.error("Error fetching assignment details:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteAssigmentAssistant = async (
  idClassroom: string,
  idAssigment: string
): Promise<AssignmentResponse> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.delete(
      `${API_URL}/api/v1/assistant/classrooms/${idClassroom}/assignments/${idAssigment}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};

export const updateAssignmentAssistant = async (
  data: FormData,
  classroomId: string,
  assignmentId: string
) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/assistant/classrooms/${classroomId}/assignments/${assignmentId}?_method=PUT`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to update assignment"
      );
    } else {
      console.error("Error updating assignment:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getSubmissionAssistant = async (
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
      `${API_URL}/api/v1/assistant/classrooms/${idClassroom}/assignments/${idAssignment}/tasks?per_page=${perPage}&page=${page}`,
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

export const postGradeAssistant = async (
  idClassroom: string,
  idAssignment: string,
  idTask: number,
  inpuScore: number
): Promise<AxiosResponse> =>
  createPostRequest(
    `/api/v1/assistant/classrooms/${idClassroom}/assignments/${idAssignment}/tasks/${idTask}/grade`,
    {
      score: inpuScore,
    }
  );
