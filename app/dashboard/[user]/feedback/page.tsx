import Link from "next/link";
import React from "react";

const HomeDashboardFeedbackPage = () => {
  return (
    <>
      <div className="relative overflow-x-auto">
        {/* Searching + Button */}
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          {/* Search */}
          <label className="sr-only">Search</label>
          <div className="relative ml-2">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-neutral3"
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
              className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
              placeholder="Cari feedback"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
          <thead className="text-sm text-neutral2 bg-gray-100">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Kursus
              </th>
              <th scope="col" className="px-6 py-3">
                Komentar
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </td>
                <td scope="row" className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-xs flex flex-col gap-1">
                    <p className="font-medium text-neutral2">Web Developer</p>
                    <p className="font-normal">Marc Anthony Klok</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Animi quidem nihil totam dolore.
                </td>
                <td className="px-6 py-4">
                  <div className=" flex items-center gap-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      className="fill-secondary1 h-max"
                    >
                      <g>
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M0 0h24v24H0V0z" fill="none" />
                      </g>
                      <g>
                        <path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" />
                      </g>
                    </svg>
                    <p>5</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-neutral3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span className="font-semibold text-gray-900">1-10</span> of{" "}
            <span className="font-semibold text-gray-900">1000</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral3 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-neutral2"
              >
                Sebelumnya
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 hover:bg-gray-100 hover:text-neutral2"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-neutral2"
              >
                Selanjutnya
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HomeDashboardFeedbackPage;
