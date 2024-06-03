import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import React from "react";

const DashboardTambahKelasPage = () => {
  return (
    <>
      <form className="max-w-5xl flex flex-col gap-4">
        <div>
          <p className="font-semibold text-neutral2 text-base">FAQ</p>
          <p className="text-neutral3 text-sm">Pertanyaan yang sering ditanyakan</p>
          <div className="grid grid-cols-2 gap-x-4 mt-2">
            <div>
              <Input type="text" label="Pertanyaan" name="pertanyaan" required />
            </div>
            <div className="h-full">
              <label htmlFor="jawaban" className="block text-neutral2">
                Jawaban
              </label>
              <textarea
                name="jawaban"
                id="jawaban"
                className="h-[82%] mt-1 relative shadow-sm block w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div className="text-end mt-4">
          <Button text="Tambah Pertanyaan" />
        </div>
      </form>
    </>
  );
};

export default DashboardTambahKelasPage;
