"use client";
import {
  deleteAdminArticleCourses,
  getAdminArticleCourse,
  postAdminArticleCourses,
  putAdminArticleCourses,
} from "@/app/api/admin/course";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import Modal from "@/app/component/general/Modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArticleKursusPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listArticle, setListArticle] = useState([
    {
      id: 0,
      section_id: 0,
      title: "",
      sort_order: 0,
    },
  ]);

  const url = usePathname();
  const segments = url.split("/");
  const courseId = segments[segments.indexOf("kursus") + 1];
  const sectionId = segments[segments.indexOf("section") + 1];

  const fetchData = async () => {
    try {
      const responseArticle = await getAdminArticleCourse(courseId, sectionId);
      setListArticle(responseArticle.data);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      setIsLoading(false);
    }
  };

  // UseEffect to load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Modal add article
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle post article
  const [titleArticle, setTitleArticle] = useState("");
  const [contentArticle, setContentArticle] = useState("");

  const handlePostArticle = async () => {
    try {
      await postAdminArticleCourses(
        courseId,
        sectionId,
        titleArticle,
        contentArticle
      );
      toast.success("Successfully add article");

      handleCloseModal();

      await fetchData();
    } catch (error: any) {
      toast.error(`Failed to add article: ${error.message}`);
    }
  };

  const [articleId, setArticleId] = useState("");

  // Modal update article
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const handleOpenUpdateModal = (article_id: string) => {
    setIsModalOpenUpdate(true);
    setArticleId(article_id);
  };
  const handleCloseUpdateModal = () => {
    setIsModalOpenUpdate(false);
  };
  const handleUpdateArticle = async () => {
    try {
      await putAdminArticleCourses(
        courseId,
        sectionId,
        articleId,
        titleArticle,
        contentArticle
      );
      toast.success("Successfully change the article");

      handleCloseUpdateModal();

      await fetchData();
    } catch (error: any) {
      toast.error(`Failed to change the article: ${error.message}`);
    }
  };

  // Modal delete article
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const handleOpenDeleteModal = (article_id: string) => {
    setIsModalOpenDelete(true);
    setArticleId(article_id);
  };
  const handleCloseDeleteModal = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteSection = async () => {
    try {
      await deleteAdminArticleCourses(courseId, sectionId, articleId);
      toast.success("Successfully delete the section");

      handleCloseDeleteModal();

      await fetchData();
    } catch (error: any) {
      toast.error(`Failed to delete the section: ${error.message}`);
    }
  };

  // Modal sort article
  const [isModalOpenSort, setIsModalOpenSort] = useState(false);
  const handleOpenSortModal = () => {
    setIsModalOpenSort(true);
  };
  const handleCloseSortModal = () => {
    setIsModalOpenSort(false);
  };

  if (isLoading) {
    return (
      <div className="bg-[#f7f9fa]">
        <div className="max-w-5xl mx-auto px-2 lg:px-4 py-4 min-h-screen">
          <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg mb-6 md:mb-8" />
          <div className="mx-auto grid lg:max-w-screen-lg grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="w-full min-h-72 mx-auto rounded-xl bg-neutral5 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="lg:max-w-screen-xl">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <p className="font-semibold text-lg">List Article</p>
          {/* action button */}
          <div className="flex gap-2">
            <Link
              href={`${sectionId}/tambah`}
              className="cursor-pointer flex items-center gap-2 bg-primary1 text-white fill-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
              <p>Article</p>
            </Link>
            <div
              onClick={handleOpenSortModal}
              className="cursor-pointer flex items-center gap-2 bg-primary1 text-white fill-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              <p>Ubah Urutan Article</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
          <thead className="text-sm text-neutral2 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sort Order
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listArticle.length > 0 ? (
              listArticle.map((article) => (
                <tr
                  key={article.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{article.sort_order}</td>
                  <td className="px-6 py-4">{article.title}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      href={`${sectionId}/${article.id}`}
                      className="block bg-yellow2 p-1 rounded-md fill-white hover:bg-yellow1 transition-all ease-in-out duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 0 24 24"
                        width="18px"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() =>
                        handleOpenDeleteModal(article.id.toString())
                      }
                      className="block bg-red2 p-1 rounded-md fill-white hover:bg-red1 transition-all ease-in-out duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 0 24 24"
                        width="18px"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Section */}
      <Modal
        title="Hapus Artikel"
        isOpen={isModalOpenDelete}
        onClose={handleCloseDeleteModal}
      >
        <div className="mt-4">
          <p className="mb-4">Apakah anda yakin ingin menghapus artikel ini?</p>
          <Button
            text="Hapus Artikel"
            className="w-full"
            onClick={handleDeleteSection}
          />
        </div>
      </Modal>

      {/* Sort Article */}
      <Modal
        title="Ubah Urutan Artikel"
        isOpen={isModalOpenSort}
        onClose={handleCloseSortModal}
      >
        <div className="mt-4">
          <p className="mb-4">
            Apakah anda yakin ingin merubah urutan artikel?
          </p>
          <Button
            text="Ubah Urutan Artikel"
            className="w-full"
            // onClick={() => handlePostArticle}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ArticleKursusPage;
