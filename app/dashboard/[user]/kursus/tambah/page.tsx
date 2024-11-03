"use client";
import React, { useState } from "react";
import Input from "@/app/component/general/Input";
import Button from "@/app/component/general/Button";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { postAdminCourses } from "@/app/api/admin/course";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TambahKursusPage = () => {
  const [image, setImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [urlTrailer, setUrlTrailer] = useState("");
  const [description, setDescription] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [tools, setTools] = useState("");
  const [teachingMethod, setTeachingMethod] = useState("");
  const [level, setLevel] = useState("Pemula");
  const [category, setCategory] = useState("");

  const handlePostKursus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postAdminCourses(
        image,
        backgroundImage,
        title,
        author,
        urlTrailer,
        description,
        briefDescription,
        tools,
        teachingMethod,
        level,
        category
      );
      toast.success("Berhasil tambah kursus");
      window.location.href = "./";
    } catch (error: any) {
      toast.error(`Gagal tambah kursus: ${error.message}`);
    }
  };

  return (
    <>
      <form onSubmit={handlePostKursus} className="max-w-7xl">
        <div className="grid grid-cols-3 gap-x-4">
          <Input
            label="Title"
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            label="Author"
            type="text"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <Input
            label="Trailer URL"
            type="text"
            name="url_trailer"
            onChange={(e) => setUrlTrailer(e.target.value)}
          />
          <Input
            label="Tools (comma-separated)"
            type="text"
            name="tools"
            onChange={(e) => setTools(e.target.value)}
          />
          <div className="mb-4">
            <label htmlFor="level" className="block text-neutral2">
              Level
            </label>
            <select
              name="level"
              id="level"
              value={level}
              className="mt-0.5 bg-white h-max block w-full px-3 py-2 border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Pemula">Pemula</option>
              <option value="Menegah">Menegah</option>
              <option value="Mahir">Mahir</option>
            </select>
          </div>
          <Input
            label="Category"
            type="text"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            label="Image URL"
            type="text"
            name="image"
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Input
            label="Background Image URL"
            type="text"
            name="background_image"
            onChange={(e) => setBackgroundImage(e.target.value)}
            required
          />
          <Input
            label="Teaching Method"
            type="text"
            name="teaching_method"
            onChange={(e) => setTeachingMethod(e.target.value)}
            required
          />
        </div>
        <label className="block mb-4">
          <span className="text-gray-700">Brief Description</span>
          <textarea
            name="brief_description"
            onChange={(e) => setBriefDescription(e.target.value)}
            required
            className="block w-full px-3 py-2 border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
          />
        </label>
        <div className="mb-4">
          <span className="text-gray-700">Description</span>
          <div className="h-60 w-full">
            <MarkdownEditor
              onChange={(content) => setDescription(content)}
              className="h-full mt-1"
            />
          </div>
        </div>
        <div className="text-end">
          <Button text="Tambah Kursus" type="submit" />
        </div>{" "}
      </form>
      <ToastContainer />
    </>
  );
};

export default TambahKursusPage;
