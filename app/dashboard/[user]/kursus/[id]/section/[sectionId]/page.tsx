"use client";

import {
  deleteAdminArticleCourses,
  getAdminArticleCourse,
  putAdminSortArticleCourses,
} from "@/app/api/admin/course";
import Button from "@/app/component/general/Button";
import Modal from "@/app/component/general/Modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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

  useEffect(() => {
    fetchData();
  }, []);

  const [articleId, setArticleId] = useState("");

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
  const [isChangedSort, setIsChangedSort] = useState(false);
  const [isModalOpenSort, setIsModalOpenSort] = useState(false);
  const handleOpenSortModal = () => {
    setIsModalOpenSort(true);
  };
  const handleCloseSortModal = () => {
    setIsModalOpenSort(false);
  };

  const handleDragEnd = async (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedArticles = Array.from(listArticle);
    const [reorderedArticle] = updatedArticles.splice(source.index, 1);
    updatedArticles.splice(destination.index, 0, reorderedArticle);

    // Update sort order for each article
    const sortedArticles = updatedArticles.map((article, index) => ({
      ...article,
      sort_order: index + 1,
    }));

    setListArticle(sortedArticles);
    setIsChangedSort(true);
  };

  const handlePostSortArticle = async () => {
    try {
      // Send updated sort order to the API
      const articles = listArticle.map(({ id, sort_order }) => ({
        id,
        sort_order,
      }));
      await putAdminSortArticleCourses(courseId, sectionId, articles);
      toast.success("Order updated successfully");
    } catch (error: any) {
      toast.error(`Failed to update order: ${error.message}`);
    }
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
              className={`${
                isChangedSort ? "block" : "hidden"
              } cursor-pointer flex items-center gap-2 bg-secondary1 text-white hover:bg-secondary2 focus:ring-secondary3 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300`}
            >
              <p>Ubah Urutan Article</p>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="articles">
            {(provided) => (
              <table
                className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead className="text-sm text-neutral2 bg-gray-100">
                  <tr>
                    <th className="w-6"></th>
                    <th scope="col" className="px-6 py-3 max-w-4">
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
                  {listArticle.map((article, index) => (
                    <Draggable
                      key={article.id}
                      draggableId={article.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          key={article.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="w-6 fill-neutral3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              className="block mx-auto"
                            >
                              <path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z" />
                            </svg>
                          </td>
                          <td className="px-6 py-4 max-w-4">{index + 1}</td>
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
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
            onClick={handlePostSortArticle}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ArticleKursusPage;
