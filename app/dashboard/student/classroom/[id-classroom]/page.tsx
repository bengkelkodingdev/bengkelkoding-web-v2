"use client";
import { getStudentClassroomDetail } from "@/app/api/student/dashboard";
import Breadcrumb from "@/app/component/general/Breadcrumb";
import { formatDate } from "@/app/lib/formatDate";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const StudentClassroomPage = () => {
  const url = usePathname();
  const parts = url.split("/");
  const idClassroom = parts[parts.length - 1];

  const [classroom, setClassroom] = useState({
    id: 0,
    name: "",
    description: "",
    time_start: "",
    time_end: "",
    day: "",
    room: "",
    task_percent: "",
    uts_percent: "",
    uas_percent: "",
    start_date: "",
    start_date_formatted: "",
    period: "",
    lecture: {
      name: "",
      npp: "",
      image: "",
    },
    class_informations: [
      {
        id: 0,
        title: "",
        description: "",
      },
    ],
    courses: [
      {
        id: 0,
        first_article_id: 0,
        title: "0",
        image: "",
        author: "",
        brief_description: "",
      },
    ],
    assignments: [
      {
        id: 0,
        title: "",
        description: "",
        start_time: "",
        deadline: "",
        is_uploaded: false,
        tasks: [
          {
            id: 0,
            score: 0,
            is_submitted: false,
            submitted_at: "",
          },
        ],
      },
    ],
    assistants: [
      {
        id: 0,
        name: "",
        nim: "",
        image: "",
      },
    ],
    students: [
      {
        id: 0,
        name: "",
        nim: "",
        image: "",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      // Get Detail Classroom
      const responseClassroom = await getStudentClassroomDetail(idClassroom);
      setClassroom(responseClassroom.data);
    };

    fetchData();
  }, [idClassroom]);

  // Close Open for Informasi Kelas
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const dataBreadcrumb = [
    { text: "Dashboard", href: "/dashboard/student" },
    { text: `Kelas ${classroom.name}` },
  ];

  return (
    <>
      <Breadcrumb items={dataBreadcrumb} />

      <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
        {/* Kelas */}
        <div id="Classroom" className="lg:col-span-2">
          {/* List Kelas */}
          <div className="flex justify-between">
            <div className="flex gap-8">
              {/* Icon Kelas */}
              <div className="min-w-48 h-48 bg-primary5 fill-primary3 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="110px"
                  viewBox="0 -960 960 960"
                  width="110px"
                >
                  <path d="M242-249q-20-11-31-29.5T200-320v-192l-96-53q-11-6-16-15t-5-20q0-11 5-20t16-15l338-184q9-5 18.5-7.5T480-829q10 0 19.5 2.5T518-819l381 208q10 5 15.5 14.5T920-576v256q0 17-11.5 28.5T880-280q-17 0-28.5-11.5T840-320v-236l-80 44v192q0 23-11 41.5T718-249L518-141q-9 5-18.5 7.5T480-131q-10 0-19.5-2.5T442-141L242-249Zm238-203 274-148-274-148-274 148 274 148Zm0 241 200-108v-151l-161 89q-9 5-19 7.5t-20 2.5q-10 0-20-2.5t-19-7.5l-161-89v151l200 108Zm0-241Zm0 121Zm0 0Z" />
                </svg>
              </div>
              {/* Informasi Kelas */}
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold">{classroom.name}</p>
                <div className="flex gap-6 text-neutral2 fill-neutral3">
                  <p className="text-sm flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                    >
                      <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                    </svg>
                    {classroom.day}
                  </p>{" "}
                  <p className="text-sm flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                    >
                      <path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                    </svg>
                    {classroom.time_start} - {classroom.time_end}
                  </p>{" "}
                  <p className="text-sm flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                    >
                      <path d="M480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 79q-14 0-28-5t-25-15q-65-60-115-117t-83.5-110.5q-33.5-53.5-51-103T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 45-17.5 94.5t-51 103Q698-301 648-244T533-127q-11 10-25 15t-28 5Zm0-453Zm0 80q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z" />
                    </svg>
                    {classroom.room}
                  </p>
                </div>
                <p className="text-sm text-neutral2 line-clamp-2">
                  {classroom.description}
                </p>
                <div>Disini Tasmbahin Apa???</div>
              </div>
            </div>
            {/* Kontrak Kuliah */}
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
                  <td className="px-6 py-4">{classroom.uts_percent}</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">Presentase UAS</td>
                  <td className="px-6 py-4">{classroom.uas_percent}</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">Presentase Tugas</td>
                  <td className="px-6 py-4">{classroom.task_percent}</td>
                </tr>
              </tbody>
            </table>
            {/* Nilai Akhir Kelas */}
            {/* <div className="h-max bg-primary5 rounded-lg min-w-24 text-center overflow-hidden">
            <p className="text-sm bg-primary3 text-white font-medium py-1">
              Nilai Akhir
            </p>
            <strong className="block text-3xl text-primary3 py-2"> */}
            {/* {classroom.final_score ? classroom.final_score : "-"} */}
            {/* </strong>
          </div> */}
          </div>
        </div>

        {/* Daftar Kursus */}
        <div id="DaftarKursus">
          {/* Judul Daftar Kursus */}
          <div className="flex gap-2 md:gap-4 border-b border-neutral4 mb-4 p-4 items-center">
            <div className="h-8 w-8 bg-primary5 fill-primary3 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
              >
                <path d="M440-400h80q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480h-80q-17 0-28.5 11.5T400-440q0 17 11.5 28.5T440-400Zm0-120h240q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H440q-17 0-28.5 11.5T400-560q0 17 11.5 28.5T440-520Zm0-120h240q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H440q-17 0-28.5 11.5T400-680q0 17 11.5 28.5T440-640ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-520q0-17 11.5-28.5T120-720q17 0 28.5 11.5T160-680v520h520q17 0 28.5 11.5T720-120q0 17-11.5 28.5T680-80H160Zm160-720v480-480Z" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold">Daftar Kursus</h2>
          </div>
          {/* Daftar Kursus */}
          <div className="flex flex-col gap-3">
            {classroom.courses.map((course) => (
              <div key={course.id}>{course.title}</div>
            ))}
          </div>
        </div> 

        {/* Informasi Kelas */}
        <div id="InformasiKelas">
          {/* Judul Informasi Kelas */}
          <div className="flex gap-2 md:gap-4 border-b border-neutral4 mb-4 p-4 items-center">
            <div className="h-8 w-8 bg-primary5 fill-primary3 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
              >
                <path d="M480-680q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm0 320q17 0 28.5-11.5T520-400v-160q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560v160q0 17 11.5 28.5T480-360ZM240-240l-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm-34-80h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold">
              Informasi Kelas
            </h2>
          </div>
          {/* Daftar Informasi Kelas */}
          <div className="w-full flex flex-col gap-3">
            {classroom.class_informations.map((information) => (
              <div
                key={information.id}
                className="h-max w-full border border-neutral4 rounded-xl text-left py-4 px-6 focus:shadow-[rgba(7,_65,_210,_0.1)_0px_4px_10px] hover:shadow-[rgba(7,_65,_210,_0.1)_0px_4px_10px] transition-all ease-in-out duration-200"
              >
                {/* pertanyaan */}
                <div className="flex justify-between items-center gap-2">
                  <strong className="font-semibold text-neutral1 text-sm md:text-base">
                    {information.title}
                  </strong>
                  <div
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => toggleFAQ(information.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 0 24 24"
                      width="30px"
                      className={`fill-neutral1 w-8 h-8 transform transition-transform duration-200 ${
                        openIndex === information.id ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z" />
                    </svg>
                  </div>
                </div>
                {/* jawaban */}
                <div
                  className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                    openIndex === information.id ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <p className="text-neutral2 pt-4 text-xs md:text-sm">
                    {information.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistik Log Kehadiran */}
        <div className="bg-primary5 rounded-xl p-4">
          {/* Judul Statistik */}
          <div className="flex gap-2 md:gap-4 mb-4 items-center">
            <div className="h-8 w-8 bg-white bg-opacity-40 fill-white rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
              >
                <path d="M120-240q-33 0-56.5-23.5T40-320q0-33 23.5-56.5T120-400h10.5q4.5 0 9.5 2l182-182q-2-5-2-9.5V-600q0-33 23.5-56.5T400-680q33 0 56.5 23.5T480-600q0 2-2 20l102 102q5-2 9.5-2h21q4.5 0 9.5 2l142-142q-2-5-2-9.5V-640q0-33 23.5-56.5T840-720q33 0 56.5 23.5T920-640q0 33-23.5 56.5T840-560h-10.5q-4.5 0-9.5-2L678-420q2 5 2 9.5v10.5q0 33-23.5 56.5T600-320q-33 0-56.5-23.5T520-400v-10.5q0-4.5 2-9.5L420-522q-5 2-9.5 2H400q-2 0-20-2L198-340q2 5 2 9.5v10.5q0 33-23.5 56.5T120-240Z" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white">
              Statistik Kehadiran Anda
            </h2>
          </div>
        </div>

        {/* Log Kehadiran */}
        <div id="LogKehadiran">
          {/* Judul Log Kehadiran */}
          <div className="flex gap-2 md:gap-4 border-b border-neutral4 mb-4 p-4 items-center">
            <div className="h-8 w-8 bg-primary5 fill-primary3 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
              >
                <path d="M320-160q-33 0-56.5-23.5T240-240v-80q0-17 11.5-28.5T280-360h80v-90q-30-2-59.5-12.5T249-494q-6-6-9.5-13.5T236-523v-27h-29q-8 0-15.5-3t-13.5-9l-90-90q-12-12-12-28t12-28q29-29 78-42.5t90-13.5q27 0 52.5 4t51.5 15q0-23 16-39t39-16h345q33 0 56.5 23.5T840-720v440q0 50-35 85t-85 35H320Zm120-200h200q17 0 28.5 11.5T680-320v40q0 17 11.5 28.5T720-240q17 0 28.5-11.5T760-280v-440H440v24l229 229q9 9 11 20.5t-3 22.5q-5 11-14 17.5t-23 6.5q-8 0-15.5-3.5T612-412L510-514l-8 8q-14 14-29.5 25T440-464v104ZM224-630h52q17 0 28.5 11.5T316-590v46q12 8 25 11t27 3q23 0 41.5-7t36.5-25l8-8-56-56q-29-29-65-43.5T256-684q-20 0-38 3t-36 9l42 42Zm376 350H320v40h286q-3-9-4.5-19t-1.5-21Zm-280 40v-40 40Z" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold">Log Kehadiran</h2>
            <p className="text-sm text-white font-semibold bg-gradient-to-r from-blue-500 to-emerald-600 px-2 py-1 rounded-md">
              Minggu ini
            </p>
          </div>
          {/* List Log Kehadiran */}
          <div>
            <div className="flex justify-between rounded-xl border border-neutral4 p-4 items-center gap-4  cursor-pointer transition-all duration-200 ease-in-out transform hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
              {/* Informasi Log Kehadiran */}
              <div>
                <div className="flex gap-4 items-center mb-2">
                  <p className="bg-gradient-to-r from-blue-500 to-blue-700 px-2 py-1 rounded-md text-white font-semibold text-sm">
                    Pertemuan 4
                  </p>
                  <p className="font-medium text-base">Bengkel Koding DS-01</p>
                </div>
                <div className="flex justify-between">
                  {/* Waktu Kehadiran */}
                  <div className="text-neutral2 fill-neutral2 flex gap-6">
                    <p className="text-sm flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16px"
                        viewBox="0 -960 960 960"
                        width="16px"
                      >
                        <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                      </svg>
                      Selasa, 27 Jul 2024
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16px"
                        viewBox="0 -960 960 960"
                        width="16px"
                      >
                        <path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                      </svg>
                      12.30 - 14.10 WIB
                    </p>
                  </div>
                </div>
              </div>
              {/* Status Kehadiran */}
              <div className="w-max bg-primary5 p-2 rounded-lg">
                {/* Judul Status */}
                <div className="mb-2">
                  <p className="text-sm">Status Absensi</p>
                </div>
                {/* Informasi Lengkap Status */}
                <div>
                  <p className="bg-red-100 border-2 border-dashed border-red-500 text-red-500 font-medium py-1 px-2 text-sm rounded-md">
                    Tidak hadir
                  </p>
                  {/* <p className="bg-green-100 border-2 border-dashed border-green-500 text-green-500 font-medium py-1 px-2 text-sm rounded-md">
                    Hadir
                  </p>
                  <p className="bg-yellow-100 border-2 border-dashed border-yellow-500 text-yellow-500 font-medium py-1 px-2 text-sm rounded-md">
                    Belum hadir
                  </p>
                  <p className="bg-blue-100 border-2 border-dashed border-blue-500 text-blue-500 font-medium py-1 px-2 text-sm rounded-md">
                    Izin
                  </p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-neutral4 text-center text-xs md:text-sm lg:text-base">
            Anda belum memiliki log kehadiran!
          </div>
        </div>

        {/* Tugas */}
        <div id="TugasAnda" className="lg:col-span-2">
          {/* Judul Tugas */}
          <div className="flex gap-2 md:gap-4 border-b border-neutral4 mb-4 p-4 items-center">
            <div className="h-8 w-8 bg-primary5 fill-primary3 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold">Tugas Anda</h2>
          </div>
          {/* List Tugas */}
          {classroom.assignments.length > 0 ? (
            <div id="ListTugasAnda" className="flex flex-col gap-3">
              {classroom.assignments.map((assignment) => (
                <Link
                  key={assignment.id}
                  href={`${classroom.id}/assignment/${assignment.id}`}
                  className="flex justify-between rounded-xl border border-neutral4 p-4 items-center gap-4  cursor-pointer transition-all duration-200 ease-in-out transform hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
                >
                  {/* Data Informasi Tugas */}
                  <div className="flex gap-6 items-center">
                    {/* Icon Tugas */}
                    <div className="min-w-20 h-20 bg-primary5 fill-primary3 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                      >
                        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
                      </svg>
                    </div>
                    {/* Informasi Tugas */}
                    <div>
                      <div className="flex gap-8 items-center">
                        <div>
                          <p className="text-xl font-semibold">
                            {assignment.title}
                          </p>
                        </div>
                        {/* <p className="h-max text-xs bg-primary3 rounded-md text-white font-medium py-1.5 px-2">
                        {assignment}
                      </p> */}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex gap-6">
                          <p className="text-neutral2 text-xs md:text-sm">
                            Diberikan{" "}
                            <strong className="font-normal text-black">
                              {formatDate(assignment.start_time)}
                            </strong>
                          </p>
                          <p className="text-neutral2 text-xs md:text-sm">
                            Deadline{" "}
                            <strong className="font-normal text-red-500">
                              {formatDate(assignment.deadline)}
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Status */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="w-max bg-primary5 p-2 rounded-lg">
                      {/* Judul Status */}
                      <div className="flex justify-between mb-2 items-center">
                        <p className="text-sm">Status</p>
                        {/* Status Terlambat */}
                        {assignment.deadline <
                          assignment.tasks[0]?.submitted_at && (
                          <p className="h-max text-xs bg-red-500 text-white p-1 rounded-md">
                            Terlambat
                          </p>
                        )}
                      </div>
                      {/* Informasi Lengkap Status */}
                      <div>
                        {assignment.is_uploaded ? (
                          <p className="bg-green-100 border-2 border-dashed border-green-500 text-green-500 font-medium py-1 px-2 text-sm rounded-md">
                            Sudah dikumpulkan
                          </p>
                        ) : (
                          <p className="bg-red-100 border-2 border-dashed border-red-500 text-red-500 font-medium py-1 px-2 text-sm rounded-md">
                            Belum dikumpulkan
                          </p>
                        )}
                        {/* <p className="bg-blue-100 border-2 border-dashed border-blue-500 text-blue-500 font-medium py-1 px-2 text-sm rounded-md">
                        Menunggu penilaian
                      </p> */}
                      </div>
                    </div>
                    {/* Informasi Tanggal Diserahkan */}
                    {assignment.is_uploaded && (
                      <p className="text-neutral2 text-xs md:text-sm">
                        Diserahkan{" "}
                        <strong className="font-normal text-primary2">
                          {formatDate(assignment.tasks[0]?.submitted_at)}
                        </strong>
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-neutral4 text-center text-xs md:text-sm lg:text-base">
              Anda belum memiliki tugas!
            </div>
          )}
        </div>

        {/* Struktur Kelas */}
        <div id="StrukturKelas" className="col-span-2">
          {/* Judul Struktur Kelas */}
          <div className="flex gap-2 md:gap-4 border-b border-neutral4 mb-4 p-4 items-center">
            <div className="h-8 w-8 bg-primary5 fill-primary3 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold">Struktur Kelas</h2>
          </div>
          {/* Main Struktur Kelas */}
          {/* Lecture */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="w-full py-2 mb-2 font-medium text-base">
                Dosen
              </div>
              <div className="flex gap-3 items-center">
                <div className="max-w-14 h-14 overflow-hidden rounded-lg">
                  <Image
                    src={classroom.lecture.image}
                    alt="Lecture"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </div>
                <div>
                  <p className="text-sm">{classroom.lecture.name}</p>
                  <p className="text-sm">{classroom.lecture.npp}</p>
                </div>
              </div>
            </div>
            {/* Assistant */}
            <div className="col-span-2">
              <div className="w-full py-2 mb-2 font-medium text-base">
                Asisten
              </div>
              <div className=" grid grid-cols-2 gap-2">
                {classroom.assistants.map((assistant) => (
                  <div key={assistant.id} className="flex gap-3 items-center">
                    <div className="max-w-14 h-14 overflow-hidden rounded-lg">
                      <Image
                        src={assistant.image}
                        alt="Assistant"
                        width={100}
                        height={100}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm">{assistant.name}</p>
                      <p className="text-sm">{assistant.nim}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Student */}
            <div className="col-span-3">
              <div className="w-full py-2 mb-2 font-medium text-base">
                Mahasiswa
              </div>
              <div className=" grid grid-cols-3 gap-2">
                {classroom.students.map((student) => (
                  <div key={student.id} className="flex gap-3 items-center">
                    <div className="max-w-14 h-14 overflow-hidden rounded-lg">
                      <Image
                        src={student.image}
                        alt="Student"
                        width={100}
                        height={100}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm">{student.name}</p>
                      <p className="text-sm">{student.nim}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentClassroomPage;
