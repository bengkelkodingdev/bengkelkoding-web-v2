"use client";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import Modal from "@/app/component/general/Modal";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { Tokens } from "@/app/interface/Tokens";
import {
  getExportTokens,
  getListTokens,
  postGenerateToken,
} from "@/app/api/admin/token";
import Pagination from "@/app/component/general/PaginationCustom";
import { formatDate } from "@/app/lib/formatDate";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { saveAs } from "file-saver";

const HomeDashboardTokenPage = () => {
  const access_token = Cookies.get("access_token");
  const role_user = Cookies.get("user_role");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

  const [listTokens, setListTokens] = useState<Tokens>();

  const [used, setUsed] = useState("");
  const [expired, setExpired] = useState("");

  const [totalToken, setTotalToken] = useState(0);
  const [startDateToken, setStartDateToken] = useState("");
  const [endDateToken, setEndDateToken] = useState("");

  // Fetch token data
  const fetchData = useCallback(async () => {
    if (!access_token) {
      throw new Error("Access token not found");
    }
    try {
      let response;
      if (role_user && (role_user === "superadmin" || role_user === "admin")) {
        response = await getListTokens(
          used,
          expired,
          currentPage,
          itemsPerPage
        );
      }

      if (response) {
        setListTokens(response);
        setTotalPages(response.meta.pagination.total_pages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [used, expired, role_user, access_token, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  // Copy token
  const [copied, setCopied] = useState<number | null>(null);
  const handleCopy = (url: string, index: number) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(index);
        setTimeout(() => {
          setCopied(null);
        }, 2000);
      })
      .catch((error) => console.error("Failed to copy", error));
  };

  // Handle post generate token
  const handlePostGenerateToken = async () => {
    try {
      const response = await postGenerateToken(
        totalToken,
        startDateToken,
        endDateToken
      );

      // Success handling
      toast.success("Berhasil Generate Token");
      setIsModalGenerateTokenOpen(false);
    } catch (error) {
      // Log error and show toast message
      console.error("Failed to generate token", error);
      toast.error("Gagal Generate Token");
    }
  };

  // Handle export token
  const handleExportToken = async () => {
    try {
      const response = await getExportTokens(used, expired);
      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "activate_tokens.xlsx");
    } catch (error) {
      // Log error and show toast message
      console.error("Failed to export token", error);
      toast.error("Gagal Export Token");
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          {/* Filter Status */}
          <div className="ml-2">
            <p className="text-xs text-neutral2">Filter Status</p>
            <div className="flex gap-2 mt-1">
              <select
                className="py-1.5 px-2 bg-white border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
                name="isUsed"
                id="isUsed"
                onChange={(e) => setUsed(e.target.value)}
              >
                <option value="">Semua</option>
                <option value="true">Digunakan</option>
                <option value="false">Belum Digunakan</option>
              </select>
              <select
                className="py-1.5 px-2 bg-white border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
                name="expired"
                id="expired"
                onChange={(e) => setExpired(e.target.value)}
              >
                <option value="">Semua</option>
                <option value="true">Kadaluarsa</option>
                <option value="false">Belum Kadaluarsa</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
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
            {listTokens && listTokens.data ? (
              listTokens.data.map((token, index) => (
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
                  <td className="px-6 py-4 font-semibold">{token.token}</td>
                  <td className="px-6 py-4">{formatDate(token.started)}</td>
                  <td className="px-6 py-4">{formatDate(token.expired)}</td>
                  <td className="px-6 py-4 flex flex-col gap-1">
                    {token.is_expired ? (
                      <p className="w-max px-4 rounded-sm text-red-600 bg-red-100">
                        Kadaluarsa
                      </p>
                    ) : (
                      <p className="w-max px-4 rounded-sm text-green-600 bg-green-100">
                        Aktif
                      </p>
                    )}
                    {token.is_used ? (
                      <p className="w-max px-4 rounded-sm text-red-600 bg-red-100">
                        Digunakan
                      </p>
                    ) : (
                      <p className="w-max px-4 rounded-sm text-green-600 bg-green-100">
                        Tidak Digunakan
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button
                        className={`block bg-blue2 p-1 rounded-md fill-white transition-all ease-in-out duration-150 ${
                          copied === index ? "bg-green-500" : "hover:bg-blue1"
                        }`}
                        onClick={() => handleCopy(token.token, index)}
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
                      {/* <Link
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
                      </Link> */}
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
            min={1}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value >= 1) {
                setTotalToken(value);
              } else {
                setTotalToken(1);
              }
            }}
          />
          <Input
            label="Start Date"
            type="datetime-local"
            name="startDate"
            placeholder="Masukkan Waktu Aktif"
            required
            onChange={(e) => setStartDateToken(e.target.value)}
          />{" "}
          <Input
            label="End Date"
            type="datetime-local"
            name="endDate"
            placeholder="Masukkan Waktu Expired"
            required
            onChange={(e) => setEndDateToken(e.target.value)}
          />
          <Button
            text="Generate Token"
            className="w-full"
            onClick={handlePostGenerateToken}
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
            <div className="flex justify-between mt-1">
              <select
                className="py-1.5 px-2 bg-white border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
                name="isUsed"
                id="isUsed"
                onChange={(e) => setUsed(e.target.value)}
              >
                <option value="">Semua</option>
                <option value="true">Digunakan</option>
                <option value="false">Belum Digunakan</option>
              </select>
              <select
                className="py-1.5 px-2 bg-white border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
                name="expired"
                id="expired"
                onChange={(e) => setExpired(e.target.value)}
              >
                <option value="">Semua</option>
                <option value="true">Kadaluarsa</option>
                <option value="false">Belum Kadaluarsa</option>
              </select>
            </div>
          </div>
          <Button
            text="Export Token"
            className="w-full"
            onClick={handleExportToken}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default HomeDashboardTokenPage;
