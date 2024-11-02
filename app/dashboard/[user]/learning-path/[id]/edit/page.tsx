"use client";
import {
  getAdminDetailLearningPath,
  putAdminLearningPath,
} from "@/app/api/admin/learning-path";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import { LearningPathData } from "@/app/interface/dashboard/admin/LearningPath";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardEditLearningPathPage = () => {
  const url = usePathname();
  const segments = url.split("/");
  const learningPathId = Number(
    segments[segments.indexOf("learning-path") + 1]
  );

  const [learningPath, setLearningPath] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Get Detail Learning Path
    const fetchData = async () => {
      try {
        // Response
        const response = await getAdminDetailLearningPath(learningPathId);
        setLearningPath(response.data);
      } catch (err) {
        console.error("Failed to load data. Please try again.");
      }
    };
    fetchData();
  }, [learningPathId]);

  // Update Learning Path
  const handlePutLearningPath = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putAdminLearningPath(
        learningPathId,
        learningPath.name,
        learningPath.description,
        learningPath.image
      );
      toast.success("Berhasil edit learning path");
      window.location.href = "./";
    } catch (error: any) {
      toast.error(`Gagal edit learning path 😔: ${error.message}`);
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
      <form onSubmit={handlePutLearningPath} className="max-w-5xl">
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="Name"
            type="text"
            name="name"
            value={learningPath.name}
            onChange={(e) =>
              setLearningPath({ ...learningPath, name: e.target.value })
            }
            required
          />
          <Input
            label="Image URL"
            type="text"
            name="image"
            value={learningPath.image}
            onChange={(e) =>
              setLearningPath({ ...learningPath, image: e.target.value })
            }
            required
          />
        </div>
        <Input
          label="Description"
          type="text"
          name="description"
          value={learningPath.description}
          onChange={(e) =>
            setLearningPath({ ...learningPath, description: e.target.value })
          }
        />

        <div className="text-end">
          <Button text="Edit Learning Path" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default DashboardEditLearningPathPage;
