import React from "react";

export default function SkeletonDetailKelas() {
  return (
    <div>
      <h1 className="h-8 w-3/4 bg-gray-200 animate-pulse mb-4"></h1>

      <div className="flex flex-col lg:flex-row gap-6 2xl:gap-10">
        <div className="w-full">
          <div className="grid grid-cols-2 lg:flex items-center gap-x-2 md:gap-5 text-xs text-neutral2">
            <p className="h-4 w-1/4 bg-gray-200 animate-pulse"></p>
            <p className="h-4 w-1/4 bg-gray-200 animate-pulse"></p>
            <p className="h-4 w-1/4 bg-gray-200 animate-pulse"></p>
            <p className="h-4 w-1/4 bg-gray-200 animate-pulse"></p>
          </div>
          <p className="mt-4 h-4 w-full bg-gray-200 animate-pulse"></p>
        </div>
        <table className="min-w-max text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
          <thead className=" text-neutral2 bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 w-max">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 w-max">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <article className=" mx-auto">
        {/* Navigasi untuk management active section */}
        <nav className="flex">
          {Array.from({ length: 3 }).map((_, index) => (
            <button
              key={index}
              className="w-max px-4 py-2 font-medium rounded-t-md transition-all ease-in-out duration-200 bg-gray-200 animate-pulse"
            >
              &nbsp;
            </button>
          ))}
        </nav>

        <section
          id="group-content"
          className="px-2 lg:px-4 py-4 w-full bg-slate-50 rounded-b-lg rounded-tr-lg"
        >
          {/* Pertemuan */}
          <div id="pertemuan" className="mx-auto">
            {/*Pertemuan */}
            <div className="flex flex-col gap-3 Box-Pertemuan">
              <div className="flex gap-5 flex-col-reverse md:flex-col-reverse lg:flex-row ">
                {/* list */}
                <div className="lg:w-[70%] shadow-md px-2 rounded-md">
                  <div id="chart">
                    <p className="p-2 h-4 w-1/4 bg-gray-200 animate-pulse"></p>
                    <div className="h-36 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
                {/* kontrak pertemuan */}
                <div className="lg:w-[30%]">
                  <table className="w-full shadow-sm text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                    <thead className="text-sm text-neutral2 bg-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3 w-max">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 w-max">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="shadow-md">
                <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                  <thead className="text-neutral2 bg-gray-100">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="w-4 p-4">
                          <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                        </td>

                        <td className="px-6 py-3">
                          <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-3 w-36">
                          <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mahasiswa */}
          <div id="mahasiswa" className="mx-auto">
            <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
              <thead className="text-sm text-neutral2 bg-gray-100">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="w-4 p-4">
                      <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tugas */}
          <div id="tugas" className="mx-auto mt-4">
            <h3 className="font-semibold mb-3 h-4 w-1/4 bg-gray-200 animate-pulse"></h3>
            <div className="flex w-full justify-between items-center">
              <div className="relative ml-2">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                  placeholder="Cari Tugas"
                />
              </div>
              <div className="w-max bg-gray-200 animate-pulse text-white hover:bg-primary2 focus:ring-primary5 px-3 py-2 lg:px-3 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300">
                &nbsp;
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden mt-5 ">
              <thead className="text-sm text-neutral2 bg-gray-100">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="w-4 p-4">
                      <div className="h-4 w-4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Kursus */}
          <div id="kursus" className="mx-auto">
            {/* list kursus */}
            <div className="col-span-2">
              <div className="flex flex-col gap-2">
                {/* list kursus */}
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row rounded-md overflow-hidden border border-gray-200 hover:shadow-[rgba(7,_65,_210,_0.1)_0px_6px_10px] transition-all ease-out duration-200 cursor-pointer"
                  >
                    <div className="h-36 w-48 bg-gray-200 animate-pulse"></div>
                    <div className="py-3 px-4 w-full">
                      <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-gray-200 animate-pulse mt-2"></div>
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
