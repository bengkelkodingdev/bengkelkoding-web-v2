import Link from "next/link";
import React from "react";

const AdminPage = () => {
  return (
    <div className="min-h-screen p-4 sm:ml-64">
      <div className="p-4 mt-14">
        <div className="grid grid-cols-4 gap-4">
          <Link
            href={"/"}
            className="p-10 border-2 border-neutral4 rounded-lg hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] hover:border-primary1 focus:ring-4 focus:ring-primary5 transition-all ease-out duration-200"
          >
            <strong className="text-4xl">600</strong>
            <p className="text-neutral3">Jumlah Mahasiswa</p>
          </Link>
          <Link
            href={"/"}
            className="p-10 border-2 border-neutral4 rounded-lg hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] hover:border-primary1 focus:ring-4 focus:ring-primary5 transition-all ease-out duration-200"
          >
            <strong className="text-4xl">600</strong>
            <p className="text-neutral3">Jumlah Mahasiswa</p>
          </Link>
          <Link
            href={"/"}
            className="p-10 border-2 border-neutral4 rounded-lg hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] hover:border-primary1 focus:ring-4 focus:ring-primary5 transition-all ease-out duration-200"
          >
            <strong className="text-4xl">600</strong>
            <p className="text-neutral3">Jumlah Mahasiswa</p>
          </Link>
          <Link
            href={"/"}
            className="p-10 border-2 border-neutral4 rounded-lg hover:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] hover:border-primary1 focus:ring-4 focus:ring-primary5 transition-all ease-out duration-200"
          >
            <strong className="text-4xl">600</strong>
            <p className="text-neutral3">Jumlah Mahasiswa</p>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="border-2 border-neutral4 rounded-lg p-10">
            <div>
              <strong className="text-xl">Kelas Aktif</strong>
              <p className="text-neutral3">
                Lihat kelas aktif yang berada di Bengkel Koding
              </p>
            </div>
          </div>
          <div className="border-2 border-neutral4 rounded-lg p-10">
            <div>
              <strong className="text-xl">Feedback Terbaru</strong>
              <p className="text-neutral3">
                Lihat feedback terbaru yang berada di Bengkel Koding
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
