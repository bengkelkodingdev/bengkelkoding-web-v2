"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import meetings, { Meeting } from "./data";
import Modal from "@/app/component/general/Modal";
import EditForm from "@/app/component/general/EditForm";

const DashboardDetailKelasPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const handleOpenModal = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleSaveMeeting = (updatedMeeting: Meeting) => {
    // Logic to save the updated meeting
    console.log("Meeting saved:", updatedMeeting);
    handleCloseModal();
  };

  return (
    <>
      <h2 className="font-extrabold">Web Development Bengkel Koding</h2>
      <div className="flex flex-col lg:flex-row gap-6 2xl:gap-10">
        <div>
          <div className="grid grid-cols-2 lg:flex items-center gap-x-2 text-xs text-neutral2">
            <p>
              Hari:{" "}
              <strong className="font-semibold text-primary1">Kamis</strong>
            </p>
            <p>
              Jam:{" "}
              <strong className="font-semibold text-primary1">10:20 WIB</strong>
            </p>
            <p>
              Dosen:{" "}
              <strong className="font-semibold text-primary1">
                Vinicius Junior
              </strong>
            </p>
            <p>
              Kuota: <strong className="font-semibold text-primary1">7</strong>
            </p>
          </div>
          <p className="mt-4 text-neutral2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industries standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
              <td className="px-6 py-4">30%</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">Presentase UAS</td>
              <td className="px-6 py-4">30%</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">Presentase Tugas</td>
              <td className="px-6 py-4">40%</td>
            </tr>
          </tbody>
        </table>
        
      </div>

      {/*Pertemuan */}
      <div className="mt-10 flex flex-col gap-3 Box-Pertemuan">
        <h3>List Pertemuan</h3>
        <div className="flex gap-5 flex-col-reverse md:flex-col-reverse lg:flex-row ">
          {/* list */}
          <div className="lg:w-[70%] shadow-md">
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
                {Array.from({ length: meetings.length }).map((_, index) => (
                  <tr
                    key={index}
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
                    <td colSpan={5} className="p-0">
                      <Link
                        href={`detail/${meetings[index].id}`}
                        className="block w-full h-full p-4"
                      >
                        <table className="w-full ">
                          <tbody>
                            <tr>
                              <td className="px-6 py-3 text-sm font-semibold">
                                Pertemuan {meetings[index].id}
                              </td>
                              <td className="px-6 py-3 ">
                                <p className="text-xs font-semibold">{meetings[index].date}</p>
                                <p className="text-xs ">{meetings[index].time}</p>
                              </td>
                              <td className="px-6 py-3 text-xs">
                                {meetings[index].room}
                              </td>
                              <td className="px-6 py-3 w-36">
                                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                    meetings[index].status === "Aktif"
                                      ? "text-green-800 bg-green-100"
                                      : "text-red-800 bg-red-100"
                                  }`}>
                                    <span className={`w-2 h-2 me-1  rounded-full ${
                                    meetings[index].status === "Aktif"
                                      ? "bg-green-500"
                                      : " bg-red-500"
                                  }`}></span>
                                    {meetings[index].status}
                                </span>
                              </td>
                              <td className="px-6 py-3">
                                <div className="flex gap-1">
                                  <Link
                                    href={`/edit/${meetings[index].id}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleOpenModal(meetings[index]);
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
                                    href={`/delete/${meetings[index].id}`}
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
                          </tbody>
                        </table>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <td className="px-6 py-4">3</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">Jumlah pertemuan</td>
                  <td className="px-6 py-4">7</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">Pertemuan dimulai</td>
                  <td className="px-6 py-4">12-02-2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedMeeting && (
            <EditForm user={selectedMeeting} onSave={handleSaveMeeting} />
          )}
        </Modal>
      </div>

      <div className="w-full mt-8 grid grid-cols-3 gap-y-8 gap-x-4">
        {/* list kursus */}
        <div className="col-span-2">
          <h3 className="mb-2">Kursus</h3>
            <ol className="relative border-s border-gray-200 ">
            {Array.from({ length: 3 }).map((_, index) => (                  
                <li key={index} className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white "></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 ">Path { index + 1 }  </time>
                    <h3 className="text-lg font-semibold text-gray-900 "> Memulai Pemrograman dengan Kotlin</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 ">Pelajari dasar bahasa pemrograman, functional programming,
                    object-oriented programming OOP, serta concurrency dengan menggunakan Kotlin.</p>
                    {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 ">Cek Kursus <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg></a> */}
                </li>
                ))}
            </ol>
        </div>
        {/* list Tugas */}

        <div className="ml-4 col-span-1">
          <h3 className="mb-2">Tugas</h3>
          <ol className="relative border-s border-gray-200 ">  
          {Array.from({ length: 2 }).map((_, index) => (                
              <li className="mb-10 ms-6">            
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white ">
                      <svg className="w-2.5 h-2.5 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                      </svg>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 ">Tugas Slicing UI/UX<span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded   ms-3">Latest</span></h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">Deadline on 12 Mei 2024 (23:59) </time>
                  <p className="mb-4 text-base font-normal text-gray-500 ">Pelajari dasar bahasa pemrograman, functional programming,
                  object-oriented programming (OOP), serta concurrency dengan
                  menggunakan Kotlin.</p>
                  {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700   "><svg className="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
              </svg> Lihat Tugas</a> */}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default DashboardDetailKelasPage;
