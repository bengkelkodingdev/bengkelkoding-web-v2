"use client";
import React, { useEffect, useState } from "react";
import Header from "../component/general/Header";
import Image from "next/image";
import Link from "next/link";
import Footer from "../component/general/Footer";
import { getListCourses } from "../api/courses";

const KelasPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Handler untuk mengubah nilai pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const [listCourses, setListCourses] = useState([
    {
      id: 0,
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
        const responseListCourses = await getListCourses(searchTerm);
        setListCourses(responseListCourses.data);
      };
      fetchData();
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      setIsLoading(false);
    }
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="bg-[#f7f9fa]">
        <Header />

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
    <div className="bg-[#f7f9fa]">
      <Header />

      <main className="max-w-5xl mx-auto px-2 lg:px-4 py-4 min-h-screen">
        {/* Judul dan Deskripsi Singkat */}
        <div className="w-full mx-auto pt-6 pb-10 lg:pt-10 lg:pb-20 text-center">
          <h2 className="font-bold">
            <strong className="font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              Kursus
            </strong>{" "}
            di Bengkel Koding
          </h2>
          <p className="text-neutral2">
            Pelajari kursus ini untuk mengasah keterampilanmu ke level
            berikutnya!
          </p>
        </div>

        <div className="w-full mx-auto mb-4 lg:mb-8 flex items-center flex-col lg:flex-row gap-4 lg:gap-0">
          {/* Pencarian Kursus */}
          <div className="w-max mx-auto">
            <label className="sr-only">Search</label>
            <div className="relative ml-2">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 fill-primary3"
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
                onChange={handleSearchChange}
                className="block w-[240px] lg:w-[300px] p-3 ps-10 rounded-lg text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm shadow-[rgba(7,_65,_210,_0.1)_0px_4px_10px]"
                placeholder="Cari kursus"
              />
            </div>
          </div>
        </div>

        {/* List Kursus */}
        <section
          id="kursus"
          aria-label="Kursus Bengkel Koding"
          className="mx-auto grid lg:max-w-screen-lg grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {listCourses.length > 0 ? (
            listCourses.map((k, index) => (
              <Link
                href={`/kursus/${k.id}`}
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
                </div>
              </Link>
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
      </main>

      <Footer />
    </div>
  );
};

export default KelasPage;
