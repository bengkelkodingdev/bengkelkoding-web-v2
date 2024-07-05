import React from "react";
import Link from "next/link";

const StatusLabel = ({ presence, index, kelas }) => {
  console.log("Keseluruhan object presence:", kelas);

  // const presenceDate = new Date(presence.presence_date);
  // const today = new Date();
  // const isToday = today.toDateString() === presenceDate.toDateString();

  // TES ANOTHER DAY.

  const presenceDate = new Date(presence.presence_date);
  const today = "Wed Jun 26 2024";
  const isToday = today === presenceDate.toDateString();
  // -------
  return (
    <span
      className={`flex justify-center items-center gap-2 text-xs font-medium w-full h-[2rem] rounded-full ${
        isToday ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"
      }`}
    >
      {isToday ? (
        <Link href={`${kelas.classroom.id}/${index}`}>
          {" "}
          <p className="text-sm">Masuk</p>
        </Link>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12px"
            viewBox="0 -960 960 960"
            width="12px"
            fill="black"
          >
            <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
          </svg>
          <p className="text-sm">Terkunci</p>
        </div>
      )}
    </span>
  );
};

export default StatusLabel;
