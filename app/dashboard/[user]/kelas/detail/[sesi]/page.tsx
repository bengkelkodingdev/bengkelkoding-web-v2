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
        <div className="flex flex-col lg:flex-row justify-between  w-full  ">
          {/* kiri */}
          <div className="up-left flex flex-col gap-2 lg:w-1/2">
            <div className="profil-cardLecture flex flex-col gap-2 h-[20vh] rounded-lg p-2 bg-gradient-to-r from-[#3263de]  to-[#6aa2f0] ">
              <div className="info-week gap-2 bg-slate-50 rounded-lg w-[80%] lg:w-[45%] flex p-2">
                <div className="rounded-full w-[13%]  bg-orange-300"></div>
                <h1 className="font-semibold text-2xl">Pertemuan {sesi}</h1>
              </div>
              <div className="info-dosen text-white text-lg">
                <h2 className="font-bold">nama dose</h2>
                <h3>inp</h3>
              </div>
            </div>
            <div className="detail-info flex gap-2">
              <div className="info-izin rounded-lg w-full flex items-center flex-col bg-[#baf8db] p-2 ">
                <p className="font-bold text-4xl text-[#3263de]">12312</p>
                <p className="font-medium text-xl text-[#1b2650] ">
                  Total Mahasiswa
                </p>
              </div>
              <div className="jml-mhs rounded-lg  w-full flex items-center flex-col bg-yellow-100 p-2 ">
                <p className="font-bold text-4xl text-[#3263de]">9</p>
                <p className="font-medium text-xl text-[#1b2650] ">izin</p>
              </div>
            </div>
            <button
              onClick={generateRandomText}
              className="btn-generate  w-1/4  mt-5 p-3 font-semibold text-white border-2 border-slate-200 bg-[#4780ea] 4780ea hover:bg-[#3263de] rounded-lg"
            >
              Genetate Qr
            </button>
          </div>
          {/* kanan */}
          <div className="up-right lg:w-1/3">
            <div className="canvas-qr">
              <div className=" flex items-center justify-center border-2 border-gray-200 border-dashed h-[50vh] rounded-lg dark:border-gray-700">
                {/* <p>QR Code belum dihasilkan</p> */}
                {qrText ? (
                  <div className="w-full p-5 ">
                    <QRCodeSVG className="w-full" height={300} value={qrText} />
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
                    {Array.from({ length: 10 }).map((_, index) => (
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
