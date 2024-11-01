"use client";
import { getAdminCourse } from "@/app/api/admin/course";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailKursusPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = usePathname();
  const segments = url.split("/"); // Split the URL by '/'
  const courseId = segments[segments.indexOf("kursus") + 1];

  const [course, setCourse] = useState({
    id: 0,
    title: "",
    image: "",
    background_image: "",
    author: "",
    url_trailer: "",
    description: "",
    brief_description: "",
    tools: "",
    teaching_method: "",
    level: "",
    category: "",
  });

  const fetchData = async () => {
    try {
      // Response courses
      const responseCourse = await getAdminCourse(courseId);
      setCourse(responseCourse.data);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <section
        className="relative px-2 lg:px-4 py-10 lg:py-20 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url("/img/bg-detail-kelas.png")` }}
      >
        <div className="absolute inset-0 bg-black opacity-[0.03]" />
        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 lg:gap-10">
          <div className="lg:w-[70%] flex gap-6">
            <Image
              src={course.image}
              alt="Kursus 1"
              width={800}
              height={500}
              className="hidden lg:block max-w-64 h-max rounded-lg"
            />
            <div className="text-black flex flex-col gap-2 md:gap-3 lg:gap-4">
              {/* Informasi Level */}
              <div className="flex gap-4">
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
                  <p className="text-black font-semibold">{course.level}</p>
                </div>
              </div>

              {/* Judul Kursus */}
              <h1 className="text-2xl font-semibold">{course.title}</h1>

              {/* Tools yang digunakan */}
              <div className="flex flex-wrap gap-1">
                {toolsArray(course.tools)}
              </div>

              {/* Deskripsi singkat */}
              <p>{course.brief_description}</p>
            </div>
          </div>

          {/* Navigasi */}
          <nav className="w-full mx-auto lg:w-[25%] h-max p-4 rounded-lg bg-white/50 backdrop-blur-md text-center flex flex-col gap-2">
            <Link
              href={`${course.id}/section`}
              className="block bg-primary1 text-white hover:bg-primary2 focus:ring-primary5 px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              List Section
            </Link>
            <Link
              href={`${course.id}/edit`}
              className="block bg-neutral6 text-black hover:bg-neutral5 focus:ring-neutral5 border px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              Edit Kursus
            </Link>
          </nav>
        </div>
      </section>
      <section className="px-2 lg:px-4 py-4 w-full bg-white">
        <div id="deskripsi" className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Deskripsi Utama */}
            <div id="deskripsi-utama" className="py-4 d:w-[60%] lg:w-[80%]">
              <div className="mb-4">
                <h4 className="mb-1 font-semibold">Author</h4>
                <h5 className="font-medium">{course.author}</h5>
              </div>
              <div className="mb-4">
                <h4 className="mb-1 font-semibold">Category</h4>
                <div className="text-neutral2 flex flex-wrap gap-1 mt-1">
                  {toolsArray(course.category)}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="mb-1 font-semibold">URL Trailer</h4>
                <Link href={course.url_trailer} className="italic">
                  {course.url_trailer}
                </Link>
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Deskripsi</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(course.description),
                  }}
                  className="prose prose-slate"
                />
              </div>
            </div>

            {/* Deskripsi Pelengkap */}
            <div id="deskripsi-pelengkap" className="md:w-[30%] xl:w-[40%]">
              {/* Metode Ajar */}
              <div className="py-4 text-neutral1">
                <h4 className="mb-1 font-semibold">Metode Ajar</h4>
                <div>
                  <h5 className="text-sm font-medium">Online Self Learning</h5>
                  <p className="text-sm mt-0.5 mb-2">
                    Anda tentukan sendiri berapa lama waktu yang akan digunakan
                    untuk belajar materi kelas ini selama masih aktif terdaftar
                    pada kelas.
                  </p>
                  <h5 className="text-sm font-medium">1on1 Asistensi</h5>
                  <p className="text-sm mt-0.5 mb-2">
                    Datang langsung ke H.6 sesuai dengan jadwal yang telah
                    ditentukan
                  </p>

                  <h5 className="text-sm font-medium">Evaluasi pembelajaran</h5>
                  <ol className="text-sm mt-0.5 mb-2">
                    <li>Studi kasus kursus</li>
                    <li>Ujian akhir kelas</li>
                    <li>Submission (proyek akhir)</li>
                  </ol>
                </div>
                <h5 className="text-sm font-medium">Tag</h5>
                <div className="text-neutral2 flex flex-wrap gap-1 mt-1">
                  {toolsArray(course.teaching_method)}
                </div>
              </div>

              {/* Spesifikasi */}
              <div className="py-4 text-neutral1">
                <h4 className="mb-1 font-semibold">
                  Spesifikasi Minimal Perangkat
                </h4>
                <p className="text-sm mb-2">
                  Kelas ini membutuhkan spesifikasi perangkat seperti berikut:
                </p>
                <div>
                  <h5 className="text-sm font-medium">RAM</h5>
                  <p className="text-sm mt-0.5 mb-2">4 GB (Rekomendasi 8 GB)</p>
                  <h5 className="text-sm font-medium">Layar</h5>
                  <p className="text-sm mt-0.5 mb-2">
                    1024 x 768 (Rekomendasi Full HD 1920 x 1080)
                  </p>
                  <h5 className="text-sm font-medium">Sistem Operasi</h5>
                  <p className="text-sm mt-0.5 mb-2">Windows, Linux, MacOS</p>
                  <h5 className="text-sm font-medium">Prosesor</h5>
                  <p className="text-sm mt-0.5">
                    Intel Core i3 (Rekomendasi Core i5 ke atas)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailKursusPage;
