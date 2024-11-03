"use client";
import { getAdminListCourses } from "@/app/api/admin/course";
import { postAdminLearningPath } from "@/app/api/admin/learning-path";
import { postAdminLearningPathItem } from "@/app/api/admin/learning-path-item";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardTambahLearningPathItemPage = () => {
  const url = usePathname();
  const segments = url.split("/");
  const learningPathId = Number(
    segments[segments.indexOf("learning-path") + 1]
  );

  const [course, setCourse] = useState([
    {
      id: 0,
      title: "",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminListCourses();
      setCourse(response.data);
    };
    fetchData();
  }, []);

  const [courseId, setCourseId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePostLearningItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postAdminLearningPathItem(
        learningPathId,
        courseId,
        title,
        description
      );
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
        <p className="text-neutral3 text-sm">Learning Item</p>
      </div>
      {/* form */}
      <form onSubmit={handlePostLearningItem} className="max-w-5xl">
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="Judul"
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div>
            <label htmlFor="courseId" className="block text-neutral2">
              Kursus
            </label>
            <select
              name="courseId"
              id="courseId"
              className="mt-0.5 block bg-white w-full px-3 py-2 border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
              onChange={(e) => setCourseId(Number(e.target.value))}
              required
            >
              <option value="" disabled selected>
                Pilih Kursus
              </option>
              {course.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Input
          label="Description"
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="text-end">
          <Button text="Tambah Learning Item" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default DashboardTambahLearningPathItemPage;
