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
import { getDetailClassroom } from "@/app/api/api-kelas/getDetail-kelas";
import StatusLabel from "@/app/component/kelas/StatusSesi";
import { getAssigment } from "@/app/api/api-kelas/getAll-Assigment";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";


//

const DashboardDetailKelasPage = () => {
  const url = usePathname();
  const parts = url.split("/");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Presence | null>(null);

  const handleOpenModal = (presence: Presence) => {
    setSelectedMeeting(presence);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleSaveMeeting = (updatedMeeting: Presence) => {
    // Logic to save the updated meeting
    console.log("Meeting saved:", updatedMeeting);
    handleCloseModal();
  };

  const [kelas, setKelas] = useState<ClassroomData[]>([]);
  const [tugas, setTugas] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await getDetailClassroom(parts[4]);
        const responseAssigment = await getAssigment(parts[4]);

        console.log("tugas", responseAssigment);

        // Check if response.data is an object, convert to array if necessary
        if (Array.isArray(response.data)) {
          setKelas(response.data);
          console.log("Check if response.data is an object");
        } else if (response.data && typeof response.data === "object") {
          setKelas([response.data]); // Convert single object to array
        } else {
          throw new Error("Unexpected response format");
        }

        // --- assigment
        if (Array.isArray(responseAssigment.data)) {
          setTugas(responseAssigment.data);
          console.log("Check if response.data is an array");
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


  const chartOptions: ApexCharts.ApexOptions = {
    series: [{
      name: "Kehadiran",
      data: kelas.flatMap((kelasItem) =>
        kelasItem.presences.map((presence) => presence.attendance_count !== 0 ? presence.attendance_count : null)
      ),
    }],
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
      categories: kelas.flatMap((kelasItem) =>
        kelasItem.presences
          .filter((presence) => presence.attendance_count !== 0)
          .map((presence) => `Pertemuan ${presence.week}`)
      ),
    },
  };
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Kelas Tidak ditemukan</p>;


  return (
    <>
      {kelas.map((kelasItem) => (
        <div>
          <h1>{kelasItem.name}</h1>

          <div className="flex flex-col lg:flex-row gap-6 2xl:gap-10">
            <div className="w-full">
              <div className="grid grid-cols-2 lg:flex items-center gap-x-2 md:gap-5 text-xs text-neutral2">
                <p>
                  Hari:{" "}
                  <strong className="font-semibold text-primary1">
                    {kelasItem.day}
                  </strong>
                </p>
                <p>
                  Jam:{" "}
                  <strong className="font-semibold text-primary1">
                    {kelasItem.time_start} - {kelasItem.time_end} WIB
                  </strong>
                </p>
                <p>
                  Dosen:{" "}
                  <strong className="font-semibold text-primary1">
                    {kelasItem.lecture}
                  </strong>
                </p>
                <p>
                  Kuota:{" "}
                  <strong className="font-semibold text-primary1">
                    {kelasItem.quota}
                  </strong>
                </p>
              </div>
              <p className="mt-4 text-neutral2">{kelasItem.description}</p>
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
                  <td className="px-6 py-4">{kelasItem.uts_percent}</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">Presentase UAS</td>
                  <td className="px-6 py-4">{kelasItem.uas_percent}</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">Presentase Tugas</td>
                  <td className="px-6 py-4">{kelasItem.task_percent}</td>
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
                          <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={180} />
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
                              <td className="px-6 py-4">{kelasItem.max_absent}</td>
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
                                <td className="px-6 py-3 text-xs">{kelasItem.room}</td>
                                <td className="px-6 py-3 w-36">
                                  
                                  <StatusLabel
                                    presence={presence}
                                    kelas={kelasItem}
                                    index={presence.id}
                                  />
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
                        <EditForm user={selectedMeeting} onSave={handleSaveMeeting} />
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
                        <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
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
                              <p className="font-medium text-neutral2">{student.name}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">{student.identity_code}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1">
                              <button
                               
                                className="block bg-yellow-200 p-1 rounded-md fill-white hover:bg-yellow-100 transition-all ease-in-out duration-150"
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
                <div id="tugas" className="mx-auto">
                  {/* list Tugas */}

                  <div className="ml-4 col-span-1">
                    <ol className="relative border-s border-gray-200 ">
                      {tugas.map((tugas, index) => (
                        <li key={tugas.id} className="mb-10 ms-6">
                          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white ">
                            <svg
                              className="w-2.5 h-2.5 text-gray-500 "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </span>
                          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 ">
                            {tugas.title}
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded   ms-3">
                              {tugas.type}
                            </span>
                          </h3>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                            Deadline on  {tugas.deadline}
                          </time>
                          <p className="mb-4 text-base font-normal text-gray-500 ">
                            {tugas.description}
                          </p>
                          {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700   "><svg className="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                    </svg> Lihat Tugas</a> */}
                        </li>
                      ))}
                    </ol>
                  </div>
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
                            />
                            <div className="py-3 px-4">
                              <h4 className="text-primary1 font-medium">
                                {courses.title}
                              </h4>
                              <p className="text-neutral3 text-sm">{courses.author}</p>
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
