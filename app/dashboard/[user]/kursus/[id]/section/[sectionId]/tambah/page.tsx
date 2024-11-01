"use client";
import {
  postAdminArticleCourses,
} from "@/app/api/admin/course";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import MarkdownReader from "@/app/component/general/MarkdownReader";
import Modal from "@/app/component/general/Modal";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { marked } from "marked";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TambahArticleKursusPage = () => {
  const url = usePathname();
  const segments = url.split("/");
  const courseId = segments[segments.indexOf("kursus") + 1];
  const sectionId = segments[segments.indexOf("section") + 1];

  // Handle post article
  const [titleArticle, setTitleArticle] = useState("");
  const [contentArticle, setContentArticle] = useState("");

  const handlePostArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postAdminArticleCourses(
        courseId,
        sectionId,
        titleArticle,
        contentArticle
      );
      toast.success("Successfully add article");

      window.location.href = `./`;
    } catch (error: any) {
      toast.error(`Failed to add article: ${error.message}`);
    }
  };

  return (
    <>
      <div className="lg:max-w-screen-xl">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <p className="font-semibold text-lg">Add Article</p>
        </div>

        {/* Table */}
        <form onSubmit={handlePostArticle}>
          <Input
            label="Judul"
            type="text"
            name="title"
            placeholder="Masukkan Judul Artikel"
            required
            onChange={(e) => setTitleArticle(e.target.value)}
          />
          {/* Markdown Editor */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-neutral2">
              Konten
            </label>
            <div className="flex mt-1">
              <MarkdownEditor
                onChange={(value) =>
                  setContentArticle(value)
                }
                className="w-[50%]"
              />
              <div className="lg:w-[50%] p-4 prose prose-slate mx-auto border">
                <MarkdownReader content={marked(contentArticle).toString()} />
              </div>
            </div>
          </div>
          {/* Konten */}
          <Button text="Tambah Artikel" type="submit" />
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default TambahArticleKursusPage;
