"use client";
import {
  getAllClassroomAdmin,
  getAllClassroomLecture,
} from "@/app/api/admin/api-kelas/getAll-kelas";
import { Kelas } from "@/app/interface/Kelas";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "@/app/component/general/Modal";
import EditFormKelas from "@/app/component/general/EditFormKelas";

import Cookies from "js-cookie";
import SkletonListKelas from "@/app/component/skleton/SkletonListKelas";

const HomeDashboardKelasPage = () => {
  // token
  const role_user = Cookies.get("user_role");

  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [allClassrooms, setAllClassrooms] = useState<Kelas[]>([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState<Kelas[]>([]);
  // search feature
  const [searchTerm, setSearchTerm] = useState<string>("");
  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // mobile size
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchClassrooms = useCallback(
    async (page: number = 1, searchTerm: string = "") => {
      setLoading(true);
      try {
        let response;

        if (role_user === "superadmin" || role_user === "admin") {
          response = await getAllClassroomAdmin(searchTerm, page);
        } else if (role_user === "lecture" || role_user === "assistant") {
          response = await getAllClassroomLecture(searchTerm, page);
        }

        const data = response.data;
        setKelas(data); // Set state 'kelas' dengan hasil pencarian atau semua data
        setAllClassrooms(data); // Simpan data untuk referensi pencarian yang kosong
        setTotalPages(response.meta.pagination.total_pages);
      } catch (error) {
        setError("Failed to fetch classrooms");
      } finally {
        setLoading(false);
      }
    },
    [role_user]
  );

  const [isSearching, setIsSearching] = useState(false); // State untuk status pencarian

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log("Current search term:", value);
  };

  // const fetchClassrooms = useCallback(
  //   async (page = 1, search = "") => {
  //     setLoading(true);
  //     try {
  //       let response;
  //       if (role_user === "superadmin" || role_user === "admin") {
  //         response = await getAllClassroomAdmin(search, page);
  //       } else if (role_user === "lecture" || role_user === "assistant") {
  //         response = await getAllClassroomLecture(search, page);
  //       }
  //       const data = response.data;
  //       setAllClassrooms(data); // Simpan semua data asli
  //       setKelas(data); // Tampilkan data
  //       setTotalPages(response.meta.pagination.total_pages);
  //     } catch (error) {
  //       setError("Failed to fetch classrooms");
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [role_user]
  // );

  useEffect(() => {
    if (searchTerm === "") {
      // Fetch all data jika input kosong
      fetchClassrooms(currentPage);
      setIsSearching(false); // Reset status pencarian
    }
  }, [searchTerm, currentPage, fetchClassrooms]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1); // Reset ke halaman 1 setiap kali pencarian baru dilakukan
    setIsSearching(true); // Set status pencarian
    const filtered = allClassrooms.filter((classroom) =>
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setKelas(filtered); // Tampilkan hasil filter
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return SkletonListKelas();
  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="overflow-x-auto">
        {/* Searching + Button */}
        <div className="flex  flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          {/* Search */}
          <div className=" w-auto flex mb-5">
            <input
              type="text"
              id="table-search"
              className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
              placeholder="Cari kelas"
              value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={handleInputChange}
            />

            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-2 bg-primary1 text-white rounded-md"
            >
              Search
            </button>
          </div>
          {role_user == "superadmin" || role_user == "admin" ? (
            <Link
              href={"kelas/tambah"}
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
              <p>Tambah Kelas</p>
            </Link>
          ) : (
            <></>
          )}
        </div>

        {isMobile ? (
          <>
            <div className="grid grid-cols-1 gap-4">
              {kelas.map((classroom, index) => (
                <div
                  key={classroom.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between ">
                    <div className="infoDetail">
                      <h2 className="text-lg font-medium text-neutral2">
                        {classroom.name}
                      </h2>
                      <p className="text-sm font-medium text-neutral3">
                        {classroom.lecture}
                      </p>
                      <p className="text-sm text-neutral3">
                        {classroom.day} | {classroom.time_start} -{" "}
                        {classroom.time_end} | {classroom.room}
                      </p>
                    </div>

                    <div className="jmlMhs flex flex-col items-center w-11 h-11 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        className="fill-blue-500"
                      >
                        <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z" />
                      </svg>
                      <p className="text-xs text-neutral3">
                        {classroom.quota} / {classroom.student_count}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <Link
                      href={`kelas/${classroom.id}`}
                      className="flex items-center bg-blue2 p-2 rounded-md fill-white hover:bg-blue1 transition-all ease-in-out duration-150"
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

                    {role_user == "superadmin" || role_user == "admin" ? (
                      <>
                        <Link
                          href={{
                            pathname: `kelas/tambah`, // atau halaman yang sesuai jika berbeda
                            query: {
                              idClassroom: classroom.id,
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

                        <Link
                          href={"/"}
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
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Table */}
            <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
              <thead className="text-sm text-neutral2 bg-gray-100">
                <tr>
                  <th scope="col" className="text-center py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Kelas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dosen
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hari
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jam
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ruang
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kuota
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Terisi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {kelas.map((classroom, index) => {
                  return (
                    <tr
                      key={classroom.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="text-center w-4 p-4">{index + 1}</td>
                      <th scope="row" className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs flex flex-col gap-1">
                          <p className="font-medium text-neutral2">
                            {classroom.name}
                          </p>
                          <p className="font-normal text-sm text-neutral2">
                            {classroom.period}
                          </p>
                        </div>
                      </th>
                      <td className="px-6 py-4"> {classroom.lecture} </td>
                      <td className="px-6 py-4"> {classroom.day} </td>
                      <td className="px-6 py-4">
                        {" "}
                        {classroom.time_start} - {classroom.time_end}{" "}
                      </td>
                      <td className="px-6 py-4">{classroom.room}</td>
                      <td className="px-6 py-4">{classroom.quota}</td>
                      <td className="px-6 py-4">{classroom.student_count}</td>
                      {classroom.is_active == true ? (
                        <td className="px-6 py-4">aktif</td>
                      ) : (
                        <td className="px-6 py-4"> tidak aktif</td>
                      )}

                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <Link
                            href={`kelas/${classroom.id}`}
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
                          {/* tombol edit, gunakan aja query untuk href passing data id classroom ke edit */}
                          {role_user == "superadmin" || role_user == "admin" ? (
                            <>
                              <Link
                                href={{
                                  pathname: `kelas/tambah`, // atau halaman yang sesuai jika berbeda
                                  query: {
                                    idClassroom: classroom.id,
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

                              <Link
                                href={"/"}
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
                              </Link>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Pagination Controls */}
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-neutral3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {(currentPage - 1) * 10 + 1}-
            {Math.min(currentPage * 10, totalPages * 10)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">{totalPages * 10}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral3 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-neutral2 disabled:opacity-50"
            >
              Sebelumnya
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === index + 1
                    ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-neutral2 disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HomeDashboardKelasPage;
