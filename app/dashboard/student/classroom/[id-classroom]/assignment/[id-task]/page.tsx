"use client";
import {
  getStudentAssignmentDetail,
  postSubmitTask,
  postUploadTask,
} from "@/app/api/student/dashboard";
import Breadcrumb from "@/app/component/general/Breadcrumb";
import Button from "@/app/component/general/Button";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const allowedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const StudentClassroomTaskDetailPage = () => {
  const url = usePathname();
  const parts = url.split("/");
  const id_classroom = parts[4];
  const id_assignment = parts[6];

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [answerFile, setAnswerFile] = useState<File | null>(null);
  const [comment, setComment] = useState<string>("");
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [assignment, setAssignment] = useState({
    id: 0,
    title: "",
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
    },
  });

  const dataBreadcrumb = [
    { text: "Dashboard", href: "/dashboard/student" },
    { text: "Kelas", href: `/dashboard/student/classroom/${id_classroom}` },
    { text: "Detail Tugas" },
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        // Get Detail Assignment
        const responseAssignment = await getStudentAssignmentDetail(
          id_classroom,
          id_assignment
        );
        setAssignment(responseAssignment.data);
      };

      fetchData();
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      setIsLoading(false);
    }
  }, [id_classroom, id_assignment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment || !answerFile) {
      setError("Tolong di isi semua ya.");
      return;
    }

    if (!allowedFileTypes.includes(answerFile.type)) {
      setError("File harus dalam format: pdf, doc, docx, txt.");
      return;
    }

    try {
      const response = await postUploadTask(
        id_classroom,
        id_assignment,
        answerFile,
        comment
      );
      setSuccess("File uploaded successfully!");
    } catch (err: any) {
      setError(`Upload failed: ${err.message}`);
    }
  };

  const handlePostSubmitTask = async () => {
    try {
      const response = await postSubmitTask(id_classroom, id_assignment);
    } catch (err: any) {
      setError(`Failed to Confirm Submit Task: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 lg:gap-x-4 gap-y-2 md:gap-y-4 lg:gap-y-6">
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg md:col-span-2" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Breadcrumb items={dataBreadcrumb} />

      <div className="pt-4 lg:pt-6">{assignment.id}</div>
      <div className="pt-4 lg:pt-6">{assignment.title}</div>
      <div className="pt-4 lg:pt-6">{assignment.description}</div>
      <div className="pt-4 lg:pt-6">{assignment.question_file}</div>
      <div className="pt-4 lg:pt-6">{assignment.start_time}</div>
      <div className="pt-4 lg:pt-6">{assignment.deadline}</div>
      <div className="pt-4 lg:pt-6">{assignment.is_uploaded.toString()}</div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="answerFile">Answer File:</label>
            <input
              type="file"
              id="answerFile"
              accept=".pdf, .doc, .docx, .txt"
              onChange={(e) =>
                e.target.files && setAnswerFile(e.target.files[0])
              }
              required
            />
          </div>
          <div>
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          {errorForm && <p style={{ color: "red" }}>{errorForm}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      </div>
      <Button text="Submit" onClick={handlePostSubmitTask} />
    </>
  );
};

export default StudentClassroomTaskDetailPage;
