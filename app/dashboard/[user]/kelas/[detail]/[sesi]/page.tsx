"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useState } from "react";
import Modal from "@/app/component/general/Modal";

import Keterangan from "@/app/component/general/Keterangan";
import { detailSesi, Student } from "@/app/interface/DetailSesi";

import Cookies from "js-cookie";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  postUpdateStatusAbsenceAdmin,
  postUpdateStatusAbsenceAssistant,
  postUpdateStatusAbsenceLecture,
} from "@/app/api/absence";
import {
  getDetailQrSessionAdmin,
  getDetailQrSessionAssistant,
  getDetailQrSessionLecture,
  getGenerateQrAdmin,
  getGenerateQrAssistant,
  getGenerateQrLecture,
  postManualPresenceAdmin,
  postManualPresenceAssistant,
  postManualPresenceLecture,
} from "@/app/api/presensi";

const DetailKelasPageSesi = () => {
  // const router = useRouter();
  const params = useParams();
  const sesi = params.sesi;
  const detail = params.detail;

  const access_token = Cookies.get("access_token");
  const role_user = Cookies.get("user_role");

  // state qr
  const [qrText, setQrText] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(60);

  const [detailClassRoom, setdetailClassRoom] = useState<detailSesi>();
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk menangani kesalahan

  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // izin modal
  const [keterangan, setKeterangan] = useState("");
  const [selectedIdClassroom, setSelectedIdClassroom] = useState<number | null>(
    null
  );
  const [selectedIdAbsence, setSelectedIdAbsence] = useState<number | null>(
    null
  );
  const [approvalAction, setApprovalAction] = useState<
    "approve" | "reject" | null
  >(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isKetModalOpen, setIsKetModalOpen] = useState(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  // modal open
  const openModalForApproval = (idClassroom: number, idAbsence: number) => {
    setSelectedIdClassroom(idClassroom);
    setSelectedIdAbsence(idAbsence);
    setApprovalAction("approve");
    setIsKetModalOpen(true);
  };

  const openModalForRejection = (idClassroom: number, idAbsence: number) => {
    setSelectedIdClassroom(idClassroom);
    setSelectedIdAbsence(idAbsence);
    setApprovalAction("reject");
    setIsKetModalOpen(true);
  };

  // save keterangan izin
  const handleSaveKeterangan = async () => {
    if (
      selectedIdClassroom !== null &&
      selectedIdAbsence !== null &&
      approvalAction !== null
    ) {
      const status = approvalAction === "approve" ? 2 : 3;
      const actionText = approvalAction === "approve" ? "Diterima" : "Ditolak";

      try {
        if (role_user == "superadmin" || role_user == "admin") {
          const response = await postUpdateStatusAbsenceAdmin(
            selectedIdClassroom,
            selectedIdAbsence,
            status, // Status 2 for "Approved" and 3 for "Rejected"
            keterangan
          );
          toast.success(`Absen Mahasiswa ${actionText} 😁`);

          // mari dapatkan datanya lagi
          fetchDetailSession();

          setIsKetModalOpen(false);
        } else if (role_user == "lecture") {
          const response = await postUpdateStatusAbsenceLecture(
            selectedIdClassroom,
            selectedIdAbsence,
            status, // Status 2 for "Approved" and 3 for "Rejected"
            keterangan
          );
          toast.success(`Absen Mahasiswa ${actionText} 😁`);

          // mari dapatkan datanya lagi
          fetchDetailSession();

          setIsKetModalOpen(false);
        } else if (role_user == "assistant") {
          const response = await postUpdateStatusAbsenceAssistant(
            selectedIdClassroom,
            selectedIdAbsence,
            status, // Status 2 for "Approved" and 3 for "Rejected"
            keterangan
          );
          toast.success(`Absen Mahasiswa ${actionText} 😁`);

          // mari dapatkan datanya lagi
          fetchDetailSession();

          setIsKetModalOpen(false);
        }
      } catch (error) {
        console.error(`Error ${actionText} absence:`, error);
        toast.error(`Absen Mahasiswa ${actionText} 😁`);
      }
    } else {
      console.error("Classroom ID, Absence ID, or Action is missing.");
    }
  };

  const handleCloseKetModal = () => {
    setIsKetModalOpen(false);
  };

  // end list izin confirm

  const handleSaveStatus = async (student: Student) => {
    const updatedStatus: Student = {
      ...student,
    };

    try {
      let updateData;
      if (role_user == "superadmin" || role_user == "admin") {
        updateData = await postManualPresenceAdmin(Number(sesi), updatedStatus);
        fetchDetailSession();
      } else if (role_user == "lecture") {
        updateData = await postManualPresenceLecture(
          Number(sesi),
          updatedStatus
        );
        fetchDetailSession();
      } else if (role_user == "assistant") {
        updateData = await postManualPresenceAssistant(
          Number(sesi),
          updatedStatus
        );
        fetchDetailSession();
      }
    } catch (error) {
      console.error("Gagal memperbarui data", error);
    }
  };

  const fetchDetailSession = useCallback(async () => {
    try {
      let presenceData;
      //  get detail session for qr
      if (typeof sesi !== "string") {
        throw new Error("sesi harus bertipe string");
      }

      if (role_user == "superadmin" || role_user == "admin") {
        presenceData = await getDetailQrSessionAdmin(parseInt(sesi));

        setdetailClassRoom(presenceData);
      } else if (role_user == "lecture") {
        presenceData = await getDetailQrSessionLecture(parseInt(sesi));
        setdetailClassRoom(presenceData);
      } else if (role_user == "assistant") {
        presenceData = await getDetailQrSessionAssistant(parseInt(sesi));
        setdetailClassRoom(presenceData);
      }
    } catch (error) {
      setError(error.message); // Tangani kesalahan yang terjadi dan set pesan kesalahan
    } finally {
      setLoading(false); // Set loading menjadi false setelah pengambilan data selesai
    }
  }, [sesi, role_user]);

  useEffect(() => {
    if (sesi && sesi.length > 0) {
      fetchDetailSession();
    }
  }, [sesi, fetchDetailSession]);

  // button generate qrcode
  const generateRandomText = async () => {
    try {
      if (typeof sesi !== "string") {
        throw new Error("sesi harus bertipe string");
      }

      if (role_user == "superadmin" || role_user == "admin") {
        const presenceQr = await getGenerateQrAdmin(sesi);
        setQrText(presenceQr.qr_code);
      } else if (role_user == "lecture") {
        const presenceQr = await getGenerateQrLecture(sesi);
        setQrText(presenceQr.qr_code);
      } else if (role_user == "assistant") {
        const presenceQr = await getGenerateQrAssistant(sesi);
        setQrText(presenceQr.qr_code);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  useEffect(() => {
    let qrTimeout;
    let countdownInterval;

    if (qrText) {
      setCountdown(60);

      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(countdownInterval);
            setShouldRefresh(true);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      qrTimeout = setTimeout(() => {
        setQrText("");
        clearInterval(countdownInterval);
        setShouldRefresh(true);
      }, 60000);
    }

    return () => {
      if (qrTimeout) clearTimeout(qrTimeout);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [qrText]);

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }
  }, [shouldRefresh]);

  if (loading) {
    return (
      <>
        <div className="flex flex-col w-full">
          <div className="flex flex-col lg:flex-row gap-4 justify-between w-full">
            {/* kiri */}
            <div className="up-left flex flex-col gap-2 lg:w-2/3">
              <div className="flex justify-between pb-4 mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse me-3"></div>
                  <div>
                    <h5 className="leading-none h-8 w-48 bg-gray-200 animate-pulse mb-2"></h5>
                    <p className="h-4 w-32 bg-gray-200 animate-pulse"></p>
                  </div>
                </div>
                <div>
                  <span className="h-6 w-24 bg-gray-200 animate-pulse inline-flex items-center px-2.5 py-1 rounded-md"></span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-2">
                <dl className="bg-gray-200 animate-pulse rounded-lg flex flex-col items-center justify-center h-[78px]"></dl>
                <dl className="bg-gray-200 animate-pulse rounded-lg flex flex-col items-center justify-center h-[78px]"></dl>
                <dl className="bg-gray-200 animate-pulse rounded-lg flex flex-col items-center justify-center h-[78px]"></dl>
              </div>
              <button className="w-1/4 mt-5 h-12 bg-gray-200 animate-pulse rounded-lg"></button>
            </div>
            {/* kanan */}
            <div className="up-right lg:w-1/3">
              <div className="canvas-qr">
                <div className="flex items-center justify-center border-2 border-gray-200 border-dashed h-[40vh] rounded-lg dark:border-gray-700">
                  <p className="h-12 w-32 bg-gray-200 animate-pulse"></p>
                </div>
              </div>
            </div>
          </div>

          <div className="list-mhs flex flex-col">
            <div className="search-compo flex justify-between py-3">
              <div className="search-key">
                <div className="relative ml-2">
                  <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                    <div className="w-5 h-5 bg-gray-200 animate-pulse"></div>
                  </div>
                  <input
                    type="text"
                    className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                    placeholder="Cari classRoom"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              <div className="left-belumabsen w-full lg:w-[70%]">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-3 border-2 border-gray-200 border-dashed">
                  <div className="text-center w-full flex justify-left">
                    <p className="h-4 w-3/12 bg-gray-200 animate-pulse mb-3"></p>
                  </div>
                  <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                    <thead className="text-sm text-neutral2 bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="w-4 p-4">
                            <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-48 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* list izin */}
              <div className="right-izin w-full lg:w-[30%]">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-3 border-2 border-gray-200 border-dashed">
                  <div className="text-center w-full flex justify-left">
                    <p className="h-4 w-3/12 bg-gray-200 animate-pulse mb-3"></p>
                  </div>
                  <table className="text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                    <thead className="text-sm text-neutral2 bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="w-4 p-4">
                            <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-48 bg-gray-200 animate-pulse"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  if (!detailClassRoom) {
    return <span>Data tidak tersedia</span>;
  }

  function countPresentStudents(students) {
    return students.filter((student) => student.is_present).length;
  }
  const presentCount = countPresentStudents(detailClassRoom.students);

  // 2024-07-15

  // test 2024-04-05
  // const today = new Date().toISOString().split("T")[0];
  const today = "2024-04-04";
  const isDateMatching = detailClassRoom.presence.presence_date === today;
  console.log("sesi sekarang", sesi);
  let count = 1;
  return (
    <>
      <div className=" flex flex-col w-full ">
        <div className="flex flex-col lg:flex-row gap-4 justify-between  w-full  ">
          {/* kiri */}
          <div className="up-left flex flex-col gap-2 lg:w-2/3">
            <div className="flex justify-between pb-4 mb-4  ">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center me-3">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 19"
                  >
                    <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                  </svg>
                </div>
                <div>
                  <h5 className="leading-none text-2xl font-bold text-gray-900 pb-1">
                    {detailClassRoom.presence.classroom_name}
                    {/* {detailClassRoom.} */}
                  </h5>
                  <p className="text-sm font-normal text-gray-500">
                    {detailClassRoom.presence.lecture.name}
                  </p>
                </div>
              </div>
              <div>
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 text-neutral5 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
                  Pertemuan {detailClassRoom.presence.week}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-2">
              <dl className="bg-gradient-to-r from-blue-700 to-blue-600 focus:ring-blue-100  rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-white fill-white bg-opacity-10 text-neutral5  text-sm font-medium flex items-center justify-center mb-1">
                  {detailClassRoom.presence.student_count}
                </dt>
                <dd className="text-neutral5 text-center text-xs md:text-sm font-medium">
                  Total Mahasiswa
                </dd>
              </dl>
              <dl className="bg-gradient-to-r from-red-700 to-red-600 focus:ring-red-100  rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-white fill-white bg-opacity-10 text-neutral5  text-sm font-medium flex items-center justify-center mb-1">
                  {
                    detailClassRoom.absence_students.filter(
                      (student) => student.approve_status === 2
                    ).length
                  }
                </dt>
                <dd className="text-neutral5  text-sm font-medium">Izin</dd>
              </dl>
              <dl className="bg-gradient-to-r from-orange-700 to-orange-600 focus:ring-orange-100  rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-white fill-white bg-opacity-10 text-neutral5  text-sm font-medium flex items-center justify-center mb-1">
                  {presentCount}
                </dt>
                <dd className="text-neutral5  text-sm font-medium">Hadir</dd>
              </dl>
            </div>
            <button
              onClick={isDateMatching ? generateRandomText : null}
              className={`btn-generate w-1/2 lg:w-1/3 mt-5 p-3 font-semibold text-white border-2 border-slate-200 
                ${
                  isDateMatching
                    ? "bg-gradient-to-r from-blue-700 to-blue-600 hover:bg-[#3263de]"
                    : "bg-gray-400 cursor-not-allowed"
                } 
                rounded-lg`}
              disabled={!isDateMatching}
            >
              {isDateMatching ? "Generate QR" : "Terkunci"}
            </button>
          </div>

          {/* kanan */}
          <div className="up-right lg:w-1/3">
            <div className="canvas-qr">
              <div className=" flex items-center justify-center border-2 border-gray-200 border-dashed h-[40vh] rounded-lg dark:border-gray-700">
                {/* <p>QR Code belum dihasilkan</p> */}
                {qrText ? (
                  <div className="w-full h-full  p-5 ">
                    <QRCodeSVG className="w-full h-full" value={qrText} />
                  </div>
                ) : (
                  <p>QR Code belum dihasilkan</p>
                )}
              </div>
              {qrText ? (
                <p className="pt-5 text-center">
                  QR Code akan hilang dalam {countdown} detik
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="list-mhs flex flex-col ">
          <div className="search-compo flex justify-between py-3">
            {/* <p className="font-semi text-2xl">List</p> */}
            <div className="search-key">
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
                  placeholder="Cari classRoom"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-wrap-reverse lg:flex-row gap-2">
            {/* List Mhs */}
            <div className="left-belumabsen w-full lg:w-[70%]">
              <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-3 border-2 border-gray-200 border-dashed">
                <div className="text-center w-full flex justify-left ">
                  <p className="bg-yellow-200 p-1 w-3/12 rounded-lg mb-3 ">
                    List mhs
                  </p>
                </div>

                {isMobile ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {detailClassRoom.students.map((listMhs, index) => (
                      <div
                        key={listMhs.id}
                        className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="flex justify-between items-center mb-4">
                          {/* No */}
                          <div className="text-gray-600 font-semibold">
                            No: {index + 1}
                          </div>
                        </div>

                        {/* Nama */}
                        <div className="flex flex-col ">
                          <p className="font-medium text-lg  text-neutral2">
                            {listMhs.name}
                          </p>
                          <div className=" w-full flex  items-center py-1 gap-2">
                            <p className="font-normal text-neutral2 text-sm">
                              {" "}
                              {listMhs.identity_code}
                            </p>

                            {/* Status */}
                            <div className="">
                              {listMhs.is_present ? (
                                <p className="inline-block text-sm rounded-full px-4 py-1 text-green-700 bg-green-100 font-medium">
                                  Hadir
                                </p>
                              ) : (
                                <p className="inline-block text-sm rounded-full px-4 py-2 text-red-700 bg-red-100 font-medium">
                                  Tidak Hadir
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Aksi */}
                        <div className="mt-4 flex justify-end items-center">
                          {listMhs.is_present ? (
                            <div className="flex gap-2">
                              <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all ease-in-out duration-150 cursor-pointer">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#4B5563"
                                >
                                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveStatus(listMhs)}
                                className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-all ease-in-out duration-150"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#10B981"
                                >
                                  <path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg ">
                      <thead className="text-sm text-neutral2 bg-gray-100 rounded">
                        <tr>
                          <th scope="col" className="p-4">
                            No
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nama
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nim
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailClassRoom.students.map((listMhs) => (
                          <tr
                            key={listMhs.id}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="w-4 p-4">{count++}</td>
                            <th
                              scope="row"
                              className="px-6 py-4 whitespace-nowrap "
                            >
                              <div className="text-xs flex flex-col gap-1">
                                <p className="font-medium text-neutral2">
                                  {listMhs.name}
                                </p>
                              </div>
                            </th>
                            <td className="px-6 py-4">
                              {listMhs.identity_code}
                            </td>

                            <td className="px-6 py-4">
                              {listMhs.is_present ? (
                                <p className="w-max text-sm rounded-xl px-4 text-green-600 bg-green-100">
                                  Hadir
                                </p>
                              ) : (
                                <p className="w-max text-sm rounded-xl px-4 text-red-600 bg-red-100">
                                  Tidak Hadir
                                </p>
                              )}
                            </td>

                            <td className="px-6 py-4">
                              {listMhs.is_present ? (
                                <div className="flex gap-1">
                                  <div className="block bg-neutral3 p-1 rounded-md fill-white transition-all ease-in-out duration-150">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="24px"
                                      viewBox="0 -960 960 960"
                                      width="24px"
                                      fill="#e8eaed"
                                    >
                                      <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                                    </svg>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleSaveStatus(listMhs)}
                                    className="block bg-green2 p-1 rounded-md fill-white "
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="24px"
                                      viewBox="0 -960 960 960"
                                      width="24px"
                                    >
                                      <path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-start pt-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-neutral3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">1-10</span> of{" "}
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

            {/* list izin */}

            <div className="right-izin w-full md:w-1/2 lg:w-[25%]">
              <div className="flex flex-col lg:flex-row flex-wrap space-y-4 md:space-y-0 p-3 border-2 border-gray-200 border-dashed">
                <div className="text-center w-auto  flex justify-left ">
                  <p className="bg-yellow-200 p-1 px-4 w-auto rounded-lg mb-3 ">
                    List Izin
                  </p>
                </div>

                {/* card izin */}
                <div className="text-sm  text-left rtl:text-right text-neutral3 rounded-lg ">
                  <div className="flex flex-col gap-2">
                    {detailClassRoom.absence_students.map((absen, index) => (
                      <div
                        key={absen.id}
                        className="bg-slate-100 p-3 rounded-md border-b hover:bg-gray-50"
                      >
                        <div className="text-xs flex flex-col gap-1">
                          <p className="font-medium text-neutral2">
                            {absen.name}
                          </p>
                          <div className="flex items-center flex-wrap py-1 gap-2">
                            <p className="font-normal text-sm">
                              {" "}
                              {absen.identity_code}
                            </p>
                            {absen.approve_status === 2 ? (
                              <p className="text-xs rounded-xl px-4 py-1 text-green-600 bg-green-100">
                                Diterima
                              </p>
                            ) : absen.approve_status === 3 ? (
                              <p className="text-xs text-center rounded-xl px-4 py-1 text-red-600 bg-red-100">
                                Ditolak
                              </p>
                            ) : (
                              <p className="text-xs text-center rounded-xl px-4 py-1 text-yellow-600 bg-yellow-100">
                                Menunggu
                              </p>
                            )}
                          </div>
                          <div className="flex gap-3 items-center">
                            <Link
                              href={absen.attachment ? absen.attachment : "#"}
                            >
                              File
                            </Link>
                            <button
                              onClick={() =>
                                openModalForApproval(Number(sesi), absen.id)
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
                            <button
                              onClick={() =>
                                openModalForRejection(Number(sesi), absen.id)
                              }
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
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* IZIN PERLU DI PERBAIKI */}

              <Modal
                title="Keterangan"
                isOpen={isKetModalOpen}
                onClose={handleCloseKetModal}
              >
                <Keterangan
                  setKeterangan={setKeterangan}
                  onSave={handleSaveKeterangan}
                />{" "}
              </Modal>
            </div>

            {/* --- */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DetailKelasPageSesi;
