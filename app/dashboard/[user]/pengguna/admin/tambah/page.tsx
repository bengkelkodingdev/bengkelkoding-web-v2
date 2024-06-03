import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import React from "react";

const DashboardTambahPenggunaAdminPage = () => {
  return (
    <>
      <form className="max-w-5xl flex flex-col gap-4">
        <div>
          <p className="font-semibold text-neutral2 text-base">Informasi</p>
          <p className="text-neutral3 text-sm">
            Indentitas pengguna role admin
          </p>
          <div className="grid grid-cols-2 gap-x-4 mt-2">
            <Input type="text" label="Nama" name="nama" required />
            <Input type="text" label="Email" name="email" required />
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral2 text-base">Autentikasi</p>
          <p className="text-neutral3 text-sm">Password untuk pengguna</p>
          <div className="grid grid-cols-2 gap-x-4 mt-2">
            <Input type="password" label="Password" name="password" required />
            <Input
              type="password"
              label="Konfirmasi Password"
              name="konfirmasi-password"
              required
            />
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral2 text-base">Status</p>
          <p className="text-neutral3 text-sm">Setup akun aktif atau tidak</p>
          <div className="mt-2 flex gap-4">
            <div className="flex gap-2">
              <input type="radio" />
              <label htmlFor="aktif">Aktif</label>
            </div>
            <div className="flex gap-2">
              <input type="radio" />
              <label htmlFor="tidak-aktif">Tidak Aktif</label>
            </div>
          </div>
        </div>

        <div className="text-end">
          <Button text="Tambah Admin" />
        </div>
      </form>
    </>
  );
};

export default DashboardTambahPenggunaAdminPage;
