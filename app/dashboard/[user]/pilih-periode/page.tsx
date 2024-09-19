import Button from "@/app/component/general/Button";
import React from "react";

const HomeDashboardPilihPeriode = () => {
  return (
    <>
      <div className="mb-4 border border-neutral4 rounded-xl p-6">
        <h3 className="text-xl mb-1">Periode Terpilih Saat Ini</h3>
        <p className="text-neutral2 text-base mb-1">
          Periode yang terpilih saat ini, merupakan periode yang berjalan di
          seluruh sistem Aplikasi Bengkel Koding.
        </p>
        <p className="text-neutral2 text-base mb-1">
          Periode ini mempengaruhi seluruh data yang ada di Aplikasi Bengkel
          Koding.
        </p>
        <p className="text-primary1 text-lg p-4 font-semibold bg-primary5 w-max rounded-xl">
          Periode 2023 Odd
        </p>
      </div>
      <div className="border border-neutral4 rounded-xl p-6">
        <h3 className="text-xl mb-1">Ganti Periode</h3>
        <p className="text-neutral2 text-base mb-1">
          Pilih periode yang ingin anda terapkan di Aplikasi Bengkel Koding.
        </p>
        <form className="flex gap-2 items-center">
          <p className="text-neutral2 text-base mb-1">Periode</p>
          <select
            name="year-period"
            id="year-period"
            className="p-2.5 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <select
            name="semester-period"
            id="semester-period"
            className="p-2.5 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
          >
            <option value="odd">Odd</option>
            <option value="even">Even</option>
          </select>
          <Button text="Terapkan" />
        </form>
      </div>
    </>
  );
};

export default HomeDashboardPilihPeriode;
