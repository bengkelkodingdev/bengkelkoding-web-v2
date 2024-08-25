"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const HomeStudent = () => {
  return (
    <>
      <div className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-8">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQHC4IFjmiQi1Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1680830096821?e=1729123200&v=beta&t=wP1wBvRZPb4G6Y7kWnqI_QEMjKhPbOQZ_lHitCc1WHE"
              alt="Profile"
              className="w-48 h-60 rounded-lg object-cover"
            />
            <div className="flex-1 text-blue-900">
              <h2 className="text-xl font-bold ">Aslam Thariq</h2>
              <p className="text-lg font-semibold">A11.2021.99999</p>
              <p className="font-medium text-lg">
                Hallo Aslam Thariq! Mulai belajar lagi, ubah ide menjadi kode.
              </p>
              <div className="flex justify-center items-center p-5 rounded-lg mt-4 space-x-8 bg-gradient-to-r from-[#0099FF] to-[#005C99] text-white">
                <div className="text-center relative flex-1">
                  <p>Kelas</p>
                  <div className="relative inline-flex items-end">
                    <h3 className="font-bold text-3xl">2</h3>
                    <svg
                      className="w-6 h-6 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.35 0 .687.06 1 .17V5a2 2 0 0 0-2-2H5Zm4 10H3v2a2 2 0 0 0 2 2h4v-4Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="h-10 border-l border-gray-300"></div>
                <div className="text-center relative flex-1">
                  <p>Sertifikat</p>
                  <div className="relative inline-flex items-end">
                    <h3 className="font-bold text-3xl">2</h3>
                    <svg
                      className="w-6 h-6 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                      <path
                        fill-rule="evenodd"
                        d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                        clip-rule="evenodd"
                      />
                      <path d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z" />
                    </svg>
                  </div>
                </div>
                <div className="h-10 border-l border-gray-300"></div>
                <div className="text-center relative flex-1">
                  <p>Tugas</p>
                  <div className="relative inline-flex items-end">
                    <h3 className="font-bold text-3xl">2</h3>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Z" />
                      <path
                        fill-rule="evenodd"
                        d="M11 7V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm4.707 5.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold mb-4">Penugasan</h3>
              <h3 className="text-sm text-white bg-primary1 p-2 rounded-lg font-semibold mb-4">
                Lainnya
              </h3>
            </div>

            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 7V2.221a2 2 0 0 0-.5.365L3.586 6.5a2 2 0 0 0-.365.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.126a5.087 5.087 0 0 0-4.74 1.368v.001l-6.642 6.642a3 3 0 0 0-.82 1.532l-.74 3.692a3 3 0 0 0 3.53 3.53l3.694-.738a3 3 0 0 0 1.532-.82L19 15.149V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M17.447 8.08a1.087 1.087 0 0 1 1.187.238l.002.001a1.088 1.088 0 0 1 0 1.539l-.377.377-1.54-1.542.373-.374.002-.001c.1-.102.22-.182.353-.237Zm-2.143 2.027-4.644 4.644-.385 1.924 1.925-.385 4.644-4.642-1.54-1.54Zm2.56-4.11a3.087 3.087 0 0 0-2.187.909l-6.645 6.645a1 1 0 0 0-.274.51l-.739 3.693a1 1 0 0 0 1.177 1.176l3.693-.738a1 1 0 0 0 .51-.274l6.65-6.646a3.088 3.088 0 0 0-2.185-5.275Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="ms-2">
                      <div className="flex items-center space-x-4">
                        <p className="font-semibold text-gray-500">
                          Penugasan 1
                        </p>
                        <span className="text-white text-xs bg-primary1 px-2 py-0 rounded-md">
                          Quiz
                        </span>
                      </div>
                      <div className="flex space-x-4">
                        <div>
                          <p className="text-xs text-gray-400">
                            Diberikan: 27 Jul 2024 23:59
                          </p>
                          <p className="text-xs text-gray-400">
                            Deadline: 27 Jul 2024 23:59
                          </p>
                        </div>
                        <p className="text-xs text-gray-400">
                          Bengkel Koding-DS01
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex space-x-4 items-center">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Status</p>
                    <button className="bg-primary1 text-sm text-white px-4 py-2 rounded-lg">Kumpulkan</button>
                  </div>
                </div> */}
                  <div className="flex space-x-4 items-center">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <p className="text-xs text-gray-400">Status</p>
                      <button className="bg-blue-100 border-slate-900 text-sm text-black px-4 py-2 rounded-lg border border-dashed">
                        Menunggu Penilaian
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4">Kelas</h3>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5603AQHC4IFjmiQi1Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1680830096821?e=1729123200&v=beta&t=wP1wBvRZPb4G6Y7kWnqI_QEMjKhPbOQZ_lHitCc1WHE"
                      alt="Profile"
                      className="w-32 h-28 rounded-lg object-cover"
                    />
                    <div className="ms-2 me-2">
                      <p className="font-semibold text-gray-500">
                        Bengkel Koding - DS01
                      </p>
                      <div className="flex space-x-4">
                        <div>
                          <div className="flex justify-between items-center w-40">
                            <p className="text-xs">Senin</p>
                            <p className="text-xs">12.30 -14.10</p>
                            <p className="text-xs">H.6.3</p>
                          </div>
                          <p className="text-xs text-gray-400">
                            Kurikulum dirancang oleh Bengkel Koding bersama
                            dengan pelaku industri di bidang Web Development.
                            Siswa dipersiapkan untuk menjadi Front-End dan
                            Back-End Web Developer sesuai dengan standar
                            kebutuhan industri.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="bg-blue-100 p-2 w-32 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-lg text-center">
                        <p className="text-xs text-gray-400 rounded-sm bg-gray-50">
                          Nilai Akhir
                        </p>
                        <p className="text-xs text-gray-400 mt-4 mb-4"> - </p>
                        <button className="bg-primary1 text-sm w-24 text-white px-2 py-2 rounded-lg">
                          Masuk
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4">Log Kehadiran</h3>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div className="flex justify-between items-center bg-blue-100 p-2 rounded-sm">
                  <div>
                    <p className="text-gray-500">Pertemuan 4</p>
                    <p className="text-gray-400">Bengkel Koding-DS01</p>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <span className="text-green-500">Hadir</span>
                    <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg">
                      Ajukan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeStudent;
