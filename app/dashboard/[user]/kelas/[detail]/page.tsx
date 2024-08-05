"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import meetings, { Meeting } from "./data";
import Modal from "@/app/component/general/Modal";
import EditForm from "@/app/component/general/EditForm";
import { useRouter } from "next/router";
import { useParams } from "react-router-dom";
import { usePathname } from "next/navigation";
import {
  Assignment,
  AssignmentResponse,
  ClassroomData,
  Kelas,
  Presence,
} from "@/app/interface/Kelas";
import { getDetailClassroom } from "@/app/api/admin/api-kelas/getDetail-kelas";
import StatusLabel from "@/app/component/kelas/StatusSesi";
import { getAssigment } from "@/app/api/admin/api-kelas/tugas/getAll-Assigment";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

//

const DashboardDetailKelasPage = () => {
  const url = usePathname();
  const parts = url.split("/");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Presence | null>(null);

  // modal --

  const handleOpenModal = (presence: Presence) => {
    setSelectedMeeting(presence);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleSaveMeeting = (updatedMeeting: Presence) => {
    handleCloseModal();
  };

  // end modal --

  const [kelas, setKelas] = useState<ClassroomData[]>([]);
  const [tugas, setTugas] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await getDetailClassroom(parts[4]);
        const responseAssigment = await getAssigment(parts[4]);

        // Check if response.data is an object, convert to array if necessary
        if (Array.isArray(response.data)) {
          setKelas(response.data);
        } else if (response.data && typeof response.data === "object") {
          setKelas([response.data]); // Convert single object to array
        } else {
          throw new Error("Unexpected response format");
        }

        // --- assigment
        if (Array.isArray(responseAssigment.data)) {
          setTugas(responseAssigment.data);
        } else if (
          responseAssigment.data &&
          typeof responseAssigment.data === "object"
        ) {
          setTugas([responseAssigment.data]); // Convert single object to array
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch classrooms");
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  const [activeSection, setActiveSection] = useState("pertemuan");

  const sections = [
    { id: "pertemuan", label: "Pertemuan" },
    { id: "mahasiswa", label: "Mahasiswa" },
    { id: "tugas", label: "Tugas" },
    { id: "kursus", label: "Kursus" },
  ];

  // contoh

  const contoh1 = [
    {
      presences: [
        { week: 1, attendance_count: 10 },
        { week: 2, attendance_count: 15 },
        { week: 3, attendance_count: 12 },
        { week: 4, attendance_count: 20 },
        { week: 5, attendance_count: 12 },
      ],
    },
  ];

  // -- end contoh

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
  const { dayNameStart, timeStart, dateStart } = formatDateStart();
  const { dayNameEnd, timeEnd, dateEnd } = formatDateEnd();

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
          <h1>{kelasItem.classroom.name}</h1>

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

          <article className=" mx-auto">
            {/* Navigasi untuk management active section */}
            <nav className="flex">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-max px-4 py-2 font-medium rounded-t-md transition-all ease-in-out duration-200 ${
                    activeSection === section.id
                      ? "bg-slate-50  text-primary1"
                      : "bg-gray-100 text-black hover:bg-slate-50  hover:text-primary1"
                  }`}
                >
                  {section.label}
                </button>
              ))}
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
                      <div className="lg:w-[30%] ">
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
                    <div className="shadow-md">
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
                                  <label className="sr-only">checkbox</label>
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

                                {/* <StatusLabel
                                  presence={presence}
                                  kelas={kelasItem}
                                  index={presence.id}
                                /> */}
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
                                      <path d="M0 0h24v24H0V0z" fill="none" />
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
                        kelasItem.students.map((student) => (
                          <tr
                            key={student.id}
                            className="bg-white border-b hover:bg-gray-50"
                          >
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  id={`checkbox-table-search-${student.id}`}
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label className="sr-only">checkbox</label>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
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
                </div>
              )}

              {/* Tugas */}
              {activeSection === "tugas" && (
                <div id="tugas" className="mx-auto mt-4">
                  {/* list Tugas */}
                  <h3 className="font-semibold mb-3">Tabel Penugasan</h3>
                  <div className="flex  w-full justify-between items-center">
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
                        placeholder="Cari Tugas"
                      />
                    </div>
                    <Link
                      href={`${kelasItem.classroom.id}/tambah-tugas`}
                      className="w-max bg-primary1 text-white hover:bg-primary2 focus:ring-primary5 px-3 py-2 lg:px-3 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
                    >
                      + Tambah Tugas
                    </Link>
                  </div>
                  <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden mt-5 ">
                    <thead className="text-sm text-neutral2 bg-gray-100">
                      <tr>
                        <th scope="col" className="p-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nama Tugas
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Deskripsi
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tanggal Mulai
                        </th>
                        <th scope="col" className="px-6 py-3">
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
                      {tugas.map((tugasItem, index = 0) => {
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
                            <td className="px-6 py-4">
                              <div>
                                {dayNameStart} - {timeStart}
                              </div>
                              <div>{dateStart}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                {dayNameEnd} - {timeEnd}
                              </div>
                              <div>{dateEnd}</div>
                            </td>
                            <td className="px-6 py-4">
                              {/* "file": null, jika tidak null maka tugasItem.file */}
                              {tugasItem.file == null ? (
                                <p>Tidak ada file</p>
                              ) : (
                                <a href={tugasItem.file}>icon</a>
                              )}
                            </td>
                            <td className="px-6 py-4 flex items-center justify-center">
                              <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded   ms-3">
                                {tugasItem.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center font-semibold">
                              {index + 3}/12
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex gap-1">
                                <Link
                                  href="/"
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
                                  href="/"
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
                            src={"/img/kursus-image-1.png"}
                            alt={""}
                            width={180}
                            height={140}
                            loading="lazy"
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
            </section>
          </article>
        </div>
      ))}
    </>
  );
};

export default DashboardDetailKelasPage;
