import React from "react";

const SkeletonLearningPath = () => {
  return (
    <>
      <div className="top-content flex flex-col justify-center items-center">
        <div className="title-path bg-gray-300 h-8 w-1/2 mb-4"></div>
        <div className="desc-path mt-2 w-full text-center flex items-center justify-center">
          <div className="bg-gray-300 h-6 w-2/3"></div>
        </div>
        <div className="w-[12vw] mt-4 bg-gray-300 h-10"></div>
      </div>
      <section className="w-full h-[80vh] flex justify-between gap-24 mt-14">
        <div className="kursus-content flex flex-col gap-16 mt-5 w-2/3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="card-kursus border p-7 flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <div className="bg-gray-300 h-6 w-1/4"></div>
                <div className="rating flex items-center">
                  <div className="bg-gray-300 h-6 w-10"></div>
                </div>
              </div>
              <div className="bg-gray-300 h-6 w-1/2"></div>
              <div className="flex flex-col">
                <div className="infoDetail flex gap-5 justify-between w-full">
                  <div className="level flex">
                    <div className="bg-gray-300 h-6 w-1/4"></div>
                  </div>
                  <div className="infoDetail-down flex justify-between gap-5">
                    <div className="bg-gray-300 h-6 w-1/4"></div>
                    <div className="bg-gray-300 h-6 w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block w-1 rounded-t-full bg-gray-300 mx-4"></div>
        <div className="step-content mt-5 flex flex-col gap-10 w-2/3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card-kursus flex flex-col gap-1 mt-3">
              <div className="bg-gray-300 h-6 w-1/2 mb-2"></div>
              <div className="bg-gray-300 h-6 w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
      <section className="list-kelas my-12">
        <h2 className="text-center mb-4 bg-gray-300 h-8 w-1/4 mx-auto"></h2>
        <div className="info-kelas">
          <div className="overflow-x-auto border p-5 rounded-md">
            <h3 className="bg-gray-300 h-6 w-1/4 mb-4"></h3>
            <div className="bg-gray-300 h-6 w-1/2 mb-5"></div>
            <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-md overflow-hidden">
              <thead className="text-sm text-neutral2 bg-gray-100">
                <tr>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <th key={index} className="px-6 py-3 bg-gray-300 h-6"></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-300 h-6 w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="bg-gray-300 h-6 w-full"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="bg-gray-300 h-6 w-full"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="bg-gray-300 h-6 w-full"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="bg-gray-300 h-6 w-full"></div>
                    </td>
                    <td className="py-4 flex justify-center">
                      <div className="bg-gray-300 h-10 w-20"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkeletonLearningPath;
