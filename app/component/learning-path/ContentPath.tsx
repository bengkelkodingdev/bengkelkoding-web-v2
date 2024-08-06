import React, { useEffect, useState } from "react";
import Button from "../general/Button";
import {
  DataPath,
  ListKelasPath,
  ListKelasPathResponse,
  PathResponse,
} from "@/app/interface/LearningPath";
import { getDetaiLearningPath } from "@/app/api/learning-path/getDetail-learningPath";
import SkeletonLearningPath from "../skleton/SkeletonLearningPath";
import { getListKelasLearningPath } from "@/app/api/learning-path/getListKelas-learningPath";

const ContentPath = ({ selectedMenu }) => {
  const [dataPath, setDataPath] = useState<PathResponse | null>(null);
  const [kelasPath, setKelasPath] = useState<ListKelasPathResponse | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPathData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDetaiLearningPath(selectedMenu);
      const responseKelas = await getListKelasLearningPath(selectedMenu);
      setKelasPath(responseKelas);
      setDataPath(response);
      console.log("data id:", selectedMenu, " hasilnya:", response);
    } catch (error) {
      console.error("Error", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMenu) {
      fetchPathData();
    }
  }, [selectedMenu]);

  if (loading) {
    return <SkeletonLearningPath />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log(dataPath.data.roadmap);

  return (
    <>
      {/* top content */}
      <div className="top-content flex flex-col justify-center items-center">
        <h1 className="title-path text-center">{dataPath.data.path.name}</h1>
        <div className="desc-path mt-2 w-full text-center flex items-center justify-center ">
          <p className="w-2/3"> {dataPath.data.path.description}</p>
        </div>
        <Button text="Daftar Kelas" className="w-[12vw] mt-4" />
      </div>
      ;{/* Path content */}
      <section className=" w-full h-full flex justify-between gap-24 mt-14">
        <div className="kursus-content flex flex-col gap-10  w-full">
          {dataPath.data.roadmap.map((_, index) => (
            <div className="card-kursus border p-7 flex flex-col gap-2 ">
              <div className="flex justify-between">
                <p className=" font-medium text-gray-500">
                  {dataPath.data.roadmap[index].title}
                </p>
                {/* rating */}
                <div className="rating flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#FFFF55"
                  >
                    <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Z" />
                  </svg>
                  <p> {dataPath.data.roadmap[index].course.rating}</p>
                </div>
              </div>
              <p className="title-kursus font-semibold text-lg">
                {dataPath.data.roadmap[index].course.title}
              </p>
              <p className="title-kursus font-normal text-lg mb-2">
                {dataPath.data.roadmap[index].description}
              </p>
              <div className="flex flex-col">
                <div className="infoDetail flex gap-5 justify-between w-full">
                  {/* level */}
                  <div className="level flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#321D71"
                    >
                      <path d="M200-160v-240h120v240H200Zm240 0v-440h120v440H440Zm240 0v-640h120v640H680Z" />
                    </svg>
                    <p> {dataPath.data.roadmap[index].course.level}</p>
                  </div>
                  <div className="infoDetail-down flex justify-between gap-5">
                    {/* modul */}
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
                      <p>
                        {" "}
                        {
                          dataPath.data.roadmap[index].course.module_count
                        } Modul{" "}
                      </p>
                    </div>

                    {/* jumlah mhs */}
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#999999"
                      >
                        <path d="M840-280v-276L480-360 40-600l440-240 440 240v320h-80ZM480-120 200-272v-200l280 152 280-152v200L480-120Z" />
                      </svg>
                      <p>
                        {" "}
                        {dataPath.data.roadmap[index].course.student_count} Mhs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/*  */}
        </div>
        {/* batas */}
        <div className="hidden md:block w-1 rounded-t-full bg-blue-800 mx-4"></div>{" "}
        {/* step */}
        <div className="step-content flex flex-col gap-10 w-full">
          {dataPath.data.roadmap.map((_, index) => (
            <div className="card-kursus  flex flex-col gap-1">
              <p className="numberKursus font-semibold text-lg">
                {dataPath.data.roadmap[index].course.brief_description}
              </p>
              <p className="title-kursus text-justify">
                {dataPath.data.roadmap[index].course.description}
              </p>
            </div>
          ))}
          {/* dibikin card aja nanti di loop kasih props juga */}

          {/* end card */}
        </div>
      </section>
      ;{/* daftar kelas */}
      <section className="list-kelas my-12">
        <h2 className="text-center mb-4">Daftar kelas</h2>
        <div className="info-kelas">
          <div className="overflow-x-auto border p-5 rounded-md">
            <h3>Kelas Aktif</h3>
            <p className="mb-5">
              Lihat kelas aktif yang berada di Bengkel Koding
            </p>
            <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-md overflow-hidden">
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
                    <td className=" py-4 flex justify-center">
                      <Button text="Masuk" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      ;
    </>
  );
};

export default ContentPath;
