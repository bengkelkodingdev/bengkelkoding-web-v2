import axios, { AxiosResponse } from "axios";
import { EditFormClassroom, KelasRespon } from "@/app/interface/Kelas";
import { ClassFormData } from "@/app/interface/Kelas";
import {
  SelectDosenRespon,
  SelectPathRespon,
  SelectPeriodRespon,
} from "@/app/interface/SelectData";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL_BENGKEL_KODING || "";

import Cookies from "js-cookie";

// Get List Kelas
export const getAllClassroomAdmin = async (
  searchTerm = "",
  page = 1,
  per_page = 10
): Promise<KelasRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${API_URL}/api/v1/admin/classrooms`, {
      params: {
        search: searchTerm,
        page,
        per_page,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    throw error;
  }
};

export const getAllClassroomLecture = async (
  searchTerm = "",
  page = 1,
  per_page = 10
): Promise<KelasRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${API_URL}/api/v1/lecture/classrooms`, {
      params: {
        search: searchTerm,
        page,
        per_page,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    throw error;
  }
};

export const getAllClassroomAssistent = async (
  searchTerm = "",
  page = 1,
  per_page = 10
): Promise<KelasRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${API_URL}/api/v1/assistant/classrooms`, {
      params: {
        search: searchTerm,
        page,
        per_page,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    throw error;
  }
};

// ------

// Post Kelas

export const createClassroom = async (data: ClassFormData) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/admin/classrooms/store`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create classroom"
      );
    } else {
      console.error("Error creating classroom:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateClassroom = async (
  data: EditFormClassroom,
  idClassroom: number
) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/api/v1/admin/classrooms/${idClassroom}/update`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create classroom"
      );
    } else {
      console.error("Error creating classroom:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

// ------

// Select Lecture

export const getSelectLecture = async (): Promise<SelectDosenRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/dropdown/lectures`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching dosen:", error);
    throw error;
  }
};

//  ------

// Select Path

export const getSelectPaths = async (): Promise<SelectPathRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${API_URL}/api/v1/admin/dropdown/paths`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching dosen:", error);
    throw error;
  }
};
//  ----

// Select Period

export const getSelectPeriods = async (): Promise<SelectPeriodRespon> => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/dropdown/periods`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching dosen:", error);
    throw error;
  }
};

// -------

// SUPERADMIN DESTROY CLASSROOM

export const deleteClassroom = async (idClass: number) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.delete(
      `${API_URL}/api/v1/superadmin/classrooms/${idClass}/destroy`,
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
        error.response.data.message || "Failed to delete classroom"
      );
    } else {
      console.error("Error deleting classroom:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
