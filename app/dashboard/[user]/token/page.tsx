"use client";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import Modal from "@/app/component/general/Modal";
import Link from "next/link";
import React, { useState } from "react";

const HomeDashboardTokenPage = () => {
  // Modal generate token
  const [isModalGenerateTokenOpen, setIsModalGenerateTokenOpen] =
    useState(false);
  const handleOpenModalGenerateToken = () => {
    setIsModalGenerateTokenOpen(true);
  };
  const handleCloseModalGenerateToken = () => {
    setIsModalGenerateTokenOpen(false);
  };
  // Modal export token
  const [isModalExportTokenOpen, setIsModalExportTokenOpen] = useState(false);
  const handleOpenModalExportToken = () => {
    setIsModalExportTokenOpen(true);
  };
  const handleCloseModalExportToken = () => {
    setIsModalExportTokenOpen(false);
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
              className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
              placeholder="Cari kategori"
            />
          </div>
          <div className="flex gap-2">
            <div>
              <p className="text-xs text-neutral2">Filter Status</p>
              <div className="flex gap-2">
                <select
                  className="p-2.5 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
                  name="isUsed"
                  id="isUsed"
                >
                  <option value="Semua">Semua</option>
                  <option value="Digunakan">Digunakan</option>
                  <option value="Belum Digunakan">Belum Digunakan</option>
                </select>
                <select
                  className="p-2.5 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
                  name="expired"
                  id="expired"
                >
                  <option value="Semua">Semua</option>
                  <option value="Kadaluarsa">Kadaluarsa</option>
                  <option value="Belum Kadaluarsa">Belum Kadaluarsa</option>
                </select>
              </div>
            </div>
            <div
              onClick={() => handleOpenModalGenerateToken()}
              className="cursor-pointer flex items-center gap-2 bg-primary1 text-white fill-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
              >
                <path d="M480-80 120-280v-400l360-200 360 200v400L480-80ZM364-590q23-24 53-37t63-13q33 0 63 13t53 37l120-67-236-131-236 131 120 67Zm76 396v-131q-54-14-87-57t-33-98q0-11 1-20.5t4-19.5l-125-70v263l240 133Zm40-206q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm40 206 240-133v-263l-125 70q3 10 4 19.5t1 20.5q0 55-33 98t-87 57v131Z" />
              </svg>
              <p>Generate Token</p>
            </div>
            <div
              onClick={() => handleOpenModalExportToken()}
              className="cursor-pointer flex items-center gap-2 bg-primary1 text-white fill-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
              >
                <path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z" />
              </svg>
              <p>Export Token</p>
            </div>
          </div>
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
                Token
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Aktif
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Kadaluarsa
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
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
                <td className="px-6 py-4 font-semibold">EBvCUZVh2x1</td>
                <td className="px-6 py-4">11 Maret 2024</td>
                <td className="px-6 py-4">20 Januari 2026</td>
                <td className="px-6 py-4 flex flex-col gap-1">
                  <p className="w-max px-4 rounded-sm text-green-600 bg-green-100">
                    Aktif
                  </p>
                  <p className="w-max px-4 rounded-sm text-red-600 bg-red-100">
                    Digunakan
                  </p>
                  {/* <p className="w-max px-4 rounded-sm text-red-600 bg-red-100">
                    Kadaluarsa
                  </p>
                  <p className="w-max px-4 rounded-sm text-red-600 bg-red-100">
                    Digunakan
                  </p> */}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    <Link
                      href={"/"}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </div>
      <Modal
        title="Generate Token"
        isOpen={isModalGenerateTokenOpen}
        onClose={handleCloseModalGenerateToken}
      >
        <div className="mt-4">
          <Input
            label=""
            type="number"
            name="token"
            placeholder="Masukkan Jumlah Token"
            required
            // onChange={(e) => setToken(e.target.value)}
          />
          <div className="flex justify-between">
            <Input
              label="Start Date"
              type="date"
              name="token"
              placeholder="Masukkan Jumlah Token"
              required
              // onChange={(e) => setToken(e.target.value)}
            />{" "}
            <Input
              label="End Date"
              type="date"
              name="token"
              placeholder="Masukkan Jumlah Token"
              required
              // onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <Button
            text="Generate Token"
            className="w-full"
            // onClick={handlePostActivateToken}
          />
        </div>
      </Modal>
      <Modal
        title="Export Token"
        isOpen={isModalExportTokenOpen}
        onClose={handleCloseModalExportToken}
      >
        <div className="mt-4">
          <div className="mb-4">
            <p className="text-xs text-neutral2">Filter Data</p>
            <div className="flex justify-between">
              <select
                className="p-2.5 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
                name="isUsed"
                id="isUsed"
              >
                <option value="Semua">Semua</option>
                <option value="Digunakan">Digunakan</option>
                <option value="Belum Digunakan">Belum Digunakan</option>
              </select>
              <select
                className="p-2.5 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
                name="expired"
                id="expired"
              >
                <option value="Semua">Semua</option>
                <option value="Kadaluarsa">Kadaluarsa</option>
                <option value="Belum Kadaluarsa">Belum Kadaluarsa</option>
              </select>
            </div>
          </div>
          <Button
            text="Export Token"
            className="w-full"
            // onClick={handlePostActivateToken}
          />
        </div>
      </Modal>
    </>
  );
};

export default HomeDashboardTokenPage;
