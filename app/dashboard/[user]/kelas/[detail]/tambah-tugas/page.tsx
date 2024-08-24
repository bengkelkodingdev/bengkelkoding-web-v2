"use client";
import React, { useState, DragEvent, ChangeEvent, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Input from "@/app/component/general/Input";
import Button from "@/app/component/general/Button";
import { AssignmentData } from "@/app/interface/Assigment";
import { createAssigment } from "@/app/api/admin/api-kelas/tugas/API-Assgiment";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function DetailTambahKelas() {
  const searchParams = useSearchParams();
  const IdClassroom = searchParams.get("idClassroom");
  // State untuk input
  const [judul, setJudul] = useState<string>("");
  const [jenis, setJenis] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [descriptionCharCount, setDescriptionCharCount] = useState<number>(0);
  const [start_time, setStartTime] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  // file logic
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // date
  const [formattedStartDateTime, setFormattedStartDateTime] =
    useState<string>("");
  const [formattedEndDateTime, setFormattedEndDateTime] = useState<string>("");

  // const handleDateTimeChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   type: "start" | "end"
  // ) => {
  //   const selectedDateTime = e.target.value;
  //   const formatted = formatDateTime(selectedDateTime);

  //   if (type === "start") {
  //     setStartTime(formatted);
  //     console.log("Formatted Start Date and Time:", formatted);
  //   } else {
  //     setDeadline(formatted);
  //     console.log("Formatted End Date and Time:", formatted);
  //   }
  // };

  // const formatDateTime = (dateTime: string): string => {
  //   const days = [
  //     "Minggu",
  //     "Senin",
  //     "Selasa",
  //     "Rabu",
  //     "Kamis",
  //     "Jumat",
  //     "Sabtu",
  //   ];

  //   const date = new Date(dateTime);
  //   const dayName = days[date.getDay()];
  //   const time = date.toTimeString().slice(0, 5); // Get HH:MM
  //   const formattedDate = date.toLocaleDateString("id-ID", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });

  //   return `${dayName} - ${time} ${formattedDate}`;
  // };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes

      // Validasi ukuran file
      if (selectedFile.size > maxSize) {
        toast.error(`File lebih dari 10mb, Ubah segera!`);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes

      if (selectedFile.size > maxSize) {
        toast.error(`File lebih dari 10mb, Ubah segera!`);
        return;
      }

      setFile(selectedFile);
      e.dataTransfer.clearData();
    }
  };

  const maxDescriptionLength = 255;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDescription(e.target.value);
    if (name === "description") {
      setDescriptionCharCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!IdClassroom) {
      console.error("Classroom ID not found");
      return;
    }

    const formData = new FormData();
    formData.append("title", judul);
    formData.append("type", jenis);
    formData.append("description", description);
    if (file) {
      console.log("File selected:", file);
      formData.append("file", file);
    }
    formData.append("start_time", start_time);
    formData.append("deadline", deadline);
    formData.append("created_at", new Date().toISOString());
    formData.append("updated_at", new Date().toISOString());

    try {
      const response = await createAssigment(formData, IdClassroom); // Kirim FormData
      toast.success(`Berhasil menambahkan tugas 😁`);
      window.location.href = `./`;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
        toast.error(`Gagal menambahkan tugas`);
      } else {
        console.error("Failed to create assignment:", error);
        toast.error(`Gagal menambahkan tugas`);
      }
    }
  };

  return (
    <>
      <form
        className="max-w-5xl flex flex-col gap-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <p className="font-semibold text-neutral2">Tambah Tugas</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mt-2">
          {/* judul tugas  */}
          <div className="kiri">
            <Input
              type="text"
              label="Judul"
              name="judul"
              onChange={(e) => setJudul(e.target.value)}
              required
            />
            <div className="flex w-full justify-between">
              {/* Tanggal mulai */}
              <Input
                type="datetime-local"
                label="Waktu Mulai"
                name="Waktu Mulai"
                onChange={(e) => setStartTime(e.target.value)}
                // onChange={(e) => handleDateTimeChange(e, "start")}
                required
              />
              {/* Tanggal selesai */}
              <Input
                type="datetime-local"
                label="Waktu Selesai"
                name="Waktu Selesai"
                onChange={(e) => setDeadline(e.target.value)}
                // onChange={(e) => handleDateTimeChange(e, "end")}
                required
              />
            </div>
            {/* jenis */}
            <Input
              type="text"
              label="Jenis"
              name="Jenis"
              onChange={(e) => setJenis(e.target.value)}
              required
            />
          </div>
          <div className="kanan">
            {/* Deskripsi */}
            <div className="h-full">
              <div className="flex gap-5">
                <label htmlFor="description" className="block text-neutral2">
                  Deskripsi
                </label>
                <div
                  className={`text-sm mt-1 ${
                    descriptionCharCount == maxDescriptionLength
                      ? "text-red-500"
                      : "text-neutral2"
                  }`}
                >
                  {descriptionCharCount}/{maxDescriptionLength} karakter
                </div>
              </div>
              <textarea
                name="description"
                id="description"
                className="h-[82%] mt-1 relative shadow-sm block w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                onChange={handleChange}
                maxLength={maxDescriptionLength}
                required
              ></textarea>
            </div>
          </div>
        </div>
        {/* file */}
        <div className="file-container w-full">
          <label htmlFor="description" className="block text-neutral2">
            Upload File
          </label>
          <div
            className={`w-full mt-5 p-14 border-2 border-dashed rounded-md ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } flex flex-col items-center justify-center cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileClick}
          >
            <p className="text-gray-500">
              {file ? (
                `File: ${file.name}`
              ) : (
                <>
                  Drag & Drop your file here or click to upload.{" "}
                  <strong className="text-red-500">Max 10MB</strong>
                </>
              )}
            </p>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="text-start">
          <Button text="Tambah Tugas" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
