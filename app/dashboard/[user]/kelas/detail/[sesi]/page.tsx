"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

const DetailKelasPageSesi = () => {
  const params = useParams();
  const sesi = params.sesi;

  // state qr
  const [qrText, setQrText] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(20);

  // button generate qrcode
  const generateRandomText = async () => {
    try {
      const newQrValue = `pertemuan-${sesi}`;
      console.log("qr session", newQrValue);
      setQrText(newQrValue);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  useEffect(() => {
    let qrTimeout: ReturnType<typeof setTimeout> | undefined;
    let countdownInterval: ReturnType<typeof setInterval> | undefined;

    if (qrText) {
      setCountdown(25); // Reset countdown ke 20

      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000); // Memperbarui countdown setiap 1 detik

      qrTimeout = setTimeout(() => {
        setQrText("");
        clearInterval(countdownInterval); // Menghentikan interval setelah QR Code hilang
      }, 25000);
    }
    return () => {
      if (qrTimeout) {
        clearTimeout(qrTimeout);
        window.location.reload();
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [qrText]);

  return (
    <>
      <div className=" flex flex-col w-full ">
        <div className="flex flex-col lg:flex-row gap-4 justify-between  w-full  ">
          {/* kiri */}
          <div className="up-left flex flex-col gap-2 lg:w-2/3">

            <div className="flex justify-between pb-4 mb-4  ">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center me-3">
                  <svg className="w-6 h-6 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                    <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
                  </svg>
                </div>
                <div>
                  <h5 className="leading-none text-2xl font-bold text-gray-900 pb-1">Web Development Bengkel Koding</h5>
                  <p className="text-sm font-normal text-gray-500">ETIKA KARTIKADARMA, M.Kom</p>
                </div>
              </div>
              <div>
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 text-neutral5 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
                Pertemuan {sesi}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-2">
              <dl className="bg-gradient-to-r from-blue-700 to-blue-600 focus:ring-blue-100  rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-white fill-white bg-opacity-10 text-neutral5  text-sm font-medium flex items-center justify-center mb-1">12</dt>
                <dd className="text-neutral5 text-sm font-medium">Total Mahasiswa</dd>
              </dl>
              <dl className="bg-gradient-to-r from-red-700 to-red-600 focus:ring-red-100  rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-white fill-white bg-opacity-10 text-neutral5  text-sm font-medium flex items-center justify-center mb-1">64</dt>
                <dd className="text-neutral5  text-sm font-medium">Izin</dd>
              </dl>
              <dl className="bg-gradient-to-r from-orange-700 to-orange-600 focus:ring-orange-100  rounded-lg flex flex-col items-center justify-center h-[78px]">
                <dt className="w-8 h-8 rounded-full bg-white fill-white bg-opacity-10 text-neutral5  text-sm font-medium flex items-center justify-center mb-1">23</dt>
                <dd className="text-neutral5  text-sm font-medium">Hadir</dd>
              </dl>
            </div>
            <button
              onClick={generateRandomText}
              className="btn-generate  w-1/4  mt-5 p-3 font-semibold text-white border-2 border-slate-200 bg-gradient-to-r from-blue-700 to-blue-600 4780ea hover:bg-[#3263de] rounded-lg"
            >
              Genetate Qr
            </button>
          </div>
          {/* kanan */}
          <div className="up-right lg:w-1/3">
            <div className="canvas-qr">
              <div className=" flex items-center justify-center border-2 border-gray-200 border-dashed h-[40vh] rounded-lg dark:border-gray-700">
                {/* <p>QR Code belum dihasilkan</p> */}
                {qrText ? (
                  <div className="w-full p-5 ">
                    <QRCodeSVG className="w-full" height={200} value={qrText} />
                    <p className="pt-5 text-center">
                      QR Code akan hilang dalam {countdown} detik
                    </p>
                  </div>
                ) : (
                  <p>QR Code belum dihasilkan</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="list-mhs flex flex-col ">
          <div className="search-compo flex justify-between py-3">
            {/* <p className="font-semi text-2xl">List</p> */}
            <div className="search-key">
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
                  placeholder="Cari kelas"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            <div className="left-belumabsen w-full lg:w-[70%]">
              <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-3 border-2 border-gray-200 border-dashed">
                <div className="text-center w-full flex justify-left ">
                  <p className="bg-yellow-200 p-1 w-3/12 rounded-lg mb-3 ">
                    List mhs
                  </p>
                </div>
                <table className=" w-full text-sm text-left rtl:text-right text-neutral3 rounded-lg overflow-hidden">
                  <thead className="text-sm text-neutral2 bg-gray-100 ">
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
                        Nama
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nim
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50"
                      >
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
                        <th
                          scope="row"
                          className="px-6 py-4 whitespace-nowrap "
                        >
                          <div className="text-xs flex flex-col gap-1">
                            <p className="font-medium text-neutral2">
                              Muhamad Alif Anwar
                            </p>
                            <p className="font-normal">
                              Semester 6 &#40;2020&#41;
                            </p>
                          </div>
                        </th>
                        <td className="px-6 py-4">A11.2021.13717</td>
                        <td className="px-6 py-4">
                          <p className="w-max text-sm rounded-xl px-4 text-red-600 bg-red-100">
                            Tidak Hadir
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <Link
                              href={"/"}
                              className="block bg-yellow2 p-1 rounded-md fill-white hover:bg-yellow1 transition-all ease-in-out duration-150"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="18px"
                                viewBox="0 0 24 24"
                                width="18px"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                              </svg>
                            </Link>
                          </div>
                        </td>
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
            <div className="right-sudahabsen w-full lg:w-1/2">
              <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-3 border-2 border-gray-200 border-dashed">
                <div className="text-center w-full flex justify-left ">
                  <p className="bg-yellow-200 p-1 w-3/12 rounded-lg mb-3 ">
                    List Izin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailKelasPageSesi;
