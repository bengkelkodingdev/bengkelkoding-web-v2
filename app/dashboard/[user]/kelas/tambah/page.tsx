import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import React from "react";

const DashboardTambahKelasPage = () => {
  return (
    <>
      <form className="max-w-5xl flex flex-col gap-4">
        <div>
          <p className="font-semibold text-neutral2 text-base">Informasi</p>
          <p className="text-neutral3 text-sm">Indentitas kelas</p>
          <div className="grid grid-cols-2 gap-x-4 mt-2">
            <div>
              <Input type="text" label="Nama" name="nama" required />
              <Input type="text" label="Dosen" name="dosen" required />
              <Input type="text" label="Path Kursus" name="path" required />
            </div>
            <div className="h-full">
              <label htmlFor="deskripsi" className="block text-neutral2">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                id="deskripsi"
                className="h-[82%] mt-1 relative shadow-sm block w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral2 text-base">Detail</p>
          <p className="text-neutral3 text-sm">
            Informasi detail terkait kelas
          </p>
          <div className="grid grid-cols-4 gap-x-4 mt-2">
            <Input type="number" label="Kuota" name="kuota" required />
            <Input type="text" label="Hari" name="hari" required />
            <Input type="text" label="Jam" name="jam" required />
            <Input type="text" label="Ruangan" name="ruangan" required />
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral2 text-base">
            Kontrak Kuliah
          </p>
          <p className="text-neutral3 text-sm">
            Presentase untuk penghitungan nilai akhir
          </p>
          <div className="grid grid-cols-3 gap-x-4 mt-2">
            <Input type="text" label="Tugas" name="tugas" required />
            <Input type="text" label="UTS" name="uts" required />
            <Input type="text" label="UAS" name="uas" required />
          </div>
        </div>

        <div className="text-end">
          <Button text="Tambah Kursus" />
        </div>
      </form>
    </>
  );
};

export default DashboardTambahKelasPage;
