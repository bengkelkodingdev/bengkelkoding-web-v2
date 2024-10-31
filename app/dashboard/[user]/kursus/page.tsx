"use client";
import { getAdminListCourses } from "@/app/api/admin/course";
import Button from "@/app/component/general/Button";
import Modal from "@/app/component/general/Modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Input from "@/app/component/general/Input";

const DashboardKursus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [searchTerm, setSearchTerm] = useState("");

  // // Handler untuk mengubah nilai pencarian
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  const [listCourses, setListCourses] = useState([
    {
      id: 0,
      first_article_id: 0,
      title: "",
      image: "",
      background_image: "",
      tools: "",
      rating: 0,
      level: "",
      student_count: 0,
    },
  ]);

  const toolsArray = (tools: string) => {
    const data = tools?.split(", ");
    return data?.map((d, index) => (
      <p
        key={index}
        className="text-xs bg-primary5 text-primary1 px-2 py-0.5 rounded-sm"
      >
        {d}
      </p>
    ));
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        // Response ListCourses
        const responseListCourses = await getAdminListCourses();
        setListCourses(responseListCourses.data);
      };
      fetchData();
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      setIsLoading(false);
    }
  }, []);

  const [courseId, setCourseId] = useState(0);
  const [courseTitle, setCourseTitle] = useState("");
  const [confirmCourseDelete, setConfirmCourseDelete] = useState("");

  // Modal generate token
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (id_course: number, title_course: string) => {
    setIsModalOpen(true);
    setCourseId(id_course);
    setCourseTitle(title_course);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteKursus = async () => {
    try {
      // const response = await postAktivasiToken(classroomId, token);

      // Success handling
      toast.success("Anda Berhasil Mengaktifkan Token 😁");
      setIsModalOpen(false);
    } catch (error) {
      // Log error and show toast message
      console.error("Failed to activate token", error);
      toast.error("Gagal Mengaktifkan Token 😔");
      setIsModalOpen(false);
    }
  };
  if (isLoading) {
    return (
      <div className="bg-[#f7f9fa]">
        <div className="max-w-5xl mx-auto px-2 lg:px-4 py-4 min-h-screen">
          <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg mb-6 md:mb-8" />
          <div className="mx-auto grid lg:max-w-screen-lg grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="w-full min-h-72 mx-auto rounded-xl bg-neutral5 animate-pulse" />
            <div className="w-full min-h-72 mx-auto rounded-xl bg-neutral5 animate-pulse" />
            <div className="w-full min-h-72 mx-auto rounded-xl bg-neutral5 animate-pulse" />
            <div className="w-full min-h-72 mx-auto rounded-xl bg-neutral5 animate-pulse" />
            <div className="w-full min-h-72 mx-auto rounded-xl bg-neutral5 animate-pulse" />
            <div className="w-full min-h-72 mx-auto rounded-xl bg-neutral5 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <section className="flex lg:max-w-screen-xl flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        {/* Filter Status */}
        <div className="ml-2">
          <p className="text-xs text-neutral2">Filter</p>
          <div className="flex gap-2 mt-1">
            <select
              className="py-1.5 px-2 bg-white border rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
              name="isUsed"
              id="isUsed"
              // onChange={(e) => setUsed(e.target.value)}
            >
              <option value="">Semua</option>
              <option value="true">Digunakan</option>
              <option value="false">Belum Digunakan</option>
            </select>
          </div>
        </div>
        <Link
          href={"kursus/tambah"}
          className="cursor-pointer flex items-center gap-2 bg-primary1 text-white fill-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
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
          <p>Kursus</p>
        </Link>
      </section>
      <section
        id="kursus"
        aria-label="Kursus Bengkel Koding"
        className="grid lg:max-w-screen-xl grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {listCourses.length > 0 ? (
          listCourses.map((k, index) => (
            <div
              key={index}
              className="max-w-[90%] lg:max-w-full mx-auto rounded-xl transition-all duration-200 ease-in-out transform hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] hover:scale-105"
            >
              <div className="h-full bg-white rounded-lg p-4">
                <Image
                  src={k.image}
                  alt={k.title}
                  width={800}
                  height={500}
                  className="w-full h-auto rounded-md"
                />
                <div className="mt-2 flex flex-col justify-between gap-1">
                  {/* Judul Kursus */}
                  <p className="font-semibold text-base md:text-lg">
                    {k.title}
                  </p>

                  {/* Informasi Jumlah Mahasiswa dan Rating */}
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 0 24 24"
                        width="18px"
                        className="fill-blue-500"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                      <p className="text-neutral1 font-semibold text-sm md:text-base">
                        {k.student_count}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="18px"
                        viewBox="0 0 24 24"
                        width="18px"
                        className="fill-yellow-500"
                      >
                        <g>
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M0 0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" />
                        </g>
                      </svg>
                      <p className="text-neutral1 font-semibold text-sm md:text-base">
                        {k.rating}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 -960 960 960"
                        width="18px"
                        className="fill-green-500"
                      >
                        <path d="M120-200q-17 0-28.5-11.5T80-240q0-17 11.5-28.5T120-280h200v-200q0-17 11.5-28.5T360-520h200v-200q0-17 11.5-28.5T600-760h240q17 0 28.5 11.5T880-720q0 17-11.5 28.5T840-680H640v200q0 17-11.5 28.5T600-440H400v200q0 17-11.5 28.5T360-200H120Z" />
                      </svg>
                      <p className="text-neutral1 font-semibold text-sm md:text-base">
                        {k.level}
                      </p>
                    </div>
                  </div>

                  {/* Tools yang digunakan */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {toolsArray(k.tools)}
                  </div>
                </div>

                {/* Action Button */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <Link
                    href={`/kursus/${k.id}/artikel/${k.first_article_id}`}
                    className="relative group flex gap-1 items-center justify-center py-1 rounded-md hover:bg-green-100 border-2 hover:border-green-300 hover:text-green-600 hover:fill-green-600 font-medium transition-all ease-in-out duration-150"
                    data-tooltip="Preview"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
                    </svg>
                    <span className="absolute bottom-full mb-1 hidden px-2 py-1 text-xs text-white bg-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-150">
                      Preview
                    </span>
                  </Link>
                  <Link
                    href={`kursus/${k.id}/detail`}
                    className="relative group flex gap-1 items-center justify-center py-1 rounded-md hover:bg-blue-100 border-2 hover:border-blue-300 hover:text-blue-600 hover:fill-blue-600 font-medium transition-all ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      className="w-4"
                    >
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm120-80h200q17 0 28.5-11.5T560-320q0-17-11.5-28.5T520-360H320q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160h320q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160h320q17 0 28.5-11.5T680-640q0-17-11.5-28.5T640-680H320q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm160-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
                    </svg>
                    <span className="absolute bottom-full mb-1 hidden px-2 py-1 text-xs text-white bg-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-150">
                      Detail
                    </span>
                  </Link>
                  <Link
                    href={`kursus/${k.id}/edit`}
                    className="relative group flex gap-1 items-center justify-center py-1 rounded-md hover:bg-yellow-100 border-2 hover:border-yellow-300 hover:text-yellow-600 hover:fill-yellow-600 font-medium transition-all ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      className="w-4"
                    >
                      <path d="M160-479q0 85 42.5 158T318-204q14 9 19.5 24.5T335-150q-8 15-24.5 19.5T279-134q-93-54-146-146T80-479q0-26 3.5-51t9.5-50l-13 8q-14 9-30 4.5T26-586q-8-14-3.5-30.5T41-641l121-70q14-8 30.5-3.5T217-696l70 120q8 14 3.5 30.5T272-521q-14 8-30.5 3.5T217-536l-34-59q-11 28-17 57t-6 59Zm320-321q-41 0-81 10.5T323-759q-15 8-31.5 5.5T267-770q-9-16-4-32.5t21-25.5q45-26 94.5-39T480-880q79 0 151.5 29.5T761-765v-15q0-17 11.5-28.5T801-820q17 0 28.5 11.5T841-780v140q0 17-11.5 28.5T801-600H661q-17 0-28.5-11.5T621-640q0-17 11.5-28.5T661-680h69q-46-57-111-88.5T480-800Zm242 531q38-44 58-97t20-111q0-17 11.5-30t28.5-13q17 0 28.5 13t11.5 30q0 65-20.5 125.5T800-239q-39 52-92.5 89T591-95l10 6q14 8 18 24.5T615-34q-8 14-24 18t-30-4L439-90q-14-8-18.5-24.5T424-145l70-121q8-14 24-18t30 4q14 8 18.5 24.5T563-225l-37 63q57-8 107.5-35.5T722-269Z" />
                    </svg>
                    <span className="absolute bottom-full mb-1 hidden px-2 py-1 text-xs text-white bg-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-150">
                      Edit
                    </span>
                  </Link>
                  <div
                    onClick={() => handleOpenModal(k.id, k.title)}
                    className="relative group cursor-pointer flex gap-1 items-center justify-center py-1 rounded-md hover:bg-red-100 border-2 hover:border-red-300 hover:text-red-600 hover:fill-red-600 font-medium transition-all ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      className="w-4"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z" />
                    </svg>
                    <span className="absolute bottom-full mb-1 hidden px-2 py-1 text-xs text-white bg-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-150">
                      Hapus
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full mx-auto col-span-3 text-center">
            <p className="text-2xl md:text-3xl my-4">😔</p>
            <h2 className="font-semibold text-lg md:text-xl">
              Upss, kursus tidak ditemukan
            </h2>
          </div>
        )}
      </section>

      <Modal
        title="Hapus Kursus"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="mt-4">
          <p className="mb-4 text-sm">
            Konfirmasi hapus kursus dengan menginputkan teks berikut:{" "}
            <b>{courseTitle}</b>
          </p>
          <Input
            label=""
            type="text"
            name="confirmCourseDelete"
            placeholder="Masukkan Judul Kursus"
            required
            onChange={(e) => setConfirmCourseDelete(e.target.value)}
          />
          {courseTitle !== confirmCourseDelete ? (
            <Button
              text="Hapus Kursus"
              className="w-full hover:bg-white"
              theme="tertiary"
              disabled
            />
          ) : (
            <Button
              text="Hapus Kursus"
              className="w-full"
              onClick={handleDeleteKursus}
            />
          )}
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DashboardKursus;
