"use client";
import {
  getPresencesThisWeek,
  getStudentAssignments,
  getStudentClassrooms,
  getStudentStatistics,
} from "@/app/api/student/dashboard";
import { formatDate } from "@/app/lib/formatDate";
import { timeNow } from "@/app/lib/timeNow";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const StudentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statistik, setStatistik] = useState({
    name: "",
    nim: "",
    image: "",
    classroom_count: 0,
    certificate_count: 0,
    assignment_count: 0,
  });

  const [classrooms, setClassrooms] = useState([
    {
      id: 0,
      name: "",
      description: "",
      time_start: "",
      time_end: "",
      day: "",
      room: "",
      final_score: 0,
    },
  ]);

  const [presences, setPresences] = useState([
    {
      id: 0,
      week: 0,
      classroom_name: "",
      presence_date: "",
      presence_date_formatted: "",
      time_start: "",
      time_end: "",
      day: "",
      room: "",
      attendance_status: 0,
      attendance_status_label: "",
      is_enabled: 0,
      is_enabled_label: "",
      qr_is_generated: 0,
    },
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 0,
      title: "",
      description: "",
      start_time: "",
      deadline: "",
      is_uploaded: false,
      classroom: {
        id: 0,
        name: "",
      },
      tasks: {
        id: 0,
        score: 0,
        is_submitted: true,
        submitted_at: "",
      },
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Statistics Data
        const responseStatistics = await getStudentStatistics();
        setStatistik(responseStatistics.data);

        // Get List Classrooms
        const responseClassrooms = await getStudentClassrooms();
        setClassrooms(responseClassrooms.data);

        // Get List Assignments
        const responseAssignments = await getStudentAssignments();
        setAssignments(responseAssignments.data);

        // Get Presences This Week
        const responsePresences = await getPresencesThisWeek();
        setPresences(responsePresences.data);

        setIsLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        setIsLoading(false);
        window.location.reload();
      }
    };

    fetchData();
  }, []);

  // Get status presence style
  const getStatusColor = (attendance_status: number): string => {
    switch (attendance_status) {
      case 1:
        return "bg-gray-100 border-gray-500 text-gray-500";
      case 5:
        return "bg-green-100 border-green-500 text-green-500";
      case 6:
        return "bg-orange-100 border-orange-500 text-orange-500";
      case 7:
        return "bg-red-100 border-red-500 text-red-500";
      default:
        return ""; // Default classes if none of the cases match
    }
  };

  const today = timeNow();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 lg:gap-x-4 gap-y-2 md:gap-y-4 lg:gap-y-6">
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
        <div className="w-full min-h-36 bg-neutral5 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 lg:gap-x-4 gap-y-2 md:gap-y-4 lg:gap-y-6">
      {/* Profile */}
      <div
        id="StudentProfile"
        className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 md:p-3 lg:p-4 rounded-xl flex flex-col gap-2 md:gap-3 lg:gap-4 justify-center"
      >
        {/* Data Profil */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
          <div className="min-w-32 lg:min-w-40 max-h-32 lg:max-h-40 overflow-hidden rounded-lg">
            <Image
              src={statistik.image}
              alt="student"
              width={500}
              height={500}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
            <div className="text-white">
              <h2 className="font-semibold text-xl lg:text-2xl">
                Hallo, {statistik.name} !
              </h2>
              <p className="font-medium text-xs lg:text-sm mt-1">
                {statistik.nim}
              </p>
              <p className="text-white text-sm lg:text-base font-medium mt-4">
                Ayooo, mulai belajar lagi mengubah idemu menjadi kode.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistik */}
      <div
        id="Statistik"
        className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-2 md:p-3 lg:p-4 rounded-xl flex flex-col justify-between"
      >
        {/* Judul Statistik */}
        <div className="flex gap-2 md:gap-4 mb-4 items-center">
          <div className="h-6 w-6 lg:h-8 lg:w-8 bg-white bg-opacity-40 fill-white rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-3 w-3 lg:h-4 lg:w-4"
            >
              <path d="M120-240q-33 0-56.5-23.5T40-320q0-33 23.5-56.5T120-400h10.5q4.5 0 9.5 2l182-182q-2-5-2-9.5V-600q0-33 23.5-56.5T400-680q33 0 56.5 23.5T480-600q0 2-2 20l102 102q5-2 9.5-2h21q4.5 0 9.5 2l142-142q-2-5-2-9.5V-640q0-33 23.5-56.5T840-720q33 0 56.5 23.5T920-640q0 33-23.5 56.5T840-560h-10.5q-4.5 0-9.5-2L678-420q2 5 2 9.5v10.5q0 33-23.5 56.5T600-320q-33 0-56.5-23.5T520-400v-10.5q0-4.5 2-9.5L420-522q-5 2-9.5 2H400q-2 0-20-2L198-340q2 5 2 9.5v10.5q0 33-23.5 56.5T120-240Z" />
            </svg>
          </div>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-white">
            Statistik Anda
          </h2>
        </div>
        {/* Statistik Profil */}
        <div className="bg-white bg-opacity-40 rounded-lg p-2 grid grid-cols-3">
          {/* Total Kelas */}
          <div className="text-center">
            <p className="font-semibold text-xs md:text-sm lg:text-base pb-1.5 md:pb-2 border-b border-neutral4 text-emerald-900">
              Kelas
            </p>
            <div className="flex justify-center items-baseline py-1.5 md:py-2">
              <p className="text-3xl lg:text-5xl font-semibold text-white">
                {statistik.classroom_count}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="fill-emerald-900 w-3 h-3 lg:h-5 lg:w-5"
              >
                <path d="M242-249q-20-11-31-29.5T200-320v-192l-96-53q-11-6-16-15t-5-20q0-11 5-20t16-15l338-184q9-5 18.5-7.5T480-829q10 0 19.5 2.5T518-819l381 208q10 5 15.5 14.5T920-576v256q0 17-11.5 28.5T880-280q-17 0-28.5-11.5T840-320v-236l-80 44v192q0 23-11 41.5T718-249L518-141q-9 5-18.5 7.5T480-131q-10 0-19.5-2.5T442-141L242-249Zm238-203 274-148-274-148-274 148 274 148Zm0 241 200-108v-151l-161 89q-9 5-19 7.5t-20 2.5q-10 0-20-2.5t-19-7.5l-161-89v151l200 108Zm0-241Zm0 121Zm0 0Z" />
              </svg>
            </div>
          </div>
          {/* Total Sertifikat */}
          <div className="text-center border-x">
            <p className="font-semibold text-xs md:text-sm lg:text-base pb-1.5 md:pb-2 border-b border-neutral4 text-emerald-900">
              Sertifikat
            </p>
            <div className="flex justify-center items-baseline py-1.5 md:py-2">
              <p className="text-3xl lg:text-5xl font-semibold text-white">
                {statistik.certificate_count}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="fill-emerald-900 w-3 h-3 lg:h-5 lg:w-5"
              >
                <path d="m480-483-68 52q-6 5-12 .5t-4-11.5l26-84-70-56q-5-5-3-11.5t9-6.5h86l26-82q2-7 10-7t10 7l26 82h85q7 0 9.5 6.5T608-582l-71 56 26 84q2 7-4 11.5t-12-.5l-67-52Zm0 363L293-58q-20 7-36.5-5T240-95v-254q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v254q0 20-16.5 32T667-58l-187-62Zm0-200q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
              </svg>
            </div>
          </div>
          {/* Total Tugas */}
          <div className="text-center">
            <p className="font-semibold text-xs md:text-sm lg:text-base pb-1.5 md:pb-2 border-b border-neutral4 text-emerald-900">
              Tugas
            </p>
            <div className="flex justify-center items-baseline py-1.5 md:py-2">
              <p className="text-3xl lg:text-5xl font-semibold text-white">
                {statistik.assignment_count}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="fill-emerald-900 w-3 h-3 lg:h-5 lg:w-5"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Kelas */}
      <div id="KelasAnda">
        {/* Judul Kelas */}
        <div className="flex gap-2 md:gap-4 border-b border-neutral4 mb-2 md:mb-3 lg:mb-4 p-2 md:p-3 lg:p-4 items-center">
          <div className="h-6 w-6 lg:h-8 lg:w-8 bg-primary5 fill-primary3 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-3 w-3 lg:h-4 lg:w-4"
            >
              <path d="M242-249q-20-11-31-29.5T200-320v-192l-96-53q-11-6-16-15t-5-20q0-11 5-20t16-15l338-184q9-5 18.5-7.5T480-829q10 0 19.5 2.5T518-819l381 208q10 5 15.5 14.5T920-576v256q0 17-11.5 28.5T880-280q-17 0-28.5-11.5T840-320v-236l-80 44v192q0 23-11 41.5T718-249L518-141q-9 5-18.5 7.5T480-131q-10 0-19.5-2.5T442-141L242-249Zm238-203 274-148-274-148-274 148 274 148Zm0 241 200-108v-151l-161 89q-9 5-19 7.5t-20 2.5q-10 0-20-2.5t-19-7.5l-161-89v151l200 108Zm0-241Zm0 121Zm0 0Z" />
            </svg>
          </div>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold">
            Kelas Anda
          </h2>
        </div>
        {/* List Kelas */}
        {classrooms.length > 0 ? (
          <div id="ListKelasAnda" className="flex flex-col gap-2 lg:gap-3">
            {classrooms.map((classroom) => (
              <Link
                key={classroom.id}
                href={`student/classroom/${classroom.id}`}
                className="group relative p-2 md:p-3 lg:p-4 rounded-xl border border-neutral4 flex justify-between items-center cursor-pointer transition-all duration-200 ease-in-out transform hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
              >
                <div className="flex gap-2 md:gap-3 lg:gap-4 items-center">
                  {/* Icon Kelas */}
                  <div className="min-w-16 h-16 lg:min-w-20 lg:h-20 bg-primary5 fill-primary3 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      className="w-8 h-8 lg:w-10 lg:h-10"
                    >
                      <path d="M242-249q-20-11-31-29.5T200-320v-192l-96-53q-11-6-16-15t-5-20q0-11 5-20t16-15l338-184q9-5 18.5-7.5T480-829q10 0 19.5 2.5T518-819l381 208q10 5 15.5 14.5T920-576v256q0 17-11.5 28.5T880-280q-17 0-28.5-11.5T840-320v-236l-80 44v192q0 23-11 41.5T718-249L518-141q-9 5-18.5 7.5T480-131q-10 0-19.5-2.5T442-141L242-249Zm238-203 274-148-274-148-274 148 274 148Zm0 241 200-108v-151l-161 89q-9 5-19 7.5t-20 2.5q-10 0-20-2.5t-19-7.5l-161-89v151l200 108Zm0-241Zm0 121Zm0 0Z" />
                    </svg>
                  </div>
                  {/* Informasi Kelas */}
                  <div className="flex flex-col gap-2">
                    <p className="text-base lg:text-lg font-semibold">
                      {classroom.name}
                    </p>
                    <div className="flex gap-4 lg:gap-6 text-neutral2 fill-neutral3">
                      <p className="text-[10px] lg:text-sm flex items-center gap-0.5 lg:gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          className="w-3 h-3 lg:w-4 lg:h-4"
                        >
                          <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                        </svg>
                        {classroom.day}
                      </p>{" "}
                      <p className="text-[10px] lg:text-sm flex items-center gap-0.5 lg:gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          className="w-3 h-3 lg:w-4 lg:h-4"
                        >
                          <path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                        </svg>
                        {classroom.time_start} - {classroom.time_end}
                      </p>{" "}
                      <p className="text-[10px] lg:text-sm flex items-center gap-0.5 lg:gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          className="w-3 h-3 lg:w-4 lg:h-4"
                        >
                          <path d="M480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 79q-14 0-28-5t-25-15q-65-60-115-117t-83.5-110.5q-33.5-53.5-51-103T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 45-17.5 94.5t-51 103Q698-301 648-244T533-127q-11 10-25 15t-28 5Zm0-453Zm0 80q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z" />
                        </svg>
                        {classroom.room}
                      </p>
                    </div>
                    <p className="text-xs lg:text-sm text-neutral2 line-clamp-2">
                      {classroom.description}
                    </p>
                  </div>
                  <div className="absolute w-full h-full hidden group-hover:flex left-0 items-center justify-center">
                    <p className="bg-primary5 text-primary3 font-semibold px-3 py-2 text-sm lg:text-base rounded-md">
                      Detail Kelas
                    </p>
                  </div>
                </div>
                {/* Nilai Akhir Kelas */}
                <div className="bg-primary5 rounded-lg min-w-20 lg:min-w-24 text-center overflow-hidden">
                  <p className="text-[10px] md:text-xs lg:text-sm bg-primary3 text-white font-medium py-0.5 lg:py-1">
                    Nilai Akhir
                  </p>
                  <strong className="block text-xl lg:text-3xl text-primary3 py-1.5 lg:py-2">
                    {classroom.final_score ? classroom.final_score : "-"}
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-neutral4 text-center text-xs md:text-sm lg:text-base">
            Anda belum masuk ke kelas!
          </div>
        )}
      </div>

      {/* Log Kehadiran */}
      <div id="LogKehadiran">
        {/* Judul Log Kehadiran */}
        <div className="flex gap-2 md:gap-4 border-b border-neutral4 mb-2 md:mb-3 lg:mb-4 p-2 md:p-3 lg:p-4 items-center">
          <div className="h-6 w-6 lg:h-8 lg:w-8 bg-primary5 fill-primary3 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-3 w-3 lg:h-4 lg:w-4"
            >
              <path d="M320-160q-33 0-56.5-23.5T240-240v-80q0-17 11.5-28.5T280-360h80v-90q-30-2-59.5-12.5T249-494q-6-6-9.5-13.5T236-523v-27h-29q-8 0-15.5-3t-13.5-9l-90-90q-12-12-12-28t12-28q29-29 78-42.5t90-13.5q27 0 52.5 4t51.5 15q0-23 16-39t39-16h345q33 0 56.5 23.5T840-720v440q0 50-35 85t-85 35H320Zm120-200h200q17 0 28.5 11.5T680-320v40q0 17 11.5 28.5T720-240q17 0 28.5-11.5T760-280v-440H440v24l229 229q9 9 11 20.5t-3 22.5q-5 11-14 17.5t-23 6.5q-8 0-15.5-3.5T612-412L510-514l-8 8q-14 14-29.5 25T440-464v104ZM224-630h52q17 0 28.5 11.5T316-590v46q12 8 25 11t27 3q23 0 41.5-7t36.5-25l8-8-56-56q-29-29-65-43.5T256-684q-20 0-38 3t-36 9l42 42Zm376 350H320v40h286q-3-9-4.5-19t-1.5-21Zm-280 40v-40 40Z" />
            </svg>
          </div>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold">
            Log Kehadiran
          </h2>
          <p className="text-xs lg:text-sm text-white font-semibold bg-gradient-to-r from-blue-500 to-emerald-600 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-md">
            Minggu ini
          </p>
        </div>
        {/* List Log Kehadiran */}
        {presences.length > 0 ? (
          <div className="flex flex-col gap-2 lg:gap-3">
            {presences.map((presence) => (
              <div
                key={presence.id}
                className="flex justify-between rounded-xl border border-neutral4 p-2 md:p-3 lg:p-4 items-center gap-4 transition-all duration-200 ease-in-out transform hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
              >
                {/* Informasi Log Kehadiran */}
                <div>
                  <div className="flex gap-2 md:gap-3 lg:gap-4 items-center mb-2">
                    <p className="min-w-max bg-gradient-to-r from-blue-500 to-blue-700 px-1.5 lg:px-2 py-1 rounded-md text-white font-semibold text-[10px] lg:text-sm">
                      Pertemuan {presence.week}
                    </p>
                    <p className="font-medium text-sm lg:text-base">
                      {presence.classroom_name}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    {/* Waktu Kehadiran */}
                    <div className="text-neutral2 fill-neutral2 flex gap-6">
                      <p className="text-[10px] lg:text-sm flex items-center gap-0.5 lg:gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          className="w-3 h-3 lg:w-4 lg:h-4"
                        >
                          <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                        </svg>
                        {presence.day}, {presence.presence_date_formatted}
                      </p>
                      <p className="text-[10px] lg:text-sm flex items-center gap-0.5 lg:gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          className="w-3 h-3 lg:w-4 lg:h-4"
                        >
                          <path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                        </svg>
                        {presence.time_start} - {presence.time_end} WIB
                      </p>
                    </div>
                  </div>
                </div>
                {/* Status Kehadiran */}
                <div className="w-max bg-primary5 p-1.5 lg:p-2 rounded-lg">
                  {/* Judul Status */}
                  <div className="mb-0.5 lg:mb-2">
                    <p className="min-w-max text-xs lg:text-sm">
                      Status Absensi
                    </p>
                  </div>
                  {/* Informasi Lengkap Status */}
                  <div>
                    <p
                      className={`border-2 border-dashed font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md text-center ${getStatusColor(
                        presence.attendance_status
                      )}`}
                    >
                      {presence.attendance_status_label}
                    </p>
                    {/* <p className="bg-green-100 border-2 border-dashed border-green-500 text-green-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                    Hadir
                  </p>
                  <p className="bg-yellow-100 border-2 border-dashed border-yellow-500 text-yellow-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                    Belum hadir
                  </p>
                  <p className="bg-blue-100 border-2 border-dashed border-blue-500 text-blue-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                    Izin
                  </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-neutral4 text-center text-xs md:text-sm lg:text-base">
            Anda belum memiliki log kehadiran!
          </div>
        )}
      </div>

      {/* Tugas */}
      <div id="TugasAnda" className="md:col-span-2">
        {/* Judul Tugas */}
        <div className="flex gap-2 md:gap-4 border-b border-neutral4 mb-2 md:mb-3 lg:mb-4 p-2 md:p-3 lg:p-4 items-center">
          <div className="h-6 w-6 lg:h-8 lg:w-8 bg-primary5 fill-primary3 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-3 w-3 lg:h-4 lg:w-4"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
            </svg>
          </div>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold">
            Tugas Anda
          </h2>
        </div>
        {/* List Tugas */}
        {assignments.length > 0 ? (
          <div id="ListTugasAnda" className="flex flex-col gap-2 lg:gap-3">
            {assignments.map((assignment) => (
              <Link
                key={assignment.id}
                href={
                  assignment.deadline < today || assignment.start_time > today
                    ? "#"
                    : `student/classroom/${assignment.classroom.id}/assignment/${assignment.id}`
                }
                className={`group relative overflow-hidden flex flex-col md:flex-row justify-between rounded-xl border border-neutral4 p-2 md:p-3 lg:p-4 md:items-center gap-2 md:gap-3 lg:gap-4 transition-all duration-200 ease-in-out transform ${
                  assignment.deadline < today || assignment.start_time > today
                    ? "cursor-default"
                    : "cursor-pointer hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
                }`}
                onClick={(e) => {
                  if (
                    assignment.deadline < today ||
                    assignment.start_time > today
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                {assignment.deadline < today ||
                  (assignment.start_time > today ? (
                    <div className="absolute w-full h-full bg-neutral4 left-0 flex items-center justify-center bg-opacity-30 fill-neutral3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                      >
                        <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute w-full h-full hidden group-hover:flex left-0 items-center justify-center">
                      <p className="bg-primary5 text-primary3 font-semibold px-3 py-2 text-sm lg:text-base rounded-md">
                        Upload Tugas
                      </p>
                    </div>
                  ))}
                {/* Data Informasi Tugas */}
                <div className="flex gap-4 lg:gap-6 items-center">
                  {/* Icon Tugas */}
                  <div className="min-w-16 h-16 lg:min-w-20 lg:h-20 bg-primary5 fill-primary3 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      className="w-8 h-8 lg:w-10 lg:h-10"
                    >
                      <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
                    </svg>
                  </div>
                  {/* Informasi Tugas */}
                  <div>
                    <div className="flex gap-8 items-center">
                      <div>
                        <p className="text-base lg:text-lg font-semibold">
                          {assignment.title}
                        </p>
                        <p className="text-sm lg:text-base font-medium">
                          {assignment.classroom.name}
                        </p>
                      </div>
                      {/* <p className="h-max text-xs bg-primary3 rounded-md text-white font-medium py-1.5 px-2">
                        {assignment}
                      </p> */}
                    </div>
                    <div className="hidden md:flex items-center gap-2 md:gap-3 lg:gap-4 mt-2">
                      <div className="flex flex-col md:flex-row gap-0.5 md:gap-6">
                        <p className="text-neutral2 text-xs md:text-sm">
                          Diberikan{" "}
                          <strong className="font-normal text-black">
                            {formatDate(assignment.start_time)}
                          </strong>
                        </p>
                        <p className="text-neutral2 text-xs md:text-sm">
                          Deadline{" "}
                          <strong className="font-normal text-red-500">
                            {formatDate(assignment.deadline)}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Status */}
                <div className="flex justify-between items-start">
                  <div className="md:hidden flex items-center gap-2 md:gap-3 lg:gap-4 mt-2">
                    <div className="flex flex-col lg:flex-row gap-0.5 lg:gap-6">
                      <p className="text-neutral2 text-xs md:text-sm">
                        Diberikan{" "}
                        <strong className="font-normal text-black">
                          {formatDate(assignment.start_time)}
                        </strong>
                      </p>
                      <p className="text-neutral2 text-xs md:text-sm">
                        Deadline{" "}
                        <strong className="font-normal text-red-500">
                          {formatDate(assignment.deadline)}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="w-max bg-primary5 p-1.5 lg:p-2 rounded-lg">
                      {/* Judul Status */}
                      <div className="flex justify-between mb-1 lg:mb-2 items-center">
                        <p className="text-xs lg:text-sm">Status</p>
                        {/* Status Terlambat */}
                        {assignment.deadline < today &&
                          !assignment.is_uploaded && (
                            <p className="h-max text-[10px] lg:text-xs bg-red-500 text-white p-0.5 lg:p-1 rounded-md">
                              Terlambat
                            </p>
                          )}
                        {assignment.start_time > today && (
                          <p className="h-max text-[10px] lg:text-xs bg-green-500 text-white p-0.5 lg:p-1 rounded-md">
                            Belum dibuka
                          </p>
                        )}
                      </div>
                      {/* Informasi Lengkap Status */}
                      <div>
                        {assignment.is_uploaded ? (
                          <p className="bg-green-100 border-2 border-dashed border-green-500 text-green-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                            Sudah dikumpulkan
                          </p>
                        ) : (
                          <p className="bg-red-100 border-2 border-dashed border-red-500 text-red-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                            Belum dikumpulkan
                          </p>
                        )}
                        {/* <p className="bg-blue-100 border-2 border-dashed border-blue-500 text-blue-500 font-medium py-0.5 lg:py-1 px-1.5 lg:px-2 text-xs lg:text-sm rounded-md">
                        Menunggu penilaian
                      </p> */}
                      </div>
                    </div>
                    {/* Informasi Tanggal Diserahkan */}
                    {assignment.is_uploaded && (
                      <p className="text-neutral2 text-xs md:text-sm">
                        Diserahkan{" "}
                        <strong className="font-normal text-primary2">
                          {formatDate(assignment.tasks?.submitted_at)}
                        </strong>
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-neutral4 text-center text-xs md:text-sm lg:text-base">
            Anda belum memiliki tugas!
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
