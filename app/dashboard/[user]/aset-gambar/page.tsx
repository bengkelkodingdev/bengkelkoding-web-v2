"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { ImageRespon, ImageSimple } from "@/app/interface/Image";
import { deleteImage, findImageData, getAllImage } from "@/app/api/imageAsset";
import Pagination from "@/app/component/general/PaginationCustom";
import Modal from "@/app/component/general/Modal";

const HomeDashboardAsetGambarPage = () => {
  const access_token = Cookies.get("access_token");
  const role_user = Cookies.get("user_role");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20; // Jumlah data per halaman

  const [DataImage, setDataImage] = useState<ImageRespon>();
  const [selectedImage, setSelectedImage] = useState<ImageSimple | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(index); // Track the copied image
        setTimeout(() => {
          setCopied(null); // Reset after 2 seconds
        }, 2000);
      })
      .catch((error) => console.error("Failed to copy", error));
  };

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
        response = await getAllImage(searchTerm, currentPage, itemsPerPage);
      }

      if (response) {
        setDataImage(response);
        setTotalPages(response.meta.pagination.total_pages); // Set total halaman dari meta pagination API
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [role_user, searchTerm, access_token, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleImageClick = async (id: number) => {
    try {
      const response = await findImageData(String(id));
      setSelectedImage(response.data); // Set the selected image
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null); // Clear the selected image
  };

  const handleDelete = async (idImage) => {
    try {
      await deleteImage(idImage, access_token);
      toast.success(`Berhasil menghapus image 😁`);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus tugas:", error);
      toast.error(`Gagal menghapus image`);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto">
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
              placeholder="Cari Gambar"
            />
          </div>
          <Link
            href={"aset-gambar/tambah"}
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
            <p>Gambar</p>
          </Link>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
          <thead className="text-sm text-neutral2 bg-gray-100">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Nama File
              </th>
              <th scope="col" className="px-6 py-3">
                Path
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {DataImage && DataImage.data ? (
              DataImage.data.map((listImage, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      src={`${listImage.full_url}`}
                      // src={"/img/kursus-image-1.png"}
                      alt="Aset Image"
                      width={96}
                      height={150}
                      className="max-w-24 rounded-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                      onClick={() => handleImageClick(listImage.id)}
                    />
                  </td>
                  <td scope="row" className="px-6 py-4 whitespace-nowrap ">
                    <div className="text-xs flex flex-col gap-1">
                      <p className="font-medium text-neutral2">
                        {listImage.title}
                      </p>
                      <p className="font-normal">{listImage.file}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{listImage.path_name}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {/* buatkan tombol utnuk copy nilai dari listImage.full_url */}

                      <button
                        className={`block bg-blue2 p-1 rounded-md fill-white transition-all ease-in-out duration-150 ${
                          copied === index ? "bg-green-500" : "hover:bg-blue1"
                        }`}
                        onClick={() => handleCopy(listImage.full_url, index)}
                        title={copied === index ? "Copied!" : "Copy URL"}
                      >
                        {copied === index ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 0 24 24"
                            width="20px"
                            fill="white"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.59l-3.3-3.3a.996.996 0 111.41-1.41L11 13.17l5.3-5.3a.996.996 0 111.41 1.41L11 16.59z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="white"
                          >
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" />
                          </svg>
                        )}
                      </button>
                      <Link
                        href={{
                          pathname: `aset-gambar/tambah`,
                          query: {
                            idImage: listImage.id,
                            status: "edit",
                          },
                        }}
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
                        onClick={() => handleDelete(listImage.id)}
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

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Modal to display larger image */}
      {selectedImage && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedImage.title}
        >
          <Image
            src={selectedImage.full_url}
            alt={selectedImage.title}
            width={500}
            height={500}
          />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};

export default HomeDashboardAsetGambarPage;
