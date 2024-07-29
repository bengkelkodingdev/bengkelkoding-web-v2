"use client";
import { getAllClassroom } from "@/app/api/api-kelas/getAll-kelas";
import { Kelas } from "@/app/interface/Kelas";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "@/app/component/general/Modal";
import EditFormKelas from "@/app/component/general/EditFormKelas";

const HomeDashboardKelasPage = () => {
  // const router = useRouter();
  // const { user } = router.query;
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await getAllClassroom();
        setKelas(response.data);
      } catch (error) {
        setError("Failed to fetch classrooms");
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);
  console.log("tes:", kelas);

  if (loading)
    return (
      <>
        <div className="relative overflow-x-auto">
          {/* Searching + Button */}
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            {/* Search */}
            <div className="relative ml-2">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <div className="w-5 h-5 bg-gray-200 animate-pulse"></div>
              </div>
              <input
                type="text"
                className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                placeholder="Cari kelas"
                disabled
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-200 animate-pulse w-32 h-10 rounded-lg"></div>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
            <thead className="text-sm text-neutral2 bg-gray-100">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </th>
                {Array.from({ length: 9 }).map((_, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </td>
                  {Array.from({ length: 9 }).map((_, subIndex) => (
                    <td key={subIndex} className="px-6 py-4">
                      <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-neutral3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span className="font-semibold text-gray-900">1-10</span> of{" "}
            <span className="font-semibold text-gray-900">1000</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <div className="flex items-center justify-center px-3 h-8 bg-gray-200 animate-pulse rounded-s-lg w-24"></div>
            </li>
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <div className="flex items-center justify-center px-3 h-8 bg-gray-200 animate-pulse w-8"></div>
              </li>
            ))}
            <li>
              <div className="flex items-center justify-center px-3 h-8 bg-gray-200 animate-pulse rounded-e-lg w-24"></div>
            </li>
          </ul>
        </nav>
      </>
    );
  if (error) return <p>{error}</p>;
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
              className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
              placeholder="Cari kelas"
            />
          </div>
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
            <p>Kelas</p>
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
            {kelas.map((classroom) => {
              return (
                <tr
                  key={classroom.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
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
                  {classroom.student_count > 0 ? (
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
                      <Link
                        href={"/"}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenModal();
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

                      <Modal
                        title="Kelas"
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                      >
                        <EditFormKelas />
                      </Modal>

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
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-neutral3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900">1-10</span> of{" "}
          <span className="font-semibold text-gray-900">1000</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral3 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-neutral2"
            >
              Sebelumnya
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-neutral2"
            >
              Selanjutnya
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HomeDashboardKelasPage;
