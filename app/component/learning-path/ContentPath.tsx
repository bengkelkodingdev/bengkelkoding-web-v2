import React, { useEffect, useRef, useState } from "react";
import Button from "../general/Button";

import {
  ListKelasPathResponse,
  PathResponse,
} from "@/app/interface/LearningPath";

import SkeletonLearningPath from "../skleton/SkeletonLearningPath";
import {
  getDetailLearningPaths,
  getListKelasLearningPath,
} from "@/app/api/learning-path/API-LearningPath";
import Modal from "../general/Modal";
import Input from "../general/Input";
import { loggedIn } from "@/app/api/checkAccessToken";
import { postAktivasiToken } from "@/app/api/learning-path/aktivasiToken";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ContentPath = ({ selectedMenu }) => {
  const [dataPath, setDataPath] = useState<PathResponse | null>();
  const [kelasPath, setKelasPath] = useState<ListKelasPathResponse | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const daftarKelasRef = useRef<HTMLElement | null>(null);

  const login = loggedIn();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classroomId, setClassroomId] = useState(0);
  const [token, setToken] = useState("");
  const handleOpenModalAktivasiToken = (id_classroom: number) => {
    setIsModalOpen(true);
    setClassroomId(id_classroom);
  };
  const handleCloseModalAktivasiToken = () => {
    setIsModalOpen(false);
  };

  const handlePostActivateToken = async () => {
    try {
      const response = await postAktivasiToken(classroomId, token);

      // Success handling
      toast.success("Anda Berhasil Mengaktifkan Token 😁");
      setIsModalOpen(false);
      window.location.href = `./dashboard/student`;
    } catch (error) {
      // Log error and show toast message
      console.error("Failed to activate token", error);
      toast.error("Gagal Mengaktifkan Token 😔");
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    const fetchPathData = async () => {
      setLoading(true);
      setError(null);
      try {
        // detail learning path
        let response = await getDetailLearningPaths(selectedMenu);
        setDataPath(response);

        // list classroom
        response = await getListKelasLearningPath(selectedMenu);
        setKelasPath(response);
      } catch (error) {
        console.error("Error", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (selectedMenu) {
      fetchPathData();
    }
  }, [selectedMenu]);

  const scrollToDaftarKelas = () => {
    if (daftarKelasRef.current) {
      daftarKelasRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return <SkeletonLearningPath />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* top content */}
      <div className="top-content max-w-5xl mx-auto my-2 lg:my-10 2xl:my-12 flex flex-col justify-center items-center">
        <h1 className="title-path text-center">
          {" "}
          <strong className="font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            {dataPath.data.path.name}
          </strong>{" "}
        </h1>
        <div className="desc-path mt-2 w-full text-center flex items-center justify-center ">
          <p className="text-neutral2 max-w-3xl">
            {" "}
            {dataPath.data.path.description}
          </p>
        </div>
        <Button
          text="Daftar Kelas"
          className="mt-4"
          onClick={scrollToDaftarKelas}
        />
      </div>

      {/* Path content */}
      <section className=" max-w-5xl mx-auto my-2 lg:my-10 2xl:my-12 h-full flex flex-col gap-4 sm:mt-14 p-2">
        {dataPath.data.roadmap.map((_, index) => (
          <div
            className="card-kursus flex flex-col sm:flex-row gap-0 sm:gap-12"
            key={index}
          >
            {isMobile ? (
              <>
                {/* Garis dan nomor */}
                <div className="flex flex-col  items-center justify-center relative sm:w-[12px] md:w-auto">
                  {/* Garis Vertikal dengan Gradient */}
                  <div className="sm:w-[2px] sm:h-20 h-20 w-[2px] flex-grow bg-gradient-to-b from-transparent to-[rgb(17,32,198)]"></div>
                  {/* Nomor */}
                  <div className="z-10 font-bold p-2">{index + 1}</div>
                  {/* Garis Vertikal dengan Gradient */}
                </div>
                {/* Left Section */}
                <div className="py-0 sm:w-[45vw] flex-grow">
                  <div className="flex mb-5 flex-col border p-3  gap-4">
                    <div className="flex justify-between">
                      {/* Level */}
                      <div className="level flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 -960 960 960"
                          width="18px"
                          className="fill-green-500"
                        >
                          <path d="M120-200q-17 0-28.5-11.5T80-240q0-17 11.5-28.5T120-280h200v-200q0-17 11.5-28.5T360-520h200v-200q0-17 11.5-28.5T600-760h240q17 0 28.5 11.5T880-720q0 17-11.5 28.5T840-680H640v200q0 17-11.5 28.5T600-440H400v200q0 17-11.5 28.5T360-200H120Z" />
                        </svg>
                        <p className="ml-2">
                          {dataPath.data.roadmap[index].course.level}
                        </p>
                      </div>
                      {/* Rating */}
                      <div className="rating flex items-center">
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
                        <p className="ml-2">
                          {dataPath.data.roadmap[index].course.rating}
                        </p>
                      </div>
                    </div>
                    <p className="title-kursus font-semibold text-lg">
                      {dataPath.data.roadmap[index].course.title}
                    </p>
                    <p className="font-normal text-base mb-2">
                      {dataPath.data.roadmap[index].course.brief_description}
                    </p>
                    <div className="flex justify-between ">
                      {/* Modul */}
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#999999"
                        >
                          <path d="M707-500q-33 0-56.5-23.5T627-580v-100q0-33 23.5-56.5T707-760h53q33 0 56.5 23.5T840-680v100q0 33-23.5 56.5T760-500h-53Zm-253 0q-33 0-56.5-23.5T374-580v-100q0-33 23.5-56.5T454-760h53q33 0 56.5 23.5T587-680v100q0 33-23.5 56.5T507-500h-53Zm-253 0q-33 0-56.5-23.5T121-580v-100q0-33 23.5-56.5T201-760h53q33 0 56.5 23.5T334-680v100q0 33-23.5 56.5T254-500h-53Zm0 300q-33 0-56.5-23.5T121-280v-100q0-33 23.5-56.5T201-460h53q33 0 56.5 23.5T334-380v100q0 33-23.5 56.5T254-200h-53Zm253 0q-33 0-56.5-23.5T374-280v-100q0-33 23.5-56.5T454-460h53q33 0 56.5 23.5T587-380v100q0 33-23.5 56.5T507-200h-53Zm253 0q-33 0-56.5-23.5T627-280v-100q0-33 23.5-56.5T707-460h53q33 0 56.5 23.5T840-380v100q0 33-23.5 56.5T760-200h-53Z" />
                        </svg>
                        <p className="ml-2">
                          {dataPath.data.roadmap[index].course.module_count}{" "}
                          Modul
                        </p>
                      </div>
                      {/* Jumlah Mhs */}
                      <div className="flex items-center">
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
                        <p className="ml-2 text-sm">
                          {dataPath.data.roadmap[index].course.student_count}{" "}
                          Siswa terdaftar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="py-0 sm:w-[45vw] flex items-center ">
                  <div className="flex gap-2 flex-col px-4 sm:py-10">
                    <p className="numberKursus font-semibold text-lg">
                      {dataPath.data.roadmap[index].title}
                    </p>
                    <p className="title-kursus text-base text-justify text-neutral2">
                      {dataPath.data.roadmap[index].description}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Left Section */}
                <div className="py-0 sm:w-[45vw] flex-grow">
                  <div className="flex flex-col border p-3  gap-4">
                    <div className="flex justify-between">
                      {/* Level */}
                      <div className="level flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 -960 960 960"
                          width="18px"
                          className="fill-green-500"
                        >
                          <path d="M120-200q-17 0-28.5-11.5T80-240q0-17 11.5-28.5T120-280h200v-200q0-17 11.5-28.5T360-520h200v-200q0-17 11.5-28.5T600-760h240q17 0 28.5 11.5T880-720q0 17-11.5 28.5T840-680H640v200q0 17-11.5 28.5T600-440H400v200q0 17-11.5 28.5T360-200H120Z" />
                        </svg>
                        <p className="ml-2">
                          {dataPath.data.roadmap[index].course.level}
                        </p>
                      </div>
                      {/* Rating */}
                      <div className="rating flex items-center">
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
                        <p className="ml-2">
                          {dataPath.data.roadmap[index].course.rating}
                        </p>
                      </div>
                    </div>
                    <p className="title-kursus font-semibold text-lg">
                      {dataPath.data.roadmap[index].course.title}
                    </p>
                    <p className="font-normal text-base mb-2">
                      {dataPath.data.roadmap[index].course.brief_description}
                    </p>
                    <div className="flex flex-col md:flex-row md:justify-between  ">
                      {/* Modul */}
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#999999"
                        >
                          <path d="M707-500q-33 0-56.5-23.5T627-580v-100q0-33 23.5-56.5T707-760h53q33 0 56.5 23.5T840-680v100q0 33-23.5 56.5T760-500h-53Zm-253 0q-33 0-56.5-23.5T374-580v-100q0-33 23.5-56.5T454-760h53q33 0 56.5 23.5T587-680v100q0 33-23.5 56.5T507-500h-53Zm-253 0q-33 0-56.5-23.5T121-580v-100q0-33 23.5-56.5T201-760h53q33 0 56.5 23.5T334-680v100q0 33-23.5 56.5T254-500h-53Zm0 300q-33 0-56.5-23.5T121-280v-100q0-33 23.5-56.5T201-460h53q33 0 56.5 23.5T334-380v100q0 33-23.5 56.5T254-200h-53Zm253 0q-33 0-56.5-23.5T374-280v-100q0-33 23.5-56.5T454-460h53q33 0 56.5 23.5T587-380v100q0 33-23.5 56.5T507-200h-53Zm253 0q-33 0-56.5-23.5T627-280v-100q0-33 23.5-56.5T707-460h53q33 0 56.5 23.5T840-380v100q0 33-23.5 56.5T760-200h-53Z" />
                        </svg>
                        <p className="ml-2">
                          {dataPath.data.roadmap[index].course.module_count}{" "}
                          Modul
                        </p>
                      </div>
                      {/* Jumlah Mhs */}
                      <div className="flex items-center">
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
                        <p className="ml-2 text-sm">
                          {dataPath.data.roadmap[index].course.student_count}{" "}
                          Siswa terdaftar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Garis dan nomor */}
                <div className="flex flex-col  items-center justify-center relative sm:w-[12px] md:w-auto">
                  {/* Garis Vertikal dengan Gradient */}
                  <div className="sm:w-[2px] sm:h-20 h-11 w-[2px] flex-grow bg-gradient-to-b from-transparent to-[rgb(17,32,198)]"></div>
                  {/* Nomor */}
                  <div className="z-10 font-bold p-2">{index + 1}</div>
                  {/* Garis Vertikal dengan Gradient */}
                  <div className="sm:w-[2px] sm:h-20 h-11 w-[2px] flex-grow bg-gradient-to-t from-transparent to-[rgb(17,32,198)]"></div>
                </div>

                {/* Right Section */}
                <div className="py-0 sm:w-[45vw] flex items-center ">
                  <div className="flex gap-2 flex-col px-4 sm:py-10">
                    <p className="numberKursus font-semibold text-lg">
                      {dataPath.data.roadmap[index].title}
                    </p>
                    <p className="title-kursus text-base text-justify text-neutral2">
                      {dataPath.data.roadmap[index].description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* daftar kelas */}
      {isMobile ? (
        <section ref={daftarKelasRef} className="list-kelas my-12 w-[80%] ">
          <div className="my-4 text-center">
            <h2 className="text-center bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text  text-transparent font-bold text-3xl">
              Daftar Kelas
            </h2>
            <p className="text-neutral2">
              Lihat kelas aktif yang berada di Bengkel Koding
            </p>
          </div>
          <div className="info-kelas">
            <div className="overflow-x-auto border p-5 flex flex-col justify-center rounded-md">
              <div className="text-sm text-left rtl:text-right text-neutral3 rounded-md overflow-hidden">
                {kelasPath.data.map((KelasPathItem) => (
                  <div
                    key={KelasPathItem.id}
                    className="bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-4"
                  >
                    <div className="text-xs mb-2">
                      <p className="font-medium text-neutral2">
                        {KelasPathItem.name}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Hari:</span>
                      <span>{KelasPathItem.day}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Jam:</span>
                      <span>
                        {KelasPathItem.time_start}-{KelasPathItem.time_end}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Ruang:</span>
                      <span>{KelasPathItem.room}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Kuota:</span>
                      <span>
                        {KelasPathItem.student_count}/{KelasPathItem.quota}
                      </span>
                    </div>
                    <div className="flex justify-center mt-4">
                      {login ? (
                        <Button
                          text="Masuk"
                          onClick={() =>
                            handleOpenModalAktivasiToken(KelasPathItem.id)
                          }
                        />
                      ) : (
                        <Button
                          text="Masuk"
                          onClick={() => (window.location.href = "./masuk")}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          ref={daftarKelasRef}
          className="list-kelas max-w-5xl mx-auto my-2 lg:my-10 2xl:my-12"
        >
          <div className="my-6 text-center">
            <h2 className="text-center bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text  text-transparent font-bold text-3xl">
              Daftar Kelas
            </h2>
            <p className="text-neutral2">
              Lihat kelas aktif yang berada di Bengkel Koding
            </p>
          </div>
          <div className="info-kelas">
            <div className="overflow-x-auto flex flex-col justify-center rounded-md">
              <table className="text-sm text-left rtl:text-right text-neutral3 rounded-md overflow-hidden">
                <thead className="text-sm text-neutral2 bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Kelas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Hari
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Jam
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Ruang
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Kuota
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kelasPath.data.map((KelasPathItem) => (
                    <tr
                      key={KelasPathItem.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td scope="row" className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs">
                          <p className="font-medium text-neutral2">
                            {KelasPathItem.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">{KelasPathItem.day}</td>
                      <td className="px-6 py-4 text-center">
                        {KelasPathItem.time_start}-{KelasPathItem.time_end}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {KelasPathItem.room}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {KelasPathItem.student_count}/{KelasPathItem.quota}
                      </td>
                      <td className="py-4 flex justify-center">
                        {login ? (
                          <Button
                            text="Masuk"
                            onClick={() =>
                              handleOpenModalAktivasiToken(KelasPathItem.id)
                            }
                          />
                        ) : (
                          <Button
                            text="Masuk"
                            onClick={() => (window.location.href = "./masuk")}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      <Modal
        title="Aktivasi Token"
        isOpen={isModalOpen}
        onClose={handleCloseModalAktivasiToken}
      >
        <div className="mt-4">
          <Input
            label=""
            type="text"
            name="token"
            placeholder="Masukkan Token"
            required
            onChange={(e) => setToken(e.target.value)}
          />
          <Button
            text="Aktifkan Token"
            className="w-full"
            onClick={handlePostActivateToken}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ContentPath;
