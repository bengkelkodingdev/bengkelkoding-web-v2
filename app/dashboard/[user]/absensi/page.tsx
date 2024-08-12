"use client";
import ViewModalPDF from "@/app/component/general/ViewModalPDF";
import Modal from "@/app/component/general/Modal";
import PDFView from "@/app/component/general/PDFView";
import Keterangan from "@/app/component/general/Keterangan";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getAllAbsence,
  postUpdateStatusAbsence,
} from "@/app/api/admin/api-kelas/izin/API-Izin";
import Cookies from "js-cookie";
import { Absence } from "@/app/interface/Absence";

const HomeDashboardAbsensiPage = () => {
  const access_token = Cookies.get("access_token");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isKetModalOpen, setIsKetModalOpen] = useState(false);
  const [selectedMhsName, setSelectedMhsName] = useState<string | null>(null);
  const [selectedMhsNim, setSelectedMhsNim] = useState<string | null>(null);
  const [selectedMhsFile, setSelectedMhsFile] = useState<string | null>(null);
  // state api
  const [DataAbsence, setDataAbsence] = useState<Absence[]>();

  useEffect(() => {
    const fetchData = async () => {
      // get All data
      let response = await getAllAbsence(access_token);
      setDataAbsence(response.data);
    };
    fetchData();
  }, [access_token]);

  // update status
  const handleApprove = async (idClassroom: number, idAbsence: number) => {
    const note = prompt("Please enter the approval note:");
    if (note !== null) {
      try {
        const response = await postUpdateStatusAbsence(
          access_token,
          idClassroom,
          idAbsence,
          2, // Status 2 untuk "Approved"
          note
        );
        alert("Absence approved successfully!");
        // Optionally, update the state to reflect the changes in the UI
        setDataAbsence((prevData) =>
          prevData.map((izin) =>
            izin.id === idAbsence
              ? { ...izin, approve_status: 2, approve_note: note }
              : izin
          )
        );
      } catch (error) {
        console.error("Error approving absence:", error);
        alert("Failed to approve absence.");
      }
    }
  };

  const handleReject = async (idClassroom: number, idAbsence: number) => {
    const note = prompt("Please enter the rejection note:");
    if (note !== null) {
      try {
        const response = await postUpdateStatusAbsence(
          access_token,
          idClassroom,
          idAbsence,
          3, // Status 3 untuk "Rejected"
          note
        );
        alert("Absence rejected successfully!");
        // Optionally, update the state to reflect the changes in the UI
        setDataAbsence((prevData) =>
          prevData.map((izin) =>
            izin.id === idAbsence
              ? { ...izin, approve_status: 3, approve_note: note }
              : izin
          )
        );
      } catch (error) {
        console.error("Error rejecting absence:", error);
        alert("Failed to reject absence.");
      }
    }
  };

  const handleOpenViewModal = (name: string, nim: string, file: string) => {
    setSelectedMhsName(name);
    setSelectedMhsNim(nim);
    setSelectedMhsFile(file);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleOpenKetModal = () => {
    setIsKetModalOpen(true);
  };

  const handleCloseKetModal = () => {
    setIsKetModalOpen(false);
  };

  return (
    <>
      <div className=" overflow-x-auto">
        {/* Searching + Button */}
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center gap-5 pb-4">
          {/* Search */}
          <input
            type="text"
            id="table-search"
            className="block w-[200px] lg:w-[300px] p-2 pl-3 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
            placeholder="Cari Mahasiswa"
          />

          <Link
            href={`absensi/tolak`}
            className="box-tolak text-white w-[10%] p-1 rounded-md flex justify-center items-center bg-red-500 from-red-700 to-red-600 focus:ring-red-100"
          >
            <div>Ditolak</div>
          </Link>

          <Link
            href={`absensi/terima`}
            className="box-tolak text-white w-[10%] p-1 rounded-md flex justify-center items-center bg-green-500 from-green-700 to-green-600 focus:ring-red-100"
          >
            Diterima
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                MATA KULIAH
              </th>

              <th scope="col" className="px-6 py-3">
                Pertemuan
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Permohonan
              </th>
              <th scope="col" className="px-6 py-3">
                Keterangan
              </th>
              <th scope="col" className="px-6 py-3">
                File
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {DataAbsence &&
              DataAbsence.map((izin) => (
                <tr
                  key={izin.id}
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
                  <th scope="row" className="px-6 py-4 whitespace-nowrap ">
                    <div className="text-xs flex flex-col gap-1">
                      <p className="font-medium text-neutral2">
                        {izin.student?.name}
                      </p>
                      <p className="font-normal text-xs">
                        {izin.student?.identity_code}
                      </p>
                    </div>
                  </th>
                  <td className="px-6 py-4">{izin.presence?.classroom_name}</td>

                  <td className="px-6 py-4">Pertemuan {izin.presence.id}</td>
                  <td className="px-6 py-4">
                    {izin.approve_changed_at_formatted}
                  </td>
                  <td className="px-6 py-4">{izin.notes}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`${izin.attachment}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenViewModal(
                          izin.student?.name || "",
                          izin.student?.identity_code || "",
                          izin.attachment || ""
                        );
                      }}
                      className="text-gray-500 gap-2 bg-gray-50 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
                    >
                      <svg
                        fill="none"
                        aria-hidden="true"
                        className="w-5 h-5 flex-shrink-0"
                        viewBox="0 0 20 21"
                      >
                        <g clip-path="url(#clip0_3173_1381)">
                          <path
                            fill="#E2E5E7"
                            d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"
                          />
                          <path
                            fill="#B0B7BD"
                            d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"
                          />
                          <path
                            fill="#CAD1D8"
                            d="M18.774 9.25l-3.75-3.75h3.75v3.75z"
                          />
                          <path
                            fill="#F15642"
                            d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"
                          />
                          <path
                            fill="#fff"
                            d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"
                          />
                          <path
                            fill="#CAD1D8"
                            d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"
                          />
                        </g>
                      </svg>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          handleApprove(izin.presence?.id, izin.id)
                        }
                        className="block bg-green-500 p-1 rounded-md fill-white hover:bg-green-600 transition-all ease-in-out duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                        >
                          <path
                            d="M0 0h24v24H0V0zm0 0h24v24H0V0z"
                            fill="none"
                          />
                          <path d="M13.12 2.06 7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11.01zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z" />
                        </svg>
                      </button>
                      <Link
                        href={"/"}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenKetModal();
                        }}
                        className="block bg-red2 p-1 rounded-md fill-white hover:bg-red1 transition-all ease-in-out duration-150"
                      >
                        <span className="sr-only">EditFormKelas</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                        >
                          <path
                            d="M0 0h24v24H0V0zm0 0h24v24H0V0z"
                            fill="none"
                          />
                          <path d="m10.88 21.94 5.53-5.54c.37-.37.58-.88.58-1.41V5c0-1.1-.9-2-2-2H6c-.8 0-1.52.48-1.83 1.21L.91 11.82C.06 13.8 1.51 16 3.66 16h5.65l-.95 4.58c-.1.5.05 1.01.41 1.37.59.58 1.53.58 2.11-.01zM21 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

            {/* {DataAbsence && DataAbsence.absence && DataAbsence.absence.map((absence) => (
            
            {DataAbsence?.absence.map((absence) => {
              return (
                <div key={absence}>
                  <p>{absence.student.name}</p>
                </div>
              );
            })}
            <p>a</p>
            
            
            
            {/* {Array.from({ length: 1 }).map((_, index) => (
             
            ))} */}
          </tbody>
        </table>

        <ViewModalPDF
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          mhsName={selectedMhsName}
          mhsNim={selectedMhsNim}
          mhsFile={selectedMhsFile}
        >
          <PDFView />
        </ViewModalPDF>
        <Modal
          title="Keterangan"
          isOpen={isKetModalOpen}
          onClose={handleCloseKetModal}
        >
          <Keterangan />
        </Modal>

        {/* pagination */}
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
      </div>{" "}
    </>
  );
};

export default HomeDashboardAbsensiPage;
