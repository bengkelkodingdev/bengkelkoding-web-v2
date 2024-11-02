"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "@/app/component/general/PaginationCustom";
import Modal from "@/app/component/general/Modal";
import Button from "@/app/component/general/Button";
import {
  deleteAdminLerningPath,
  getAdminListLearningPath,
} from "@/app/api/admin/learning-path";
import { LearningPathResponse } from "@/app/interface/dashboard/admin/LearningPath";
import Image from "next/image";

const HomeDashboardLearningPathPage = () => {
  const access_token = Cookies.get("access_token");
  const role_user = Cookies.get("user_role");

  const [listLearningPath, setListLearningPath] =
    useState<LearningPathResponse>();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const fetchData = useCallback(async () => {
    if (!access_token) {
      throw new Error("Access token not found");
    }
    try {
      let response;
      if (role_user && (role_user === "superadmin" || role_user === "admin")) {
        response = await getAdminListLearningPath(
          searchTerm,
          currentPage,
          itemsPerPage
        );
      }

      if (response) {
        setListLearningPath(response);
        setTotalPages(response.meta.pagination.total_pages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [role_user, searchTerm, access_token, currentPage, itemsPerPage]);

  // useEffect untuk memanggil fetchData setiap kali searchTerm berubah
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Jalankan fetchData saat searchTerm berubah

  const [learningPathId, setLearningPathId] = useState(0);
  const [learningPathName, setLearningPathName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (
    learningPathId: number,
    learningPathName: string
  ) => {
    setLearningPathId(learningPathId);
    setLearningPathName(learningPathName);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteAdminLerningPath(learningPathId);
      toast.success(`Berhasil Menghapus Admin ${learningPathName} 😁`);
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to delete classroom", error);
      toast.error(`Gagal Menghapus Admin 😔: ${error.message}`);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <>
      <div className="overflow-x-auto max-w-7xl">
        {/* Searching + Button */}
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          {/* Search */}
          <label className="sr-only">Search</label>
          <div className="relative ml-2">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-neutral3"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              onChange={handleSearchChange}
              className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
              placeholder="Cari learning path"
            />
          </div>
          <Link
            href={"learning-path/tambah"}
            className="flex items-center gap-2 bg-primary1 text-white fill-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
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
            <p>Learning Path</p>
          </Link>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
          <thead className="text-sm text-neutral2 bg-gray-100">
            <tr>
              <th scope="col" className="w-4 p-4">
                <div className="flex items-center">No</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listLearningPath && listLearningPath.data ? (
              listLearningPath.data.map((learningPath, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">{index + 1}</div>
                  </td>
                  <td className="px-6">
                    <Image
                      src={learningPath.image}
                      alt={learningPath.name}
                      width={150}
                      height={96}
                      className="max-w-24 rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 min-w-48 font-semibold">
                    {learningPath.name}
                  </td>
                  <td className="px-6 py-4">{learningPath.description}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <Link
                        href={`learning-path/${learningPath.id}`}
                        className="block bg-blue2 p-1 rounded-md fill-white hover:bg-blue1 transition-all ease-in-out duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      </Link>
                      <Link
                        href={`learning-path/${learningPath.id}/edit`}
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
                          handleOpenModal(learningPath.id, learningPath.name)
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  Loading data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Modal
        title="Hapus Learning Path"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="mt-4">
          <p className="mb-4 text-sm">
            Anda yakin ingin menghapus learning path <b>{learningPathName}</b>?
          </p>
          <Button
            text="Hapus Learning Path"
            className="w-full"
            onClick={handleDelete}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default HomeDashboardLearningPathPage;
