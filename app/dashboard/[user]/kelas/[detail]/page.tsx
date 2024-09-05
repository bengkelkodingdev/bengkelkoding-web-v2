"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "@/app/component/general/Modal";
import EditForm from "@/app/component/general/EditForm";

import { usePathname } from "next/navigation";
import {
  Assignment,
  ClassInformation,
  ClassroomData,
  Presence,
} from "@/app/interface/Kelas";
import {
  getDetailClassroom,
  getDetailClassroomLecture,
} from "@/app/api/admin/api-kelas/getDetail-kelas";

import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Cookies from "js-cookie";
import {
  updatePresenceAdmin,
  updatePresenceLecture,
} from "@/app/api/admin/api-kelas/presensi/updatePresence";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteAssigmentAdmin,
  getAssigmentAdmin,
} from "@/app/api/admin/api-kelas/tugas/API-Assgiment";
import EditFormInfo from "@/app/component/general/EditFormInfo";
import {
  deleteInformationAdmin,
  postInformationAdmin,
  updateInformationAdmin,
} from "@/app/api/admin/api-kelas/informasi/API-Information";
import PostFormInfo from "@/app/component/general/PostFormInfo";

const DashboardDetailKelasPage = () => {
  const url = usePathname();
  const parts = url.split("/");
  const role_user = Cookies.get("user_role");
  const access = Cookies.get("access_token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Presence | null>(null);
  const [selectedInformation, setSelectedInformation] =
    useState<ClassInformation | null>(null);

  const [kelas, setKelas] = useState<ClassroomData[]>([]);
  const [tugas, setTugas] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState("informasi");

  const { dayNameStart, timeStart, dateStart } = formatDateStart();
  const { dayNameEnd, timeEnd, dateEnd } = formatDateEnd();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  // PASTIKAN DIHAPUS
  // const today = new Date().toISOString().split("T")[0];
  const today = "2024-04-04";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sections = [
    { id: "pertemuan", label: "Pertemuan" },
    { id: "mahasiswa", label: "Mahasiswa" },
    { id: "tugas", label: "Tugas" },
    { id: "kursus", label: "Kursus" },
    { id: "informasi", label: "Informasi" },
  ];

  const chartOptions: ApexCharts.ApexOptions = {
    series: [
      {
        // ganti kelas
        name: "Kehadiran",
        data: kelas.flatMap((kelasItem) =>
          kelasItem.presences.map((presence) =>
            presence.attendance_count !== 0 ? presence.attendance_count : null
          )
        ),
      },
    ],
    chart: {
      height: 180,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      // ganti kelas
      categories: kelas.flatMap((kelasItem) =>
        kelasItem.presences.map((presence) => `Pertemuan ${presence.week}`)
      ),
    },
  };

  // modal --
  const handleOpenModal = (presence: Presence) => {
    setSelectedMeeting(presence);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleOpenModalInfo = (information?: ClassInformation) => {
    if (information) {
      // Jika ada parameter, gunakan untuk mengedit
      setSelectedInformation(information);
    } else {
      // Jika tidak ada parameter, buat objek baru
      const newInformation = { title: "", description: "", id: null };
      setSelectedInformation(newInformation);
    }
    setIsModalOpen(true); // Buka modal
  };

  const handleCloseModalInfo = () => {
    setIsModalOpen(false);
    setSelectedInformation(null);
  };

  const handleSaveMeeting = async (updatedMeeting: Presence) => {
    let updatedData;
    try {
      const presences = kelas.flatMap((item) => item.presences);

      const duplicatePresence = presences.find(
        (presence) =>
          presence.presence_date === updatedMeeting.presence_date &&
          presence.id !== updatedMeeting.id
      );

      if (duplicatePresence) {
        toast.error(
          `Tanggal pertemuan telah digunakan pada pertemuan week ${duplicatePresence.week}`
        );
        return;
      }

      if (role_user === "superadmin" || role_user === "admin") {
        updatedData = await updatePresenceAdmin(
          updatedMeeting.id,
          updatedMeeting.presence_date
        );
      } else if (role_user === "lecture" || role_user === "assistant") {
        updatedData = await updatePresenceLecture(
          updatedMeeting.id,
          updatedMeeting.presence_date
        );
      }

      handleCloseModal();
      fetchClassrooms();
      toast.success(`Tanggal berhasil dirubah 😁`);
    } catch (error) {
      toast.error(`Tanggal gagal dirubah`, error);
    }
  };

  const handleSaveInfo = async (
    savedInfo: ClassInformation,
    idClassroom: number
  ) => {
    try {
      let response;
      if (role_user === "superadmin" || role_user === "admin") {
        response = await postInformationAdmin(
          idClassroom,
          savedInfo.title,
          savedInfo.description
        );
      }

      handleCloseModalInfo();
      fetchClassrooms(); // Memuat ulang data kelas setelah menyimpan
      toast.success(`Informasi berhasil ditambahkan😁`);
    } catch (error) {
      toast.error(`Gagal menambahkan informasi`, error);
    }
  };

  const handleUpdateInfo = async (
    savedInfo: ClassInformation,
    idClassroom: number,
    idInfo: number
  ) => {
    try {
      let response;
      if (role_user === "superadmin" || role_user === "admin") {
        response = await updateInformationAdmin(
          idClassroom,
          idInfo,
          savedInfo.title,
          savedInfo.description,
          access
        );
      }

      handleCloseModalInfo();
      fetchClassrooms(); // Memuat ulang data kelas setelah menyimpan
      toast.success(`Informasi berhasil diperbarui 😁`);
    } catch (error) {
      toast.error(`Gagal memperbarui informasi`, error);
    }
  };

  const handleDeleteInfo = async (idClassroom, idInfo) => {
    try {
      await deleteInformationAdmin(idClassroom, idInfo, access);
      toast.success(`Berhasil menghapus tugas 😁`);
      fetchClassrooms();
    } catch (error) {
      console.error("Gagal menghapus tugas:", error);
      toast.error(`Gagal menghapus tugas`);
    }
  };

  const handleDelete = async (idClassroom, idAssignment) => {
    try {
      await deleteAssigmentAdmin(idClassroom, idAssignment);
      toast.success(`Berhasil menghapus tugas 😁`);
      fetchClassrooms();
    } catch (error) {
      console.error("Gagal menghapus tugas:", error);
      toast.error(`Gagal menghapus tugas`);
    }
  };

  // end modal --

  const fetchClassrooms = async () => {
    try {
      let getClassroomDetails, getAssignments;

      if (role_user === "superadmin" || role_user === "admin") {
        getClassroomDetails = getDetailClassroom(parts[4]);
        getAssignments = getAssigmentAdmin(parts[4]);
      } else if (role_user === "lecture" || role_user === "assistant") {
        getClassroomDetails = getDetailClassroomLecture(parts[4]);

        // KALO UDAH ADA APINYA PERLU GANTI
        // getAssignments = getAssigmentLecture(parts[4]);
      }

      // const [response] = await Promise.all([getClassroomDetails]);

      const [response, responseAssigment] = await Promise.all([
        getClassroomDetails,
        getAssignments,
      ]);

      const formatData = (data) => {
        if (Array.isArray(data)) {
          return data;
        } else if (data && typeof data === "object") {
          return [data]; // Convert single object to array
        } else {
          throw new Error("Unexpected response format");
        }
      };

      setKelas(formatData(response.data));
      // KALO UDAH ADA APINYA PERLU GANTI
      setTugas(formatData(responseAssigment.data));
    } catch (error) {
      setError("Failed to fetch classrooms");
    } finally {
      setLoading(false);
    }
  };

  function formatDateStart() {
    let time;
    tugas.map((tugasItem, index = 0) => {
      time = tugasItem.start_time;
    });
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const date = new Date(time);
    const dayNameStart = days[date.getDay()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return {
      dayNameStart,
      timeStart: `${hours}:${minutes}`,
      dateStart: `${day}-${month}-${year}`,
    };
  }

  function formatDateEnd() {
    let time;
    tugas.map((tugasItem, index = 0) => {
      time = tugasItem.deadline;
    });
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const date = new Date(time);
    const dayNameEnd = days[date.getDay()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return {
      dayNameEnd,
      timeEnd: `${hours}:${minutes}`,
      dateEnd: `${day}-${month}-${year}`,
    };
  }

  useEffect(() => {
    fetchClassrooms();
  }, []);

  function isValidURL(url: string): boolean {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // Protocol
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // Domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // Port and path
        "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // Query string
        "(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    );
    return urlPattern.test(url);
  }

  if (loading)
    return (
      <div>
        <h1 className="h-8 w-3/4 bg-gray-200 animate-pulse mb-4"></h1>

        <div className="flex flex-col lg:flex-row gap-6 2xl:gap-10">
          <div className="w-full">
            <div className="grid grid-cols-2 lg:flex items-center gap-x-2 md:gap-5 text-xs text-neutral2">
              <p className="h-4 w-1/4 bg-gray-200 animate-pulse"></p>
              <p className="h-4 w-1/4 bg-gray-200 animate-pulse"></p>
              <p className="h-4 w-1/4 bg-gray-200 animate-pulse"></p>
              <p className="h-4 w-1/4 bg-gray-200 animate-pulse"></p>
            </div>
            <p className="mt-4 h-4 w-full bg-gray-200 animate-pulse"></p>
          </div>
          <table className="min-w-max text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
            <thead className=" text-neutral2 bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 w-max">
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 w-max">
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <article className=" mx-auto">
          {/* Navigasi untuk management active section */}
          <nav className="flex">
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                className="w-max px-4 py-2 font-medium rounded-t-md transition-all ease-in-out duration-200 bg-gray-200 animate-pulse"
              >
                &nbsp;
              </button>
            ))}
          </nav>

          <section
            id="group-content"
            className="px-2 lg:px-4 py-4 w-full bg-slate-50 rounded-b-lg rounded-tr-lg"
          >
            {/* Pertemuan */}
            <div id="pertemuan" className="mx-auto">
              {/*Pertemuan */}
              <div className="flex flex-col gap-3 Box-Pertemuan">
                <div className="flex gap-5 flex-col-reverse md:flex-col-reverse lg:flex-row ">
                  {/* list */}
                  <div className="lg:w-[70%] shadow-md px-2 rounded-md">
                    <div id="chart">
                      <p className="p-2 h-4 w-1/4 bg-gray-200 animate-pulse"></p>
                      <div className="h-36 bg-gray-200 animate-pulse"></div>
                    </div>
                  </div>
                  {/* kontrak pertemuan */}
                  <div className="lg:w-[30%]">
                    <table className="w-full shadow-sm text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                      <thead className="text-sm text-neutral2 bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 w-max">
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                          </th>
                          <th scope="col" className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 w-max">
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                          </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                          </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="shadow-md">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                    <thead className="text-neutral2 bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
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

                          <td className="px-6 py-3">
                            <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-3">
                            <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-3">
                            <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-3 w-36">
                            <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-3">
                            <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mahasiswa */}
            <div id="mahasiswa" className="mx-auto">
              <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                <thead className="text-sm text-neutral2 bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tugas */}
            <div id="tugas" className="mx-auto mt-4">
              <h3 className="font-semibold mb-3 h-4 w-1/4 bg-gray-200 animate-pulse"></h3>
              <div className="flex w-full justify-between items-center">
                <div className="relative ml-2">
                  <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                    placeholder="Cari Tugas"
                  />
                </div>
                <div className="w-max bg-gray-200 animate-pulse text-white hover:bg-primary2 focus:ring-primary5 px-3 py-2 lg:px-3 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300">
                  &nbsp;
                </div>
              </div>
              <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden mt-5 ">
                <thead className="text-sm text-neutral2 bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
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
                      <td className="px-6 py-4 font-semibold">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Kursus */}
            <div id="kursus" className="mx-auto">
              {/* list kursus */}
              <div className="col-span-2">
                <div className="flex flex-col gap-2">
                  {/* list kursus */}
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row rounded-md overflow-hidden border border-gray-200 hover:shadow-[rgba(7,_65,_210,_0.1)_0px_6px_10px] transition-all ease-out duration-200 cursor-pointer"
                    >
                      <div className="h-36 w-48 bg-gray-200 animate-pulse"></div>
                      <div className="py-3 px-4 w-full">
                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-gray-200 animate-pulse mt-2"></div>
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    );

  if (error) return <p>Kelas Tidak ditemukan</p>;

  return (
    <>
      {kelas.map((kelasItem) => (
        <div>
          <h1 className="text-3xl mb-2 sm:mb-4 sm:text-5xl">
            {kelasItem.classroom.name}
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 2xl:gap-10">
            <div className="w-full">
              <div className="grid grid-cols-2 lg:flex items-center gap-x-2 md:gap-5 text-xs text-neutral2">
                <p>
                  Hari:{" "}
                  <strong className="font-semibold text-primary1">
                    {kelasItem.classroom.day}
                  </strong>
                </p>
                <p>
                  Jam:{" "}
                  <strong className="font-semibold text-primary1">
                    {kelasItem.classroom.time_start} -{" "}
                    {kelasItem.classroom.time_end} WIB
                  </strong>
                </p>
                <p>
                  Dosen:{" "}
                  <strong className="font-semibold text-primary1">
                    {kelasItem.classroom.lecture}
                  </strong>
                </p>
                <p>
                  Kuota:{" "}
                  <strong className="font-semibold text-primary1">
                    {kelasItem.classroom.quota}
                  </strong>
                </p>
              </div>
              <p className="mt-4 text-neutral2">
                {kelasItem.classroom.description}
              </p>
            </div>
            <table className="min-w-max text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
              <thead className=" text-neutral2 bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 w-max">
                    Kontrak Kuliah
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 w-max">Presentase UTS</td>
                  <td className="px-6 py-4">
                    {kelasItem.classroom.uts_percent}
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">Presentase UAS</td>
                  <td className="px-6 py-4">
                    {kelasItem.classroom.uas_percent}
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">Presentase Tugas</td>
                  <td className="px-6 py-4">
                    {kelasItem.classroom.task_percent}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <article className="mt-4 mx-auto">
            {/* Navigasi untuk management active section */}

            <nav className="flex border-t py-3">
              {isMobile ? (
                <select
                  value={activeSection}
                  onChange={(e) => setActiveSection(e.target.value)}
                  className="w-max px-4 mt-3 py-2 font-medium rounded-md transition-all ease-in-out duration-200 bg-slate-50 text-primary1"
                >
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.label}
                    </option>
                  ))}
                </select>
              ) : (
                sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-max px-4 py-2 font-medium rounded-t-md transition-all ease-in-out duration-200 ${
                      activeSection === section.id
                        ? "bg-slate-50 text-primary1"
                        : "bg-gray-100 text-black hover:bg-slate-50 hover:text-primary1"
                    }`}
                  >
                    {section.label}
                  </button>
                ))
              )}
            </nav>

            <section
              id="group-content"
              className="px-2 lg:px-4 py-4 w-full bg-slate-50 rounded-b-lg rounded-tr-lg"
            >
              {/* Pertemuan */}
              {activeSection === "pertemuan" && (
                <div id="pertemuan" className="mx-auto">
                  {/*Pertemuan */}
                  <div className="flex flex-col gap-3 Box-Pertemuan">
                    <div className="flex gap-5 flex-col-reverse md:flex-col-reverse lg:flex-row ">
                      {/* list */}
                      <div className="lg:w-[70%] shadow-md px-2 rounded-md">
                        <div id="chart">
                          <p className="p-2">Statistik Kehadiran</p>
                          {kelas.length > 0 && (
                            <ReactApexChart
                              options={chartOptions}
                              series={chartOptions.series}
                              type="line"
                              height={180}
                            />
                          )}
                        </div>
                      </div>
                      {/* kontrak pertemuan */}
                      <div className="lg:w-[30%]  ">
                        <table className="w-full shadow-sm text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                          <thead className="text-sm text-neutral2 bg-gray-100">
                            <tr>
                              <th scope="col" className="px-6 py-3 w-max">
                                Kontrak Pertemuan
                              </th>
                              <th scope="col" className="px-6 py-3"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4 w-max">Maksimal Izin</td>
                              <td className="px-6 py-4">
                                {kelasItem.classroom.max_absent}
                              </td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4">Jumlah pertemuan</td>
                              <td className="px-6 py-4">
                                {kelasItem.presences.length}
                              </td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4">Pertemuan dimulai</td>
                              <td className="px-6 py-4">
                                {kelasItem.presences[0].presence_date_formatted}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* sesi pertemuan */}
                    <div className="shadow-md">
                      {isMobile ? (
                        <>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {kelasItem.presences.map((presence) => (
                              <div
                                key={presence.id}
                                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:bg-gray-100 transition-all ease-in-out duration-150"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-semibold">
                                    Pertemuan {presence.week}
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold">
                                      {today === presence.presence_date ? (
                                        <span className="ml-2 text-green-500 font-bold">
                                          aktif
                                        </span>
                                      ) : (
                                        <span className="ml-2 text-red-500 font-bold">
                                          Belum waktunya
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 text-xs font-semibold">
                                  Tanggal: {presence.presence_date_formatted}
                                </div>
                                <div className="mt-1 text-xs">
                                  Ruang: {kelasItem.classroom.room}
                                </div>
                                <div className=" flex items-center justify-between mt-5">
                                  <Link
                                    className=" flex items-center justify-center w-1/2  h-10 gap-4 text-center text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
                                    href={`${kelasItem.classroom.id}/${presence.id}`}
                                  >
                                    <p>Masuk</p>
                                  </Link>
                                  <div className="flex items-center justify-end gap-2">
                                    <Link
                                      href={`/edit/${presence.week}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleOpenModal(presence);
                                      }}
                                      className="p-2 bg-yellow2 rounded-full hover:bg-yellow1 transition-all ease-in-out duration-150"
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
                                      href={`/delete/${presence.id}`}
                                      className="p-2 bg-red2 rounded-full hover:bg-red1 transition-all ease-in-out duration-150"
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
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                            <thead className="text-neutral2 bg-gray-100">
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
                                  Sesi Pertemuan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Tanggal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Ruang
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
                              {kelasItem.presences.map((presence, index) => (
                                <tr
                                  key={presence.id}
                                  className="bg-white border-b hover:bg-gray-100"
                                >
                                  <td className="w-4 p-4">
                                    <div className="flex items-center">
                                      <input
                                        id={`checkbox-table-search-${index}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                      />
                                      <label className="sr-only">
                                        checkbox
                                      </label>
                                    </div>
                                  </td>

                                  <td className="px-6 py-3 text-sm font-semibold">
                                    Pertemuan {presence.week}
                                  </td>
                                  <td className="px-6 py-3">
                                    <p className="text-xs font-semibold">
                                      {presence.presence_date_formatted}
                                    </p>
                                  </td>
                                  <td className="px-6 py-3 text-xs">
                                    {kelasItem.classroom.room}
                                  </td>
                                  <td className="px-6 py-3 w-36">
                                    <span className="flex justify-center items-center text-xs font-medium w-full h-[2rem] rounded-full text-center  text-blue-800 bg-blue-100">
                                      <Link
                                        className="flex items-center justify-center text-center"
                                        href={`${kelasItem.classroom.id}/${presence.id}`}
                                      >
                                        Masuk
                                      </Link>
                                    </span>
                                  </td>
                                  <td className="px-6 py-3">
                                    <div className="flex gap-1">
                                      <Link
                                        href={`/edit/${presence.week}`}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleOpenModal(presence);
                                        }}
                                        className="block bg-yellow2 p-1 rounded-md fill-white hover:bg-yellow1 transition-all ease-in-out duration-150"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          height="18px"
                                          viewBox="0 0 24 24"
                                          width="18px"
                                        >
                                          <path
                                            d="M0 0h24v24H0V0z"
                                            fill="none"
                                          />
                                          <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                        </svg>
                                      </Link>
                                      <Link
                                        href={`/delete/${presence.id}`}
                                        className="block bg-red2 p-1 rounded-md fill-white hover:bg-red1 transition-all ease-in-out duration-150"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          height="18px"
                                          viewBox="0 0 24 24"
                                          width="18px"
                                        >
                                          <path
                                            d="M0 0h24v24H0V0z"
                                            fill="none"
                                          />
                                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
                                        </svg>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>

                    <Modal
                      title="Pertemuan"
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                    >
                      {selectedMeeting && (
                        <EditForm
                          user={selectedMeeting}
                          onSave={handleSaveMeeting}
                        />
                      )}
                    </Modal>
                  </div>
                </div>
              )}

              {/* Mahasiswa */}
              {activeSection === "mahasiswa" && (
                <div id="mahasiswa" className="mx-auto">
                  {isMobile ? (
                    <div className="overflow-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                        <thead className="text-sm text-neutral2 bg-gray-100">
                          <tr>
                            <th scope="col" className="p-2">
                              No
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Nama
                            </th>

                            <th scope="col" className="px-6 py-3">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {kelas.flatMap((kelasItem) =>
                            kelasItem.students.map((student, index) => (
                              <tr
                                key={student.id}
                                className="bg-white border-b hover:bg-gray-50"
                              >
                                <td className="p-2 text-center">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-xs flex flex-col gap-1">
                                    <p className="font-medium text-neutral2">
                                      {student.name}
                                    </p>
                                    <p className="font-normal text-neutral2">
                                      {student.identity_code}
                                    </p>
                                    <p className="font-normal text-neutral2">
                                      Semester {student.semester}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-6 py-4">
                                  <div className="flex gap-1">
                                    <button className="block bg-yellow-200 p-1 rounded-md fill-white hover:bg-yellow-100 transition-all ease-in-out duration-150">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="18px"
                                        viewBox="0 0 24 24"
                                        width="18px"
                                      >
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                      <thead className="text-sm text-neutral2 bg-gray-100">
                        <tr>
                          <th scope="col" className="p-4">
                            <div className="flex items-center">No</div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nama
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nim
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {kelas.flatMap((kelasItem) =>
                          kelasItem.students.map((student, index) => (
                            <tr
                              key={student.id}
                              className="bg-white border-b hover:bg-gray-50"
                            >
                              <td className="w-4 p-4">
                                <div className="flex items-center">
                                  {index + 1}
                                </div>
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap">
                                <div className="text-xs flex flex-col gap-1">
                                  <p className="font-medium text-neutral2">
                                    {student.name}
                                  </p>
                                  <p className="font-normal text-neutral2">
                                    Semester {student.semester}
                                  </p>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {student.identity_code}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-1">
                                  <button className="block bg-yellow-200 p-1 rounded-md fill-white hover:bg-yellow-100 transition-all ease-in-out duration-150">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="18px"
                                      viewBox="0 0 24 24"
                                      width="18px"
                                    >
                                      <path d="M0 0h24v24H0V0z" fill="none" />
                                      <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Tugas */}
              {activeSection === "tugas" && (
                <div id="tugas" className="mx-auto mt-4">
                  {/* list Tugas */}
                  <h3 className="font-semibold mb-3">Tabel Penugasan</h3>
                  <div className="flex flex-col sm:flex-row sm:row gap-2  w-full justify-between items-center">
                    {/* <div className="relative ml-2">
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
                        placeholder="Cari Tugas"
                      />
                    </div> */}
                    {/* Search */}
                    <div className=" w-auto flex ">
                      <input
                        type="text"
                        id="table-search"
                        className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                        placeholder="Cari kelas"

                        // onChange={(e) => setSearchTerm(e.target.value)}
                      />

                      <button className="ml-2 px-4 py-2 bg-primary1 text-white rounded-md">
                        Search
                      </button>
                    </div>

                    <Link
                      href={{
                        pathname: `${kelasItem.classroom.id}/tambah-tugas`,
                        query: {
                          idClassroom: `${kelasItem.classroom.id}`,
                        },
                      }}
                      className="w-max bg-white border border-blue-600 hover:text-white hover:bg-primary2 focus:ring-primary5 px-5 py-2 lg:px-3 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration- mb-3"
                    >
                      + Tambah Tugas
                    </Link>
                  </div>
                  {isMobile ? (
                    <>
                      {" "}
                      {tugas.map((tugasItem, index) => (
                        <div
                          key={tugasItem.id}
                          className="bg-white rounded-lg shadow-md p-4 mt-2"
                        >
                          <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <h3 className="text-base font-semibold">
                              {tugasItem.title}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                              {tugasItem.type}
                            </span>
                          </div>
                          {/* waktu */}
                          <div className="flex justify-between items-center text-xs mb-2">
                            {/* start */}
                            <div className="mulai flex gap-2 items-center text-green-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 -960 960 960"
                                width="20px"
                                className="fill-green-700"
                              >
                                <path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z" />
                              </svg>
                              <div className="detail-time">
                                <div>
                                  {dayNameStart} - {timeStart}
                                </div>
                                <div className="font-semibold">{dateStart}</div>
                              </div>
                            </div>
                            <div className="h-5 w-[1px] rounded-full bg-slate-500 mx-4 "></div>
                            {/* end */}
                            <div className="selesai flex gap-2 items-center text-red-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 -960 960 960"
                                width="20px"
                                className="fill-red-700"
                              >
                                <path d="M480-516q65 0 110.5-45.5T636-672v-120H324v120q0 65 45.5 110.5T480-516ZM192-96v-72h60v-120q0-59 28-109.5t78-82.5q-49-32-77.5-82.5T252-672v-120h-60v-72h576v72h-60v120q0 59-28.5 109.5T602-480q50 32 78 82.5T708-288v120h60v72H192Z" />
                              </svg>
                              <div className="detail-time">
                                <div>
                                  {dayNameStart} - {timeStart}
                                </div>
                                <div className="font-semibold">{dateStart}</div>
                              </div>
                            </div>
                          </div>
                          {/* deskripsi */}
                          <div className="text-xs mb-2">
                            <p className="text-justify my-3">
                              {tugasItem.description}
                            </p>
                          </div>

                          {/* detail terkumpul + file */}
                          <div className="flex gap-2">
                            <div className="flex justify-center items-center text-xs w-full rounded-md bg-neutral-100">
                              <p>
                                {tugasItem.student.total_submitted} /{" "}
                                {tugasItem.student.student_need_to_submit}
                              </p>
                            </div>
                            <div className="w-full flex items-center justify-center py-2 rounded-md bg-blue-100">
                              {tugasItem.file == null ? (
                                <p>Tidak ada file</p>
                              ) : (
                                <a
                                  href={tugasItem.file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#2014c8"
                                  >
                                    <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-center items-center gap-4 mt-3">
                            <Link
                              href={{
                                pathname: `${kelasItem.classroom.id}/tambah-tugas`,
                                query: {
                                  idClassroom: kelasItem.classroom.id,
                                  idAssignment: tugasItem.id,
                                },
                              }}
                              className="bg-yellow2 p-1 rounded-md fill-white hover:bg-yellow1 transition-all ease-in-out duration-150"
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
                                handleDelete(
                                  kelasItem.classroom.id,
                                  tugasItem.id
                                )
                              }
                              className="bg-red2 p-1 rounded-md fill-white hover:bg-red1 transition-all ease-in-out duration-150"
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
                            <Link
                              href={`${kelasItem.classroom.id}/penilaian/${tugasItem.id}`}
                              className="bg-green-800 p-1 rounded-md fill-white hover:bg-green-700 transition-all ease-in-out duration-150"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="18px"
                                viewBox="0 -960 960 960"
                                width="18px"
                                fill="#F3F3F3"
                              >
                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm80-160h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790Z" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {" "}
                      <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden mt-5 ">
                        <thead className="text-sm text-neutral2 bg-gray-100">
                          <tr className="text-center">
                            <th scope="col" className="p-4">
                              No
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Nama Tugas
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                              Deskripsi
                            </th>
                            <th scope="col" className="px-6 py-3 text-center ">
                              Tanggal Mulai
                            </th>
                            <th scope="col" className="px-6 py-3 text-center ">
                              Tanggal Selesai
                            </th>
                            <th scope="col" className="px-6 py-3">
                              File
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Jenis
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Terkumpul
                            </th>

                            <th scope="col" className="px-6 py-3">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tugas.length === 0 ? (
                            <tr>
                              <td
                                colSpan={9}
                                className="px-6 py-4 text-center "
                              >
                                Tidak ada tugas diberikan
                              </td>
                            </tr>
                          ) : (
                            tugas.map((tugasItem, index = 0) => {
                              return (
                                <tr
                                  key={tugasItem.id}
                                  className="bg-white border-b hover:bg-gray-50"
                                >
                                  <td className="w-4 p-4">{index + 1}</td>
                                  <td className="px-6 py-4 font-semibold">
                                    {tugasItem.title}
                                  </td>
                                  <td className="px-6 py-4">
                                    {tugasItem.description}
                                  </td>
                                  <td className="px-2 py-4  text-center">
                                    <div>
                                      {dayNameStart} - {timeStart}
                                    </div>
                                    <div className="font-semibold">
                                      {dateStart}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4  text-center">
                                    <div>
                                      {dayNameEnd} - {timeEnd}
                                    </div>
                                    <div className="font-semibold">
                                      {dateEnd}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    {/* "file": null, jika tidak null maka tugasItem.file */}
                                    {tugasItem.file == null ? (
                                      <p>Tidak ada file</p>
                                    ) : (
                                      <a href={tugasItem.file}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          height="24px"
                                          viewBox="0 -960 960 960"
                                          width="24px"
                                          fill="#2014c8"
                                        >
                                          <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
                                        </svg>
                                      </a>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 ">
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded   ms-3">
                                      {tugasItem.type}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-center font-semibold">
                                    {tugasItem.student.total_submitted} /{" "}
                                    {tugasItem.student.student_need_to_submit}
                                  </td>

                                  <td className="px-6 py-4">
                                    <div className="flex gap-1">
                                      {/* edit */}
                                      <Link
                                        href={{
                                          pathname: `${kelasItem.classroom.id}/tambah-tugas`, // atau halaman yang sesuai jika berbeda
                                          query: {
                                            idClassroom: kelasItem.classroom.id,
                                            idAssignment: tugasItem.id, // Parameter untuk mode edit
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
                                          <path
                                            d="M0 0h24v24H0V0z"
                                            fill="none"
                                          />
                                          <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                        </svg>
                                      </Link>
                                      {/* delete */}
                                      <button
                                        onClick={() =>
                                          handleDelete(
                                            kelasItem.classroom.id,
                                            tugasItem.id
                                          )
                                        }
                                        className="block bg-red2 p-1 rounded-md fill-white hover:bg-red1 transition-all ease-in-out duration-150"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          height="18px"
                                          viewBox="0 0 24 24"
                                          width="18px"
                                        >
                                          <path
                                            d="M0 0h24v24H0V0z"
                                            fill="none"
                                          />
                                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
                                        </svg>
                                      </button>
                                      <span className="block bg-green-800 p-1 rounded-md fill-white hover:bg-green-700 transition-all ease-in-out duration-150">
                                        <Link
                                          href={`${kelasItem.classroom.id}/penilaian/${tugasItem.id}`}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="18px"
                                            viewBox="0 -960 960 960"
                                            width="18px"
                                            fill="#F3F3F3"
                                          >
                                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm80-160h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790Z" />
                                          </svg>
                                        </Link>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              )}

              {/* Kursus */}
              {activeSection === "kursus" && (
                <div id="kursus" className="mx-auto">
                  {/* list kursus */}
                  <div className="col-span-2">
                    <div className="flex flex-col gap-2">
                      {/* list kursus */}
                      {kelasItem.courses.map((courses, index) => (
                        <div
                          key={index}
                          className="flex flex-col md:flex-row rounded-md overflow-hidden border border-gray-200 hover:shadow-[rgba(7,_65,_210,_0.1)_0px_6px_10px] transition-all ease-out duration-200 cursor-pointer"
                        >
                          <Image
                            src={`${courses.image}`}
                            alt={""}
                            width={180}
                            height={140}
                            loading="lazy"
                            className="w-full lg:w-1/2 object-cover "
                          />
                          <div className="py-3 px-4">
                            <h4 className="text-primary1 font-medium">
                              {courses.title}
                            </h4>
                            <p className="text-neutral3 text-sm">
                              {courses.author}
                            </p>
                            <p className="text-neutral2 text-sm mt-2">
                              {courses.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Informasi Kelas */}
              {activeSection === "informasi" && (
                <div id="informasi" className="mx-auto">
                  <h3 className="font-semibold mb-3">List Informasi</h3>

                  <div className="flex gap-2 flex-column sm:flex-row flex-wrap items-center justify-between pb-4">
                    {/* Search */}
                    <div className=" w-auto flex flex-wrap ">
                      <input
                        type="text"
                        id="table-search"
                        className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                        placeholder="Cari kelas"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        // onChange={handleInputChange}
                      />

                      <button
                        // onClick={handleSearch}
                        className="ml-2 px-4 py-2 bg-primary1 text-white rounded-md"
                      >
                        Search
                      </button>
                    </div>
                    <Link
                      href={"#"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModalInfo();
                      }}
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
                      <p>Tambah Informasi</p>
                    </Link>
                  </div>

                  {/* list informasi */}
                  <div className=" mt-4">
                    <div className="flex flex-col gap-2">
                      {/* detail informasi */}
                      {kelasItem.class_informations.map((informasi, index) => (
                        <div
                          key={index}
                          className="w-full flex flex-col lg:flex-row justify-between items-center rounded-md border border-gray-200 hover:shadow-lg transition-all ease-out duration-200 cursor-pointer"
                        >
                          <div className="flex flex-col w-full">
                            <div className="iconInfo lg:hidden items-center flex  p-2  rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="34px"
                                viewBox="0 -960 960 960"
                                width="34px"
                                className="fill-primary2"
                              >
                                <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                              </svg>
                            </div>
                            {/* card */}
                            <div className="detailInformasi h-auto flex w-full   gap-2">
                              {/* icon */}
                              <div className="iconInfo lg:flex items-center hidden justify-center p-2  rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="34px"
                                  viewBox="0 -960 960 960"
                                  width="34px"
                                  className="fill-primary2"
                                >
                                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                                </svg>
                              </div>

                              {/* info */}
                              <div className="info-content w-full px-4 rounded-md">
                                {/* judul */}
                                <h4 className="text-primary1 font-medium text-sm rounded-md p-1">
                                  {informasi.title}
                                </h4>
                                {/* descrip */}
                                {isValidURL(informasi.description) ? (
                                  <Link
                                    href={`${informasi.description}`}
                                    target="_blank"
                                  >
                                    <p className="text-primary2 text-sm mt-2 break-words">
                                      {informasi.description}
                                    </p>
                                  </Link>
                                ) : (
                                  <p className="text-neutral2 text-sm mt-2">
                                    {informasi.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Aksi buttons */}
                          <div className="aksi w-full justify-end lg:w-auto flex gap-2 p-2 sm:p-4">
                            {/* edit */}
                            <Link
                              href={`/edit/${informasi.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleOpenModalInfo(informasi);
                              }}
                              className="bg-yellow-400 p-2 rounded-md hover:bg-yellow-500 transition-all ease-in-out duration-150"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="18px"
                                viewBox="0 0 24 24"
                                width="18px"
                                className="fill-white"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                              </svg>
                            </Link>

                            {/* delete */}
                            <button
                              onClick={() =>
                                handleDeleteInfo(
                                  kelasItem.classroom.id,
                                  informasi.id
                                )
                              }
                              className="bg-red-400 p-2 rounded-md hover:bg-red-500 transition-all ease-in-out duration-150"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="18px"
                                viewBox="0 0 24 24"
                                width="18px"
                                className="fill-white"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Modal
                      title={
                        selectedInformation?.id ? "Update Info" : "Tambah Info"
                      }
                      isOpen={isModalOpen}
                      onClose={handleCloseModalInfo}
                    >
                      {selectedInformation &&
                        (selectedInformation.id ? (
                          <EditFormInfo
                            user={selectedInformation}
                            onSave={(updatedInfo) =>
                              handleUpdateInfo(
                                updatedInfo,
                                kelasItem.classroom.id,
                                selectedInformation.id
                              )
                            }
                          />
                        ) : (
                          <PostFormInfo
                            user={selectedInformation}
                            onSave={(newInfo) =>
                              handleSaveInfo(newInfo, kelasItem.classroom.id)
                            }
                          />
                        ))}
                    </Modal>
                  </div>
                </div>
              )}
            </section>
          </article>
          <ToastContainer />
        </div>
      ))}
    </>
  );
};

export default DashboardDetailKelasPage;
