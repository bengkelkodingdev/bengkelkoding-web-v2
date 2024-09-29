"use client";

import Button from "@/app/component/general/Button";
import InputBasic from "@/app/component/general/InputBasic";
import { useSearchParams } from "next/navigation";
import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { addImage, findImageData, updateImage } from "@/app/api/imageAsset";
import axios from "axios";

export default function DashboardUploadImagePage() {
  const searchParams = useSearchParams();
  const IdImage = searchParams.get("idImage");
  const StatusForm = searchParams.get("status");

  const [judul, setJudul] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // -
  // file logic
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // status upload data
  const [isStatus, setIsStatus] = useState(false);

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

  // get detail for edit
  useEffect(() => {
    if (IdImage && StatusForm) {
      findImageData(IdImage)
        .then((response) => {
          setJudul(response.data.title);
          setDescription(response.data.description);

          // Tambahkan data lainnya jika diperlukan
        })
        .catch((error) => {
          console.error("Error fetching image details:", error);
          toast.error("Gagal memuat detail image", error);
        });
    }
  }, [IdImage, StatusForm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", judul);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    setIsStatus(true);
    try {
      if (StatusForm) {
        await updateImage(formData, IdImage);
        toast.success("Image berhasil diperbarui");
      } else {
        // Tambah tugas baru jika tidak dalam mode edit
        await addImage(formData);

        toast.success("Image berhasil diperbarui");
      }
      window.location.href = `./`;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response data:", error.response.data);
        toast.error("Gagal menyimpan tugas");
      } else {
        console.error("Failed to save assignment:", error);
        toast.error("Gagal menyimpan tugas");
      }
    } finally {
      setIsStatus(false);
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
          {StatusForm == "edit" ? (
            <p className="font-semibold text-neutral2 text-base">Ubah Data</p>
          ) : (
            <p className="font-semibold text-neutral2 text-base">Tambah Data</p>
          )}

          <p className="text-neutral3 text-sm">Upload Image</p>
          <div className="grid grid-cols-2 gap-x-4 mt-2">
            <InputBasic
              type="text"
              label="Title"
              name="title"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
            <InputBasic
              type="text"
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* file */}
            <div className="file-container w-full col-span-2">
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
          </div>
        </div>

        <div className="text-end">
          <Button
            type="submit"
            text={StatusForm ? "Edit Image" : "Upload Image"}
            disabled={isStatus}
          />
          {isStatus ? (
            <div className="flex space-x-2 justify-center items-center">
              <span className="sr-only">Loading...</span>
              <div className="h-4 w-4 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-4 w-4 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-4 w-4 bg-blue-700 rounded-full animate-bounce"></div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>

      <ToastContainer />
    </>
  );
}
