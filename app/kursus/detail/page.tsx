"use client";
import Footer from "@/app/component/general/Footer";
import Header from "@/app/component/general/Header";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const detail_kursus = {
  name: "Belajar Web Development Untuk Pemula",
  img: "/img/kursus/kursus-3.png",
  bg: "/img/kursus/bg-kursus-3.png",
  student: 120,
  rating: 4.9,
  tools: ["HTML", "CSS", "Javascript", "PHP", "MySQL"],
};

const DetailKursusPage = () => {
  const [activeSection, setActiveSection] = useState("deskripsi");

  const sections = [
    { id: "deskripsi", label: "Deskripsi" },
    { id: "kurikulum", label: "Kurikulum" },
    { id: "benefit", label: "Benefit" },
    { id: "asisten", label: "Asisten" },
    { id: "testimoni", label: "Testimoni" },
  ];

  return (
    <div className="scroll-smooth">
      <Header />
      <main className="w-full mx-auto">
        <section
          className="relative px-2 lg:px-4 py-10 lg:py-20 bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${detail_kursus.bg})` }}
        >
          <div className="absolute inset-0 bg-black opacity-15" />
          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 lg:gap-10">
            <div className="lg:w-[70%] flex gap-6">
              <Image
                src={detail_kursus.img}
                alt="Kursus 1"
                width={800}
                height={500}
                className="hidden lg:block max-w-64 h-max rounded-lg"
              />
              <div className="text-white flex flex-col gap-2 md:gap-3 lg:gap-4">
                {/* Informasi Jumlah Mahasiswa dan Rating */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 0 24 24"
                      width="18px"
                      className="fill-white"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    <p className="text-white font-semibold">
                      {detail_kursus.student}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      height="18px"
                      viewBox="0 0 24 24"
                      width="18px"
                      className="fill-white"
                    >
                      <g>
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M0 0h24v24H0V0z" fill="none" />
                      </g>
                      <g>
                        <path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" />
                      </g>
                    </svg>
                    <p className="text-white font-semibold">
                      {detail_kursus.rating}
                    </p>
                  </div>
                </div>

                {/* Judul Kursus */}
                <h1 className="text-2xl font-semibold">{detail_kursus.name}</h1>

                {/* Tools yang digunakan */}
                <div className="flex flex-wrap gap-1">
                  {detail_kursus.tools.map((t, index) => (
                    <p
                      key={index}
                      className="text-xs font-medium bg-white text-primary1 px-2 py-0.5 rounded-sm"
                    >
                      {t}
                    </p>
                  ))}
                </div>

                {/* Deskripsi singkat */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Officia labore vitae dignissimos. Magni iusto, error sint
                  adipisci officiis asperiores at.
                </p>
              </div>
            </div>

            {/* Navigasi untuk konten */}
            <nav className="w-full mx-auto lg:w-[25%] h-max p-4 rounded-lg bg-white/30 backdrop-blur-md text-center flex flex-col gap-2">
              <Link
                href={"/kursus/overview"}
                className="block bg-primary1 text-white hover:bg-primary2 focus:ring-primary5 px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
              >
                Belajar Sekarang
              </Link>
              <Link
                href={"#deskripsi"}
                onClick={() => setActiveSection("deskripsi")}
                className="block text-white border border-neutral5 hover:text-black hover:bg-neutral5 focus:ring-neutral4 px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
              >
                Informasi Kursus
              </Link>
              <Link
                href={"#kurikulum"}
                onClick={() => setActiveSection("kurikulum")}
                className="block text-white border border-neutral5 hover:text-black hover:bg-neutral5 focus:ring-neutral4 px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
              >
                Lihat Kurikulum
              </Link>
            </nav>
          </div>
        </section>

        {/* Navigasi untuk management active section */}
        <nav className="sticky top-0 left-0 z-50 w-full bg-white py-4 border-b px-2 lg:px-4">
          <div className="max-w-5xl mx-auto flex gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-max px-4 py-2 font-medium rounded-md transition-all ease-in-out duration-200 ${
                  activeSection === section.id
                    ? "bg-primary5 text-primary1"
                    : "hover:bg-slate-100"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        <section
          id="group-content"
          className="px-2 lg:px-4 py-4 w-full bg-white"
        >
          {/* Deskripsi */}
          {activeSection === "deskripsi" && (
            <div id="deskripsi" className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-10">
                {/* Deskripsi Utama */}
                <div id="deskripsi-utama" className="md:w-[70%] lg:w-[80%]">
                  <h3 className="mb-1">Deskripsi</h3>
                  <div className="text-neutral2">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tenetur, reprehenderit, accusamus assumenda repellendus a
                      molestiae non sapiente quia quam porro, at unde corrupti
                      iste expedita hic adipisci fugit nihil dignissimos
                      incidunt sit inventore nulla alias ea! Repudiandae ipsam
                      ea autem incidunt ab, assumenda velit mollitia ut quidem
                      aspernatur facere cumque laboriosam facilis veniam ullam
                      aliquam quam tempora doloribus sunt? Molestias
                      voluptatibus maiores ratione reiciendis, voluptas porro
                      tempora quasi dolores sed quam iure vel iusto esse fugiat
                      quas eum exercitationem perferendis!
                    </p>
                    <ol className="list-disc list-inside">
                      <li>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Vero repellat facere deleniti veniam quis itaque
                        explicabo quo. Aspernatur, dolorum suscipit.
                      </li>
                      <li>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Error eum eos expedita aperiam aliquam magnam amet
                        consectetur ipsum perferendis repellat.
                      </li>
                      <li>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Excepturi, temporibus, tenetur architecto
                        laboriosam unde quidem, rem sint id nesciunt ipsum
                        velit.
                      </li>
                    </ol>
                  </div>

                  <h3 className="mt-2 mb-1">Target dan Sasaran Siswa</h3>
                  <div className="text-neutral2">
                    <ol className="list-disc list-inside">
                      <li>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Vero repellat facere deleniti veniam quis itaque
                        explicabo quo. Aspernatur, dolorum suscipit.
                      </li>
                      <li>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Error eum eos expedita aperiam aliquam magnam amet
                        consectetur ipsum perferendis repellat.
                      </li>
                      <li>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Excepturi, temporibus, tenetur architecto
                        laboriosam unde quidem, rem sint id nesciunt ipsum
                        velit.
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Deskripsi Pelengkap */}
                <div id="deskripsi-pelengkap" className="md:w-[20%]">
                  <div className="pb-4 border-b">
                    <h4 className="mb-1">Peralatan Belajar</h4>
                    <div className="text-neutral2">Lorem ipsum dolor sit.</div>
                  </div>
                  <div className="py-4">
                    <h4 className="mb-1">Metode Ajar</h4>
                    <div className="text-neutral2">Lorem ipsum dolor sit.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Kurikulum */}
          {activeSection === "kurikulum" && (
            <div id="kurikulum" className="max-w-5xl mx-auto">
              Kurikulum
            </div>
          )}

          {/* Benefit */}
          {activeSection === "benefit" && (
            <div id="benefit" className="max-w-5xl mx-auto">
              Benefit
            </div>
          )}

          {/* Asisten */}
          {activeSection === "asisten" && (
            <div id="asisten" className="max-w-5xl mx-auto">
              Asisten
            </div>
          )}

          {/* Testimoi */}
          {activeSection === "testimoni" && (
            <div id="testimoni" className="max-w-5xl mx-auto">
              Testimoni
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DetailKursusPage;
