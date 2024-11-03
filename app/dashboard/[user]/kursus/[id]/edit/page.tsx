"use client";
import React, { useEffect, useState } from "react";
import Input from "@/app/component/general/Input";
import Button from "@/app/component/general/Button";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {
  getAdminCourse,
  postAdminCourses,
  putAdminCourses,
} from "@/app/api/admin/course";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";

const EditKursusPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = usePathname();
  const segments = url.split("/"); // Split the URL by '/'
  const courseId = segments[segments.indexOf("kursus") + 1];

  const [course, setCourse] = useState({
    id: 0,
    title: "",
    image: "",
    background_image: "",
    author: "",
    url_trailer: "",
    description: "",
    brief_description: "",
    tools: "",
    teaching_method: "",
    level: "",
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Response courses
        const responseCourse = await getAdminCourse(courseId);
        setCourse(responseCourse.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  const handlePutKursus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putAdminCourses(
        courseId,
        course.image,
        course.background_image,
        course.title,
        course.author,
        course.url_trailer,
        course.description,
        course.brief_description,
        course.tools,
        course.teaching_method,
        course.level,
        course.category
      );
      toast.success("Successfully changed the course 😁");
      window.location.href = "./";
    } catch (error: any) {
      toast.error(`Failed to change the course 😔: ${error.message}`);
    }
  };

  return (
    <>
      <form onSubmit={handlePutKursus} className="max-w-7xl">
        <div className="grid grid-cols-3 gap-x-4">
          <Input
            label="Title"
            type="text"
            name="title"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
          />
          <Input
            label="Author"
            type="text"
            name="author"
            value={course.author}
            onChange={(e) => setCourse({ ...course, author: e.target.value })}
            required
          />
          <Input
            label="Trailer URL"
            type="text"
            name="url_trailer"
            value={course.url_trailer}
            onChange={(e) =>
              setCourse({ ...course, url_trailer: e.target.value })
            }
          />
          <Input
            label="Tools (comma-separated)"
            type="text"
            name="tools"
            value={course.tools}
            onChange={(e) => setCourse({ ...course, tools: e.target.value })}
          />
          <div className="mb-4">
            <label htmlFor="level" className="block text-neutral2">
              Level
            </label>
            <select
              name="level"
              id="level"
              className="mt-0.5 bg-white h-max block w-full px-3 py-2 border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
              value={course.level}
              onChange={(e) => setCourse({ ...course, level: e.target.value })}
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
            value={course.category}
            onChange={(e) => setCourse({ ...course, category: e.target.value })}
          />
          <Input
            label="Image URL"
            type="text"
            name="image"
            value={course.image}
            onChange={(e) => setCourse({ ...course, image: e.target.value })}
            required
          />
          <Input
            label="Background Image URL"
            type="text"
            name="background_image"
            value={course.background_image}
            onChange={(e) =>
              setCourse({ ...course, background_image: e.target.value })
            }
            required
          />
          <Input
            label="Teaching Method"
            type="text"
            name="teaching_method"
            value={course.teaching_method}
            onChange={(e) =>
              setCourse({ ...course, teaching_method: e.target.value })
            }
            required
          />
        </div>

        <label className="block mb-4">
          <span className="text-gray-700">Brief Description</span>
          <textarea
            name="brief_description"
            value={course.brief_description}
            onChange={(e) =>
              setCourse({ ...course, brief_description: e.target.value })
            }
            required
            className="block w-full px-3 py-2 border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
          />
        </label>

        <div className="mb-4">
          <span className="text-gray-700">Description</span>
          <div className="h-60 w-full">
            <MarkdownEditor
              value={course.description}
              onChange={(value) =>
                setCourse((prev) => ({ ...prev, description: value }))
              }
              className="h-full mt-1"
            />
          </div>
        </div>

        <div className="text-end">
          <Button text="Edit Kursus" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default EditKursusPage;
