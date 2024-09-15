"use client";
import {
  getStudentAssignmentDetail,
  postSubmitTask,
  postUploadTask,
} from "@/app/api/student/dashboard";
import Breadcrumb from "@/app/component/general/Breadcrumb";
import Button from "@/app/component/general/Button";
import Modal from "@/app/component/general/Modal";
import { formatDate } from "@/app/lib/formatDate";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const allowedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const POLLING_INTERVAL = 30000; // 30 seconds

const StudentClassroomTaskDetailPage = () => {
  const url = usePathname();
  const [assignment, setAssignment] = useState({
    id: 0,
    title: "",
    type: "",
    description: "",
    start_time: "",
    deadline: "",
    question_file: "",
    is_uploaded: false,
    tasks: {
      id: 0,
      score: 0,
      is_submitted: false,
      answer_file: "",
      comment: "",
    },
  });
  const [formData, setFormData] = useState({ answerFile: null, comment: "" });
  const [status, setStatus] = useState({
    loading: true,
    error: null,
    success: null,
  });

  const parts = url.split("/");
  const id_classroom = parts[4];
  const id_assignment = parts[6];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dataBreadcrumb = [
    { text: "Dashboard", href: "/dashboard/student" },
    { text: "Kelas", href: `/dashboard/student/classroom/${id_classroom}` },
    { text: "Detail Tugas" },
  ];

  // Polling mechanism
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAssignmentDetail();
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  const fetchAssignmentDetail = async () => {
    try {
      const response = await getStudentAssignmentDetail(
        id_classroom,
        id_assignment
      );
      setAssignment(response.data);
      setStatus((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      setStatus({
        loading: false,
        error: "Failed to load data",
        success: null,
      });
    }
  };

  useEffect(() => {
    fetchAssignmentDetail();
  }, [id_classroom, id_assignment]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.files) {
      const files = e.target.files;
      setFormData((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { answerFile, comment } = formData;

    if (!comment || !answerFile) {
      setStatus({
        loading: false,
        error: "Please fill all fields",
        success: null,
      });
      return;
    }

    if (!allowedFileTypes.includes(answerFile.type)) {
      setStatus({
        loading: false,
        error: "File must be of type pdf, doc, docx, or txt",
        success: null,
      });
      return;
    }

    try {
      await postUploadTask(id_classroom, id_assignment, answerFile, comment);
      setStatus({
        loading: false,
        error: null,
        success: "File uploaded successfully",
      });
      toast.success("Berhasil upload tugas!");
      fetchAssignmentDetail(); // Fetch updated data after successful upload
    } catch (error) {
      toast.error("Gagal upload tugas!");
      setStatus({
        loading: false,
        error: "File upload failed",
        success: null,
      });
    }
  };

  const handlePostSubmitTask = async () => {
    try {
      await postSubmitTask(id_classroom, id_assignment);
      setStatus({
        loading: false,
        error: null,
        success: "Task submitted successfully",
      });
      setIsModalOpen(false);
      toast.success("Berhasil konfirmasi upload tugas!");
      fetchAssignmentDetail(); // Fetch updated data after successful submission
    } catch (error) {
      setStatus({
        loading: false,
        error: "Failed to submit task",
        success: null,
      });
    }
  };

  function calculateTimeDifference(
    deadline: string,
    startTime: string
  ): string {
    const deadlineDate = new Date(deadline);
    const startTimeDate = new Date(startTime);
    const diffInMs = deadlineDate.getTime() - startTimeDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffInMinutes = Math.floor(
      (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    let result = "";
    if (diffInDays > 0) result += `${diffInDays} Hari `;
    if (diffInHours > 0) result += `${diffInHours} Jam `;
    if (diffInMinutes > 0 && diffInDays === 0)
      result += `${diffInMinutes} Menit `;
    result += "Lagi";

    return result.trim();
  }

  const [uploadForm, setUploadForm] = useState(false);
  const toggleUploadForm = () => setUploadForm(!uploadForm);

  function getFileNameFromUrl(url: string | null | undefined): string {
    if (!url) {
      return ""; // Return an empty string or any fallback value if the URL is null or undefined
    }

    // Split the URL by '/'
    const parts = url.split("/");
    // Return the last part, which is the file name
    return parts[parts.length - 1];
  }

  if (status.loading) return <p>Loading...</p>;
  if (status.error) return <p>{status.error}</p>;

  return (
    <>
      <Breadcrumb items={dataBreadcrumb} />

      <div className="pt-4 lg:pt-6">
        {/* Title */}
        <div className="flex gap-4">
          <div className="min-w-24 h-24 bg-primary5 fill-primary3 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-12 w-12"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
            </svg>
          </div>

          <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-neutral-800">
                {assignment.title}
              </h1>
              <div className="flex mt-1 gap-6">
                <p className="text-sm text-neutral3">
                  Diberikan{" "}
                  <span className="text-neutral1">
                    {formatDate(assignment.start_time)}
                  </span>
                </p>
                <p className="text-sm text-neutral3">
                  Deadline{" "}
                  <span className="text-neutral1">
                    {formatDate(assignment.deadline)}
                  </span>
                </p>
              </div>
            </div>
            <div className="h-max flex gap-6 bg-primary5 p-4 rounded-lg">
              <div>
                <p className="text-sm mb-1">Status</p>
                {assignment.is_uploaded ? (
                  <p className="bg-green-100 border-2 border-dashed border-green-500 text-green-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                    Sudah dikumpulkan
                  </p>
                ) : (
                  <p className="bg-red-100 border-2 border-dashed border-red-500 text-red-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                    Belum dikumpulkan
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm mb-1">Batas Waktu</p>
                <div className="flex gap-1.5 items-center fill-red-500 bg-red-100 border-2 border-red-500 text-red-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                  >
                    <path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                  </svg>
                  <p className="text-xs lg:text-sm">
                    {calculateTimeDifference(
                      assignment.deadline,
                      assignment.start_time
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Description and File Attachment */}
        <div className="mt-8">
          <h2 className="text-lg">Deskripsi</h2>
          <p className="text-neutral2 mt-1">{assignment.description}</p>

          {assignment.question_file !== null && (
            <>
              <h2 className="text-lg mt-4">File Soal</h2>
              <div className="mt-1 w-full lg:max-w-96 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 bg-secondary1 bg-opacity-20 fill-secondary1 rounded-md flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                    >
                      <path d="M360-240h240q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320H360q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm0-160h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z" />
                    </svg>
                  </div>
                  <p className="max-w-60 text-sm truncate">
                    {getFileNameFromUrl(assignment.question_file)}
                  </p>
                </div>
                <div>
                  <Link
                    href={assignment.question_file || ""}
                    target="_blank"
                    className="flex gap-1 items-center transition duration-200 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="18px"
                    >
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                    </svg>
                    <p className="text-xs lg:text-sm">View</p>
                  </Link>
                </div>
              </div>
            </>
          )}

          {assignment.tasks?.answer_file !== undefined && (
            <>
              <h2 className="text-lg mt-4">Jawaban Anda</h2>
              <p className="text-neutral2">{assignment.tasks?.comment}</p>
              <div className="mt-1 w-full lg:max-w-96 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 bg-green-500 bg-opacity-20 fill-green-500 rounded-md flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                    >
                      <path d="M360-240h240q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320H360q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm0-160h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z" />
                    </svg>
                  </div>
                  <p className="max-w-60 text-sm truncate">
                    {getFileNameFromUrl(assignment.tasks?.answer_file)}
                  </p>
                </div>
                <div>
                  <Link
                    href={assignment.tasks?.answer_file}
                    target="_blank"
                    className="flex gap-1 items-center transition duration-200 ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="18px"
                    >
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                    </svg>
                    <p className="text-xs lg:text-sm">View</p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Answer Form */}
        {/* <div className="mt-8 w-full border border-neutral4 p-4 rounded-lg">
          <p className="w-max bg-green-100 border-2 border-green-500 text-green-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
            Tugas Anda sudah terkirim!
          </p>
          <p className="w-max bg-orange-100 border-2 border-orange-500 text-orange-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
            Tugas Anda belum tersubmit!
          </p>
        </div> */}
        <div
          className={`mt-8 flex gap-2 ${
            assignment.tasks?.is_submitted && "hidden"
          }`}
        >
          <Button
            text={
              uploadForm
                ? "Cancel"
                : assignment.is_uploaded
                ? "Edit Tugas"
                : "Upload Tugas"
            }
            onClick={toggleUploadForm}
            className={`relative px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
              uploadForm ? "bg-red-500 hover:bg-red-600 focus:ring-red-100" : ""
            }`}
          />
          <Button
            text="Konfirmasi Upload"
            onClick={handleOpenModal}
            className={`${
              assignment.is_uploaded
                ? "block bg-red-500 hover:bg-red-600 focus:ring-red-100"
                : "hidden"
            }`}
          />
        </div>
        <div
          className={`mt-4 p-4 rounded-lg shadow-md transition-all duration-500 ease-in-out transform ${
            uploadForm
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 hidden"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Answer File */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="answerFile"
                className="text-neutral-700 font-medium"
              >
                Upload File
              </label>
              <input
                type="file"
                id="answerFile"
                accept=".pdf, .doc, .docx, .txt"
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary2"
                onChange={handleFormChange}
                required
              />
            </div>

            {/* Comment Section */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="comment" className="text-neutral-700 font-medium">
                Komentar
              </label>
              <textarea
                id="comment"
                value={formData.comment}
                onChange={handleFormChange}
                className="p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary2"
                placeholder="Add any additional notes here..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button
                text="Kirim"
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
              />
            </div>
          </form>

          {/* Status Messages */}
          {status.error && <p className="text-red-500 mt-4">{status.error}</p>}
          {status.success && (
            <p className="text-green-500 mt-4">{status.success}</p>
          )}
        </div>
      </div>
      {/* Modal Konfirmasi Upload */}
      <Modal
        title="Konfirmasi Upload"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="mt-4">
          <p className="text-xs lg:text-sm text-neutral2 mb-4">
            Anda tidak dapat lagi mengubah tugas yang Anda kerjakan setelah
            menekan tombol Konfirmasi.
          </p>
          <Button
            text="Konfirmasi"
            className="w-full"
            onClick={handlePostSubmitTask}
          />
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default StudentClassroomTaskDetailPage;
