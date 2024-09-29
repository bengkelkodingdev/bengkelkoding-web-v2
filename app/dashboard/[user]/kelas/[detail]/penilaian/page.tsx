"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

import { SubmissionResponse } from "@/app/interface/Submission";
import InputBasic from "@/app/component/general/InputBasic";

import {
  getSubmissionAdmin,
  getSubmissionAssistant,
  getSubmissionLecture,
  postGradeAdmin,
  postGradeAssistant,
  postGradeLecture,
} from "@/app/api/penugasan";
import { stringify } from "querystring";

export default function PenilaianTugas() {
  const searchParams = useSearchParams();
  const role_user = Cookies.get("user_role");
  const IdClassroom = searchParams.get("idClassroom");
  const IdAssignment = searchParams.get("idAssignment");

  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);
  const [page, setPage] = useState(1); // Halaman saat ini
  const [perPage] = useState(10); // Jumlah data per halaman

  const [grades, setGrades] = useState<{ [key: number]: number | null }>({});

  const handleGradeChange = (id: number, inputScore: number) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [id]: inputScore, // Simpan nilai berdasarkan id submission
    }));
  };

  const fetchDataSubmission = async (currentPage: number) => {
    try {
      let response;
      if (role_user === "superadmin" || role_user === "admin") {
        response = await getSubmissionAdmin(
          IdClassroom,
          IdAssignment,
          currentPage,
          perPage
        );
      } else if (role_user === "lecture") {
        response = await getSubmissionLecture(
          IdClassroom,
          IdAssignment,
          currentPage,
          perPage
        );
      } else if (role_user === "assistant") {
        response = await getSubmissionAssistant(
          IdClassroom,
          IdAssignment,
          currentPage,
          perPage
        );
      }

      if (response) {
        setSubmission(response);

        // Inisialisasi grades dari data response
        const initialGrades = response.data.reduce(
          (acc: any, submission: any) => {
            acc[submission.id] =
              submission.grade !== null ? submission.grade : ""; // Set nilai grade
            return acc;
          },
          {}
        );

        setGrades(initialGrades); // Simpan nilai grades ke state
      }
    } catch (error) {
      console.error("Error fetching submission:", error);
    }
  };

  const handleGrade = async (inputScore: number, taskId: number) => {
    try {
      let response;
      if (role_user === "superadmin" || role_user === "admin") {
        response = await postGradeAdmin(
          IdClassroom,
          IdAssignment,
          taskId,
          inputScore
        );
        toast.success("Berhasil Menilai Mahasiswa 😁");
      }

      if (role_user === "lecture") {
        response = await postGradeLecture(
          IdClassroom,
          IdAssignment,
          taskId,
          inputScore
        );
        toast.success("Berhasil Menilai Mahasiswa 😁");
      }

      if (role_user === "assistant") {
        response = await postGradeAssistant(
          IdClassroom,
          IdAssignment,
          taskId,
          inputScore
        );
        toast.success("Berhasil Menilai Mahasiswa 😁");
      }
    } catch (error) {
      console.error("Error submit score:", error);
      toast.error("Gagal Menilai Mahasiswa 😔");
    }
  };

  useEffect(() => {
    fetchDataSubmission(page);
  }, [page, IdClassroom, IdAssignment]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Pindah ke halaman berikutnya
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); // Pindah ke halaman sebelumnya
    }
  };

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
        <thead className="text-sm text-neutral2 bg-gray-100">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Nama
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Komentar
            </th>
            <th scope="col" className="px-6 py-3">
              Tanggal Submit
            </th>
            <th scope="col" className="px-6 py-3">
              File
            </th>
            <th scope="col" className="px-6 py-3">
              Nilai
            </th>

            <th scope="col" className="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {submission?.data.length > 0 ? (
            submission?.data.map((submission) => (
              <tr
                key={submission.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-sm text-neutral2">
                    {submission.name}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-normal text-xs">
                    {submission.status_label}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {submission.comment !== null ? submission.comment : "-"}
                </td>
                <td className="px-6 py-4">
                  {submission.submit_date !== null
                    ? submission.submit_date
                    : "-"}
                </td>
                <td className="px-6 py-4">
                  {submission.file_url ? (
                    <a
                      href={submission.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Download File
                    </a>
                  ) : (
                    "Tidak ada file"
                  )}
                </td>
                <td className="px-6 py-4">
                  <InputBasic
                    // placeholder={submission.id.toString()}
                    label=""
                    name={`grade-${submission.id}`}
                    type="number"
                    className="w-14 font-semibold border ..."
                    value={
                      grades && grades[submission.id] !== undefined
                        ? grades[submission.id]
                        : ""
                    }
                    onChange={(e) =>
                      handleGradeChange(submission.id, parseInt(e.target.value))
                    }
                    required
                  />
                </td>

                <td className="px-6 py-4">
                  <button
                    className="ml-2 px-4 py-2 bg-primary1 text-white rounded-md"
                    onClick={() => {
                      const inputScore = grades[submission.id] || 0; // Ambil nilai dari state grades
                      handleGrade(inputScore, submission.task_id); // Panggil handleGrade dengan nilai yang diinput
                    }}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                Data kosong
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-neutral3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing {(page - 1) * perPage + 1}-
          {Math.min(page * perPage, submission?.meta.pagination.total || 0)} of{" "}
          {submission?.meta.pagination.total}
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral3 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-neutral2 disabled:opacity-50"
            >
              Sebelumnya
            </button>
          </li>
          {[...Array(submission?.meta.pagination.total_pages || 1)].map(
            (_, index) => (
              <li key={index}>
                <button
                  onClick={() => setPage(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    page === index + 1
                      ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={handleNextPage}
              disabled={page === submission?.meta.pagination.total_pages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-neutral2 disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </li>
        </ul>
      </nav>
      <ToastContainer />
    </div>
  );
}
