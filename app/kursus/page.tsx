"use client";
import React, { useState } from "react";
import Header from "../component/general/Header";
import Image from "next/image";
import Link from "next/link";
import Footer from "../component/general/Footer";

const kursus = [
  {
    name: "Belajar Web Development Untuk Pemula",
    img: "/img/kursus/kursus-1.png",
    student: 120,
    rating: 4.9,
    tools: ["HTML", "CSS", "Javascript", "PHP", "MySQL"],
  },
  {
    name: "Mobile Development",
    img: "/img/kursus/kursus-2.png",
    student: 89,
    rating: 4.5,
    tools: ["Fluter", "Kotlin", "Android Studio", "VS Code"],
  },
  ,
  {
    name: "Data Science Bengkel Koding",
    img: "/img/kursus/kursus-3.png",
    student: 51,
    rating: 4.7,
    tools: ["Jupyter Notebook", "Python", "K-Means", "Klasifikasi"],
  },
  {
    name: "Data Analyst",
    img: "/img/kursus/kursus-4.png",
    student: 400,
    rating: 4.0,
    tools: ["Python", "Analisis", "Data", "Multi Tasking", "Result"],
  },
  {
    name: "Networking",
    img: "/img/kursus/kursus-5.png",
    student: 23,
    rating: 4.3,
    tools: ["Addressing", "Mikrotik", "Cisco", "Linux", "Hacking"],
  },
  {
    name: "Artificial Intelligence",
    img: "/img/kursus/kursus-6.png",
    student: 99,
    rating: 4.2,
    tools: ["Modeling", "Fuzzy Logic", "Robot", "Learning"],
  },
];

const KelasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handler untuk mengubah nilai pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter kursus berdasarkan nilai pencarian
  const filteredKursus = kursus.filter((k) =>
    k?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Pelajari kursus ini untuk mengasah keterampilan Anda ke level
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

          {/* Navigasi */}
          {/* <nav className="w-max mx-auto flex gap-2 lg:gap-4">
            <button
              type="button"
              className="w-max px-3 py-1 text-sm bg-primary1 text-white font-medium rounded-md transition-all ease-in-out duration-200"
            >
              Semua Kursus
            </button>
            <button
              type="button"
              className="w-max px-3 py-1 text-sm bg-white text-primary1 font-medium hover:bg-slate-100 rounded-md transition-all ease-in-out duration-200"
            >
              Kursus
            </button>
            <button
              type="button"
              className="w-max px-3 py-1 text-sm bg-white text-primary1 font-medium hover:bg-slate-100 rounded-md transition-all ease-in-out duration-200"
            >
              Workshop
            </button>
          </nav> */}
        </div>

        {/* List Kursus */}
        <section
          id="kursus"
          aria-label="Kursus Bengkel Koding"
          className="mx-auto grid lg:max-w-screen-lg grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredKursus.length > 0 ? (
            filteredKursus.map((k, index) => {
              if (!k) return null;

              return (
                <Link
                  href="/"
                  key={index}
                  className="max-w-[90%] lg:max-w-full mx-auto rounded-xl transition-all duration-200 ease-in-out transform hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] hover:scale-105"
                >
                  <div className="h-full bg-white rounded-lg p-4">
                    <Image
                      src={k.img}
                      alt={k.name}
                      width={800}
                      height={500}
                      className="w-full h-auto rounded-md"
                    />
                    <div className="mt-2 flex flex-col justify-between gap-1">
                      {/* Judul Kursus */}
                      <p className="font-semibold text-primary1 text-lg">
                        {k?.name}
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
                          <p className="text-neutral1 font-semibold">
                            {k?.student}
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
                          <p className="text-neutral1 font-semibold">
                            {k?.rating}
                          </p>
                        </div>
                      </div>

                      {/* Tools yang digunakan */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {k?.tools.map((t, index) => (
                          <p
                            key={index}
                            className="text-xs bg-primary5 text-primary1 px-2 py-0.5 rounded-sm"
                          >
                            {t}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-full mx-auto col-span-3 text-center">
              <p className="text-3xl my-4">😔</p>
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
