"use client";
import { getDetailCourse } from "@/app/api/courses";
import Footer from "@/app/component/general/Footer";
import Header from "@/app/component/general/Header";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const keuntungan = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m480-483-68 52q-6 5-12 .5t-4-11.5l26-84-70-56q-5-5-3-11.5t9-6.5h86l26-82q2-7 10-7t10 7l26 82h85q7 0 9.5 6.5T608-582l-71 56 26 84q2 7-4 11.5t-12-.5l-67-52Zm0 363L293-58q-20 7-36.5-5T240-95v-254q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v254q0 20-16.5 32T667-58l-187-62Zm0-200q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
      </svg>
    ),
    title: "1on1 Asistensi",
    desription:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, eius!",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m480-483-68 52q-6 5-12 .5t-4-11.5l26-84-70-56q-5-5-3-11.5t9-6.5h86l26-82q2-7 10-7t10 7l26 82h85q7 0 9.5 6.5T608-582l-71 56 26 84q2 7-4 11.5t-12-.5l-67-52Zm0 363L293-58q-20 7-36.5-5T240-95v-254q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v254q0 20-16.5 32T667-58l-187-62Zm0-200q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
      </svg>
    ),
    title: "Sertifikat",
    desription:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, eius!",
  },
];

const sections = [
  { id: "deskripsi", label: "Deskripsi" },
  // { id: "kurikulum", label: "Kurikulum" },
  { id: "asisten", label: "Asisten" },
  { id: "testimoni", label: "Testimoni" },
];

