"use client";
import { getDetailCourse } from "@/app/api/courses";
import Footer from "@/app/component/general/Footer";
import Header from "@/app/component/general/Header";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const keuntungan = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m480-483-68 52q-6 5-12 .5t-4-11.5l26-84-70-56q-5-5-3-11.5t9-6.5h86l26-82q2-7 10-7t10 7l26 82h85q7 0 9.5 6.5T608-582l-71 56 26 84q2 7-4 11.5t-12-.5l-67-52Zm0 363L293-58q-20 7-36.5-5T240-95v-254q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v254q0 20-16.5 32T667-58l-187-62Zm0-200q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
      </svg>
    ),
    title: "1on1 Asistensi",
    description:
      "Tatap muka langsung dengan Asisten berpengalaman untuk membantu pembelajaran Anda.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m480-483-68 52q-6 5-12 .5t-4-11.5l26-84-70-56q-5-5-3-11.5t9-6.5h86l26-82q2-7 10-7t10 7l26 82h85q7 0 9.5 6.5T608-582l-71 56 26 84q2 7-4 11.5t-12-.5l-67-52Zm0 363L293-58q-20 7-36.5-5T240-95v-254q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v254q0 20-16.5 32T667-58l-187-62Zm0-200q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
      </svg>
    ),
    title: "Sertifikat",
    description:
      "Dapatkan sertifikat resmi setelah berhasil menyelesaikan kelas ini.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m354-480 58-58q12-12 11.5-28T412-594q-12-12-28.5-12.5T355-595l-87 87q-12 12-12 28t12 28l87 87q12 12 28.5 11.5T412-366q11-12 11.5-28T412-422l-58-58Zm252 0-58 58q-12 12-11.5 28t11.5 28q12 12 28.5 12.5T605-365l87-87q12-12 12-28t-12-28l-87-87q-12-12-28.5-11.5T548-594q-11 12-11.5 28t11.5 28l58 58ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm280-590q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
      </svg>
    ),
    title: "Code Review",
    description:
      "Kode yang Anda buat akan diperiksa secara mendalam oleh Asisten.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M280-240q-17 0-28.5-11.5T240-280v-80h520v-360h80q17 0 28.5 11.5T880-680v503q0 27-24.5 37.5T812-148l-92-92H280Zm-40-200-92 92q-19 19-43.5 8.5T80-377v-463q0-17 11.5-28.5T120-880h520q17 0 28.5 11.5T680-840v360q0 17-11.5 28.5T640-440H240Zm360-80v-280H160v280h440Zm-440 0v-280 280Z" />
      </svg>
    ),
    title: "Forum Diskusi",
    description:
      "Diskusikan materi pembelajaran dengan sesama mahasiswa untuk memperdalam pemahaman.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
      </svg>
    ),
    title: "Modul Tutorial",
    description:
      "Materi bacaan elektronik disajikan dengan bahasa yang sederhana dan mudah dipahami.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m437-355-56-56q-6-6-13-9t-14.5-3q-7.5 0-15 3t-13.5 9q-12 12-12 28.5t12 28.5l85 86q6 6 13 8.5t15 2.5q8 0 15-2.5t13-8.5l169-169q12-12 12-29t-12-29q-12-12-29-12t-29 12L437-355ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z" />
      </svg>
    ),
    title: "Submission",
    description:
      "Uji kemampuan teknis Anda dengan mengerjakan tugas-tugas submission.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="m193-479 155 155q11 11 11 28t-11 28q-11 11-28 11t-28-11L108-452q-6-6-8.5-13T97-480q0-8 2.5-15t8.5-13l184-184q12-12 28.5-12t28.5 12q12 12 12 28.5T349-635L193-479Zm574-2L612-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L668-268q-12 12-28 11.5T612-269q-12-12-12-28.5t12-28.5l155-155Z" />
      </svg>
    ),
    title: "Kode Interaktif",
    description:
      "Modul belajar interaktif berupa video, lengkap dengan latihan-latihan untuk menguji pemahaman.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M720-120q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80q8 0 14-6t6-14v-120q0-8-6-14t-14-6q-8 0-14 6t-6 14v120q0 8 6 14t14 6Zm-560 0v-15 15-440 440Zm0 80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v120q0 17-11.5 28T840-481q-17 0-28.5-11.5T800-521v-119H160v440h260q17 0 28.5 11.5T460-160q0 17-11.5 28.5T420-120H160Zm240-600h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z" />
      </svg>
    ),
    title: "Studi Kasus",
    description:
      "Tingkatkan keterampilan Anda dengan menyelesaikan studi kasus nyata.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm120-80h200q17 0 28.5-11.5T560-320q0-17-11.5-28.5T520-360H320q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160h320q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160h320q17 0 28.5-11.5T680-640q0-17-11.5-28.5T640-680H320q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm160-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
      </svg>
    ),
    title: "Ujian",
    description:
      "Validasi pengetahuan Anda melalui serangkaian soal-soal ujian.",
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

  const keuntunganNavRef = useRef<HTMLDivElement>(null);

  const keuntunganNavScrollLeft = () => {
    if (keuntunganNavRef.current) {
      keuntunganNavRef.current.scrollBy({
        left: -335,
        behavior: "smooth",
      });
    }
  };

  const keuntunganNavScrollRight = () => {
    if (keuntunganNavRef.current) {
      keuntunganNavRef.current.scrollBy({
        left: 335,
        behavior: "smooth",
      });
    }
  };

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
                href={"/learning-path"}
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
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl">Keuntungan yang akan Anda dapatkan</h2>
              {/* Next Prev */}
              <div className="hidden lg:block">
                <button
                  className="fill-neutral3 hover:fill-neutral1"
                  onClick={keuntunganNavScrollLeft}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="32px"
                    viewBox="0 -960 960 960"
                    width="32px"
                  >
                    <path d="M472-440h128q17 0 28.5-11.5T640-480q0-17-11.5-28.5T600-520H472l36-36q11-11 11-28t-11-28q-11-11-28-11t-28 11L348-508q-12 12-12 28t12 28l104 104q11 11 28 11t28-11q11-11 11-28t-11-28l-36-36Zm8 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </button>
                <button
                  className="fill-neutral3 hover:fill-neutral1"
                  onClick={keuntunganNavScrollRight}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="32px"
                    viewBox="0 -960 960 960"
                    width="32px"
                  >
                    <path d="m488-440-36 36q-11 11-11 28t11 28q11 11 28 11t28-11l104-104q12-12 12-28t-12-28L508-612q-11-11-28-11t-28 11q-11 11-11 28t11 28l36 36H360q-17 0-28.5 11.5T320-480q0 17 11.5 28.5T360-440h128Zm-8 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <div
                ref={keuntunganNavRef}
                className="fill-primary1 flex gap-4 overflow-x-scroll no-scrollbar"
              >
                {keuntungan.map((k, index) => (
                  <div
                    key={index}
                    className="min-w-80 p-4 border border-neutral4 rounded-lg"
                  >
                    <div className="flex gap-2 items-center mb-3">
                      <div className="w-8 h-8">{k.icon}</div>
                      <p className="font-medium text-lg">{k.title}</p>
                    </div>
                    <p className="text-neutral2 text-sm">{k.description}</p>
                  </div>
                ))}
              </div>
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
                <div id="deskripsi-utama" className="md:w-[60%] lg:w-[80%]">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked(detailKursus.description),
                    }}
                    className="prose prose-slate"
                  />
                </div>

                {/* Deskripsi Pelengkap */}
                <div id="deskripsi-pelengkap" className="md:w-[30%] xl:w-[40%]">
                  {/* Metode Ajar */}
                  <div className="py-4 text-neutral1">
                    <h4 className="mb-1 font-semibold">Metode Ajar</h4>
                    <div>
                      <h5 className="text-sm font-medium">
                        Online Self Learning
                      </h5>
                      <p className="text-sm mt-0.5 mb-2">
                        Anda tentukan sendiri berapa lama waktu yang akan
                        digunakan untuk belajar materi kelas ini selama masih
                        aktif terdaftar pada kelas.
                      </p>
                      <h5 className="text-sm font-medium">1on1 Asistensi</h5>
                      <p className="text-sm mt-0.5 mb-2">
                        Datang langsung ke H.6 sesuai dengan jadwal yang telah
                        ditentukan
                      </p>

                      <h5 className="text-sm font-medium">
                        Evaluasi pembelajaran
                      </h5>
                      <ol className="text-sm mt-0.5 mb-2">
                        <li>Studi kasus kursus</li>
                        <li>Ujian akhir kelas</li>
                        <li>Submission (proyek akhir)</li>
                      </ol>
                    </div>
                    <h5 className="text-sm font-medium">Tag</h5>
                    <div className="text-neutral2 flex flex-wrap gap-1 mt-1">
                      {toolsArray(detailKursus.teaching_method)}
                    </div>
                  </div>

                  {/* Spesifikasi */}
                  <div className="py-4 text-neutral1">
                    <h4 className="mb-1 font-semibold">
                      Spesifikasi Minimal Perangkat
                    </h4>
                    <p className="text-sm mb-2">
                      Kelas ini membutuhkan spesifikasi perangkat seperti
                      berikut:
                    </p>
                    <div>
                      <h5 className="text-sm font-medium">RAM</h5>
                      <p className="text-sm mt-0.5 mb-2">
                        4 GB (Rekomendasi 8 GB)
                      </p>
                      <h5 className="text-sm font-medium">Layar</h5>
                      <p className="text-sm mt-0.5 mb-2">
                        1024 x 768 (Rekomendasi Full HD 1920 x 1080)
                      </p>
                      <h5 className="text-sm font-medium">Sistem Operasi</h5>
                      <p className="text-sm mt-0.5 mb-2">
                        Windows, Linux, MacOS
                      </p>
                      <h5 className="text-sm font-medium">Prosesor</h5>
                      <p className="text-sm mt-0.5">
                        Intel Core i3 (Rekomendasi Core i5 ke atas)
                      </p>
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
              className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4"
            >
              {detailKursus.assistants.map((assistant, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="w-full h-36 md:h-52 overflow-hidden rounded-lg">
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
                    <p className="text-neutral1 text-sm md:text-base lg:text-lg font-semibold">
                      {assistant.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Testimoi */}
          {activeSection === "testimoni" &&
            (detailKursus.testimonials.length > 0 ? (
              <div
                id="testimoni"
                className="max-w-5xl min-h-96 mx-auto grid frid-cols-1 md:grid-cols-2 gap-2"
              >
                {detailKursus.testimonials.map((testimoni, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center w-full border border-neutral4 rounded-xl p-2"
                  >
                    <div className="min-w-32 min-h-32 max-w-32 max-h-32 overflow-hidden rounded-lg">
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
                          <p className="text-xs md:text-sm">
                            {testimoni.rating}
                          </p>
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
            ) : (
              <div className="max-w-5xl min-h-96 mx-auto">
                <p className="text-neutral2 font-medium text-sm lg:text-base">Belum ada testimoni di kursus ini</p>
              </div>
            ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DetailKursusPage;
