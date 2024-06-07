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
      <h2 className="font-semibold">Web Development Bengkel Koding</h2>
      <div className="flex flex-col lg:flex-row gap-6 2xl:gap-10">
        <div>
          <div className="grid grid-cols-2 lg:flex items-center gap-x-2 text-neutral2">
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
          <thead className="text-sm text-neutral2 bg-gray-100">
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
      <div className="w-full mt-8 grid grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-4">
        {/* list kursus */}
        <div>
          <h3 className="mb-2">Kursus</h3>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
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
                    Memulai Pemrograman dengan Kotlin
                  </h4>
                  <p className="text-neutral3 text-sm">
                    Tim Mobile Bengkel Koding
                  </p>
                  <p className="text-neutral2 text-sm mt-2">
                    Pelajari dasar bahasa pemrograman, functional programming,
                    object-oriented programming OOP, serta concurrency dengan
                    menggunakan Kotlin.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* list Tugas */}
        <div>
          <h3 className="mb-2">Tugas</h3>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="py-3 px-4 rounded-md overflow-hidden border border-gray-200 hover:shadow-[rgba(7,_65,_210,_0.1)_0px_6px_10px] transition-all ease-out duration-200"
              >
                <div className="flex justify-between">
                  <h4 className="text-neutral1 font-medium">
                    Tugas Slicing UI/UX
                  </h4>
                  <p className="text-primary1 font-medium text-sm">Tugas</p>
                </div>
                <p className="mt-2 text-neutral2 text-sm">
                  Pelajari dasar bahasa pemrograman, functional programming,
                  object-oriented programming (OOP), serta concurrency dengan
                  menggunakan Kotlin. Pelajari dasar bahasa pemrograman,
                  functional programming, object-oriented programming (OOP),
                  serta concurrency dengan menggunakan Kotlin.
                </p>
                <div className="mt-2 flex items-center gap-6 text-neutral2">
                  <p className="text-sm">
                    Waktu Mulai{" "}
                    <strong className="font-semibold text-green1">
                      (10:00) 10 Mei 2024
                    </strong>
                  </p>
                  <p className="text-sm">
                    Deadline{" "}
                    <strong className="font-semibold text-red1">
                      (23:59) 12 Mei 2024
                    </strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Pertemuan */}
      <div className="mt-10 flex flex-col gap-3 Box-Pertemuan">
        <h3>List Pertemuan</h3>
        <div className="flex gap-5 flex-col-reverse md:flex-col-reverse lg:flex-row ">
          {/* list */}
          <div className="lg:w-[78%] shadow-md">
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
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="px-6 py-4 font-semibold">
                                Pertemuan {meetings[index].id}
                              </td>
                              <td className="px-6 py-4">
                                <p>{meetings[index].date}</p>
                                <p>{meetings[index].time}</p>
                              </td>
                              <td className="px-6 py-4">
                                {meetings[index].room}
                              </td>
                              <td className="px-6 py-4">
                                <p
                                  className={`w-max px-4 rounded-sm ${
                                    meetings[index].status === "Aktif"
                                      ? "text-green-600 bg-green-100"
                                      : "text-red-600 bg-red-100"
                                  }`}
                                >
                                  {meetings[index].status}
                                </p>
                              </td>
                              <td className="px-6 py-4">
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
          <div className="lg:w-[22%] ">
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
            <div></div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedMeeting && (
            <EditForm user={selectedMeeting} onSave={handleSaveMeeting} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default DashboardDetailKelasPage;