const DetailKursusPage = () => {
  const url = usePathname();
  const pathParts = url.split("/");
  const idKursus = Number(pathParts[2]);

  const [activeSection, setActiveSection] = useState("deskripsi");

  const [detailKursus, setDetailKursus] = useState({
    id: 0,
    title: "",
    image: "",
    background_image: "",
    tools: "",
    brief_description: "",
    description: "",
    rating: 0,
    level: "",
    student_count: 0,
    teaching_method: "",
    assistants: [
      {
        nim: "",
        name: "",
        image: "",
      },
    ],
    testimonials: [
      {
        nim: "",
        name: "",
        image: "",
        rating: 5,
        comment: "",
      },
    ],
  });

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
    const fetchData = async () => {
      // Response ListCourses
      const responseDetailCourse = await getDetailCourse(idKursus);
      setDetailKursus(responseDetailCourse.data);
    };
    fetchData();
  }, [idKursus]);

  return (
    <div className="scroll-smooth">
      <Header />
      <main className="w-full mx-auto">
        <section
          className="relative px-2 lg:px-4 py-10 lg:py-20 bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("/img/bg-detail-kelas.png")` }}
        >
          <div className="absolute inset-0 bg-black opacity-[0.03]" />
          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 lg:gap-10">
            <div className="lg:w-[70%] flex gap-6">
              <Image
                src={detailKursus.image}
                alt="Kursus 1"
                width={800}
                height={500}
                className="hidden lg:block max-w-64 h-max rounded-lg"
              />
              <div className="text-black flex flex-col gap-2 md:gap-3 lg:gap-4">
                {/* Informasi Jumlah Mahasiswa dan Rating */}
                <div className="flex gap-4">
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
                    <p className="text-black font-semibold">
                      {detailKursus.student_count}
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
                    <p className="text-black font-semibold">
                      {detailKursus.rating}
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
                    <p className="text-black font-semibold">
                      {detailKursus.level}
                    </p>
                  </div>
                </div>

                {/* Judul Kursus */}
                <h1 className="text-2xl font-semibold">{detailKursus.title}</h1>

                {/* Tools yang digunakan */}
                <div className="flex flex-wrap gap-1">
                  {toolsArray(detailKursus.tools)}
                </div>

                {/* Deskripsi singkat */}
                <p>{detailKursus.brief_description}</p>
              </div>
            </div>

            {/* Navigasi untuk konten */}
            <nav className="w-full mx-auto lg:w-[25%] h-max p-4 rounded-lg bg-white/50 backdrop-blur-md text-center flex flex-col gap-2">
              <Link
                href={"/kursus/overview"}
                className="block bg-primary1 text-white hover:bg-primary2 focus:ring-primary5 px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
              >
                Belajar Sekarang
              </Link>
              <Link
                href={"#deskripsi"}
                onClick={() => setActiveSection("deskripsi")}
                className="block text-black border border-neutral4 hover:text-black hover:bg-neutral5 focus:ring-neutral4 px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
              >
                Informasi Kursus
              </Link>
              <Link
                href={"#testimoni"}
                onClick={() => setActiveSection("testimoni")}
                className="block text-black border border-neutral4 hover:text-black hover:bg-neutral5 focus:ring-neutral4 px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
              >
                Lihat Testimoni
              </Link>
            </nav>
          </div>
        </section>
        <section className="px-2 lg:px-4 py-4 w-full bg-white">
          <div className="max-w-5xl mx-auto py-6">
            <div className="mb-4">
              <h2 className="text-xl">Keuntungan yang akan Anda dapatkan</h2>
            </div>
            <div className="fill-primary1 flex gap-4">
              {keuntungan.map((k, index) => (
                <div
                  key={index}
                  className="max-w-80 p-4 border border-neutral4 rounded-lg"
                >
                  <div className="flex gap-2 items-center mb-3">
                    <div className="w-8 h-8">{k.icon}</div>
                    <p className="font-medium text-lg">{k.title}</p>
                  </div>
                  <p className="text-neutral2 text-sm">{k.desription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigasi untuk management active section */}
        <nav className="sticky top-0 left-0 z-50 w-full bg-white py-4 border-y border-neutral4 px-2 lg:px-4">
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
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked(detailKursus.description),
                    }}
                    className="prose prose-slate"
                  />
                  {/* <h3 className="mb-1">Deskripsi</h3>
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
                  </div> */}
                </div>

                {/* Deskripsi Pelengkap */}
                <div id="deskripsi-pelengkap" className="md:w-[20%]">
                  {/* <div className="pb-4 border-b">
                    <h4 className="mb-1">Peralatan Belajar</h4>
                    <div className="text-neutral2">Lorem ipsum dolor sit.</div>
                  </div> */}
                  <div className="py-4">
                    <h4 className="mb-1">Metode Ajar</h4>
                    <div className="text-neutral2 flex flex-wrap gap-1">
                      {toolsArray(detailKursus.teaching_method)}
                    </div>
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
            <div
              id="asisten"
              className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4"
            >
              {detailKursus.assistants.map((assistant, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="w-full h-56 md:h-64 overflow-hidden rounded-xl">
                    <Image
                      src={assistant.image}
                      alt={assistant.name}
                      width={300}
                      height={300}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p className="text-neutral2 text-xs md:text-sm lg:text-base">
                      {assistant.nim}
                    </p>
                    <p className="text-neutral1 text-base md:text-lg lg:text-xl font-semibold">
                      {assistant.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Testimoi */}
          {activeSection === "testimoni" && (
            <div
              id="testimoni"
              className="max-w-5xl min-h-96 mx-auto grid frid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8"
            >
              {detailKursus.testimonials.map((testimoni, index) => (
                <div key={index} className="flex gap-3 items-center w-full">
                  <div className="min-w-36 min-h-36 max-w-36 max-h-36 overflow-hidden rounded-lg">
                    <Image
                      src={testimoni.image}
                      alt={testimoni.name}
                      width={150}
                      height={150}
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm md:text-base mb-2 font-medium">
                      “{testimoni.comment}”
                    </p>
                    <div className="flex justify-between gap-1">
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
                        <p className="text-xs md:text-sm">{testimoni.rating}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs md:text-sm font-semibold">
                          {testimoni.name}
                        </p>
                        <p className="text-xs md:text-sm">{testimoni.nim}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DetailKursusPage;
