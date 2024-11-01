"use client";
import {
  getAdminDetailArticleCourse,
  putAdminArticleCourses,
} from "@/app/api/admin/course";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { marked } from "marked";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MarkdownReader = dynamic(
  () => import("@/app/component/general/MarkdownReader"),
  { ssr: false }
);

const EditArticleKursusPage = () => {
  const url = usePathname();
  const segments = url.split("/");
  const courseId = segments[segments.indexOf("kursus") + 1];
  const sectionId = segments[segments.indexOf("section") + 1];
  const articleId = segments[segments.indexOf("section") + 2];

  const [error, setError] = useState("");
  const [article, setArticle] = useState({
    id: 0,
    section_id: 0,
    title: "",
    content: "",
    sort_order: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsDetailArticle = await getAdminDetailArticleCourse(
          courseId,
          sectionId,
          articleId
        );
        setArticle(responsDetailArticle.data);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      }
    };
    fetchData();
  }, [courseId, sectionId, articleId]);

  const handleUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putAdminArticleCourses(
        courseId,
        sectionId,
        articleId,
        article.title,
        article.content
      );
      toast.success("Successfully changed the article");
    } catch (error: any) {
      toast.error(`Failed to change the article: ${error.message}`);
    }
  };

  return (
    <>
      <div className="lg:max-w-screen-xl">
        <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <p className="font-semibold text-lg">Edit Article</p>
        </div>

        <form onSubmit={handleUpdateArticle}>
          <Input
            label="Judul"
            type="text"
            name="title"
            placeholder="Masukkan Judul Artikel"
            required
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />

          <div className="mb-4">
            <label htmlFor="content" className="block text-neutral2">
              Konten
            </label>
            <div className="flex mt-1">
              <MarkdownEditor
                value={article.content}
                onChange={(value) =>
                  setArticle((prev) => ({ ...prev, content: value }))
                }
                className="w-[50%]"
              />
              <div className="lg:w-[50%] p-4 prose prose-slate mx-auto border">
                <MarkdownReader content={marked(article.content).toString()} />
              </div>
            </div>
          </div>

          <Button text="Edit Artikel" type="submit" />
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default EditArticleKursusPage;
