import Image from "next/image";
import React from "react";

const DashboardDetailKelasPage = () => {
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
    </>
  );
};

export default DashboardDetailKelasPage;
