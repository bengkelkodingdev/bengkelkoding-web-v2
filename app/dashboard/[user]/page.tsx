import Link from "next/link";
import React from "react";

const statistics = [
  {
    data: "600",
    info: "Jumlah Mahasiswa",
    link: "superadmin/pengguna/mahasiswa",
    style: "from-blue-700 to-blue-600 focus:ring-blue-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="34px"
        viewBox="0 0 24 24"
        width="34px"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    data: "24",
    info: "Kelas Aktif",
    link: "superadmin/kelas",
    style: "from-red-700 to-red-600 focus:ring-red-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="34px"
        viewBox="0 0 24 24"
        width="34px"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z" />
      </svg>
    ),
  },
  {
    data: "5",
    info: "Feedback belum dibaca",
    link: "superadmin/feedback",
    style: "from-orange-700 to-orange-600 focus:ring-orange-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="34px"
        viewBox="0 0 24 24"
        width="34px"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1zm6 5H7c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm4-6H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z" />
      </svg>
    ),
  },
  {
    data: "120",
    info: "Token aktif belum redeem",
    link: "superadmin/token",
    style: "from-green-700 to-green-600 focus:ring-green-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="34px"
        viewBox="0 0 24 24"
        width="34px"
      >
        <rect fill="none" height="24" width="24" y="0" />
        <path d="M12.97,2.54c-0.6-0.34-1.34-0.34-1.94,0l-7,3.89L9.1,9.24C9.83,8.48,10.86,8,12,8s2.17,0.48,2.9,1.24l5.07-2.82L12.97,2.54z M10,12c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S10,13.1,10,12z M3,8.14l5.13,2.85C8.04,11.31,8,11.65,8,12c0,1.86,1.27,3.43,3,3.87 v5.57l-6.97-3.87C3.39,17.22,3,16.55,3,15.82V8.14z M13,21.44v-5.57c1.73-0.44,3-2.01,3-3.87c0-0.35-0.04-0.69-0.13-1.01L21,8.14 l0,7.68c0,0.73-0.39,1.4-1.03,1.75L13,21.44z" />
      </svg>
    ),
  },
];

const HomeDashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 2xl:gap-4">
        {statistics.map((s, index) => (
          <Link
            key={index}
            href={s.link}
            className={`flex items-center gap-4 p-6 lg:p-8 bg-gradient-to-r text-white rounded-lg hover:shadow-[rgba(0,_0,_0,_0.1)_0px_6px_10px] focus:ring-4 transition-all ease-out duration-200 ${s.style}`}
          >
            <div className="w-max p-4 rounded-full bg-white fill-white bg-opacity-10">
              {s.icon}
            </div>
            <div>
              <strong className="text-2xl lg:text-3xl 2xl:text-4xl">
                {s.data}
              </strong>
              <p className="text-neutral5">{s.info}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 2xl:gap-4 mt-2 lg:mt-3 2xl:mt-4">
        <div className="h-max border-2 border-gray-200 rounded-lg p-10 flex flex-col gap-4">
          {/* Title + Description */}
          <div>
            <strong className="text-lg lg:text-xl">Kelas Aktif</strong>
            <p className="text-neutral3">
              Lihat kelas aktif yang berada di Bengkel Koding
            </p>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-md overflow-hidden">
              <thead className="text-sm text-neutral2 bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Dosen
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hari
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jam
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kuota
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Terisi
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th scope="row" className="px-6 py-4 whitespace-nowrap ">
                      <div className="text-xs">
                        <p className="font-normal">Nathan Tejo</p>
                        <p className="font-medium text-neutral2">
                          Web Developer
                        </p>
                      </div>
                    </th>
                    <td className="px-6 py-4">Jumat</td>
                    <td className="px-6 py-4">10:20</td>
                    <td className="px-6 py-4">20</td>
                    <td className="px-6 py-4">4</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-max border-2 border-gray-200 rounded-lg p-10 flex flex-col gap-4">
          {/* Title + Description */}
          <div>
            <strong className="text-xl">Feedback Terbaru</strong>
            <p className="text-neutral3">
              Lihat feedback terbaru yang berada di Bengkel Koding
            </p>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-neutral3 rounded-md overflow-hidden">
              <thead className="text-sm text-neutral2 bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Pengguna
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th scope="row" className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs">
                        <p className="font-normal">Jerome Polin</p>
                        <p className="font-medium text-neutral2">
                          Mobile Developer
                        </p>
                      </div>
                    </th>
                    <td className="px-6 py-4 max-w-48 truncate">
                      Gilak barusan nonton replay Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. In, minima.
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDashboardPage;
