import React from "react";

export default function SkletonListKelas() {
  return (
    <>
      <div className="relative overflow-x-auto">
        {/* Searching + Button */}
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          {/* Search */}
          <div className="relative ml-2">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <div className="w-5 h-5 bg-gray-200 animate-pulse"></div>
            </div>
            <input
              type="text"
              className="block w-[200px] lg:w-[300px] p-2 ps-10 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
              placeholder="Cari kelas"
              disabled
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-200 animate-pulse w-32 h-10 rounded-lg"></div>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
          <thead className="text-sm text-neutral2 bg-gray-100">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </th>
              {Array.from({ length: 9 }).map((_, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </td>
                {Array.from({ length: 9 }).map((_, subIndex) => (
                  <td key={subIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            <div className="flex items-center justify-center px-3 h-8 bg-gray-200 animate-pulse rounded-s-lg w-24"></div>
          </li>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <div className="flex items-center justify-center px-3 h-8 bg-gray-200 animate-pulse w-8"></div>
            </li>
          ))}
          <li>
            <div className="flex items-center justify-center px-3 h-8 bg-gray-200 animate-pulse rounded-e-lg w-24"></div>
          </li>
        </ul>
      </nav>
    </>
  );
}
