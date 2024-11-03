"use client";
import { postAdminLearningPath } from "@/app/api/admin/learning-path";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardTambahLearningPathPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handlePostLearningPath = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postAdminLearningPath(name, description, image);
      toast.success("Berhasil tambah learning path");
      window.location.href = "./";
    } catch (error: any) {
      toast.error(`Gagal tambah learning path 😔: ${error.message}`);
    }
  };

  return (
    <>
      {/* title */}
      <div className="mb-4">
        <p className="font-semibold text-neutral2 text-base">Tambah Data</p>
        <p className="text-neutral3 text-sm">Learning Path</p>
      </div>
      {/* form */}
      <form onSubmit={handlePostLearningPath} className="max-w-5xl">
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="Name"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Image URL"
            type="text"
            name="image"
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <Input
          label="Description"
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="text-end">
          <Button text="Tambah Learning Path" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default DashboardTambahLearningPathPage;
