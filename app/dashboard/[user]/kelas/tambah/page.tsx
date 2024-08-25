"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import { ClassFormData } from "@/app/interface/Kelas";
import { createClassroom } from "@/app/api/admin/api-kelas/tambah-kelas/post-kelas";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import { toast, ToastContainer } from "react-toastify";
import {
  SelectLecture,
  SelectPath,
  SelectPeriod,
} from "@/app/interface/SelectData";
import { getSelectLecture } from "@/app/api/admin/api-kelas/tambah-kelas/select-lecture";
import { getSelectPaths } from "@/app/api/admin/api-kelas/tambah-kelas/select-path";
import { getSelectPeriods } from "@/app/api/admin/api-kelas/tambah-kelas/select-period";

const DashboardTambahKelasPage: React.FC = () => {
  const [formData, setFormData] = useState<ClassFormData>({
    name: "",
    lecture_id: undefined,
    path_id: undefined,
    period_id: undefined,
    description: "",
    quota: undefined,
    day: undefined,
    time_start: "",
    time_end: "",
    room: "",
    task_percent: undefined,
    uts_percent: undefined,
    uas_percent: undefined,
    start_date: "",
    max_absent: undefined,
    total_class_session: undefined,
  });

  const [selectedDosenId, setSelectedDosenId] = useState<number | undefined>(
    undefined
  );

  const [selectLectureApi, setSelectLectureApi] = useState<SelectLecture[]>([]);
  const [selectPathApi, setSelectPathApi] = useState<SelectPath[]>([]);
  const [selectPeriodApi, setSelectPeriodApi] = useState<SelectPeriod[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [descriptionCharCount, setDescriptionCharCount] = useState<number>(0);
  const maxDescriptionLength = 255;

  const fetchSelectLecture = async () => {
    try {
      const response = await getSelectLecture();
      console.log("responnan: ", response);
      setSelectLectureApi(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchSelectPaths = async () => {
    try {
      const response = await getSelectPaths();
      console.log("responnan: ", response);
      setSelectPathApi(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchSelectPeriods = async () => {
    try {
      const response = await getSelectPeriods();
      console.log("responnan: ", response);
      setSelectPeriodApi(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchSelectLecture();
    fetchSelectPaths();
    fetchSelectPeriods();
  }, []);

  // Fungsi untuk menangani perubahan pada input pencarian dosen
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    setIsDropdownOpen(true);
  };

  // Fungsi untuk memilih dosen
  const handleSelectDosen = (dosenId: number, dosenName: string) => {
    setSelectedDosenId(dosenId);
    setSearchTerm(dosenName);
    setIsDropdownOpen(false);
    setFormData((prevData) => ({
      ...prevData,
      lecture_id: dosenId,
    }));
    console.log(`Selected Dosen ID: ${dosenId}`);
  };

  // Efek untuk menutup dropdown ketika mengklik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter dosen berdasarkan pencarian
  const filteredDosenOptions = selectLectureApi.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "description") {
      setDescriptionCharCount(value.length);
    }

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]:
          name === "day" ||
          name === "lecture_id" ||
          name === "path_id" ||
          name === "period_id" ||
          name === "quota" ||
          name === "task_percent" ||
          name === "uts_percent" ||
          name === "uas_percent" ||
          name === "max_absent" ||
          name === "total_class_session"
            ? value === ""
              ? undefined
              : Number(value)
            : value,
      };
      console.log(`${name}: ${updatedData[name]}`);
      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createClassroom(formData);

      toast.success("Berhasil Menambahkan Kelas 😁");
      window.location.href = `./`;
      // Tambahkan logika untuk menangani sukses, misalnya navigasi ke halaman lain atau menampilkan notifikasi
    } catch (error) {
      console.error("Failed to create classroom", error);
      toast.error(`Gagal Menambahkan Kelas 😔: ${error.message}`);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      // Tambahkan logika untuk menangani error, misalnya menampilkan pesan error kepada pengguna
    }
  };

  return (
    <>
      <form className="max-w-5xl flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <p className="font-semibold text-neutral2 text-base">Informasi</p>
          <p className="text-neutral3 text-sm">Indentitas kelas</p>
          <div className="grid grid-cols-2 gap-x-4 mt-2">
            {/* nama */}
            <div>
              <Input
                type="text"
                label="Nama"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {/* dosen */}
              <div className="relative" ref={dropdownRef}>
                <Input
                  type="text"
                  label="Cari Dosen"
                  name="searchDosen"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsDropdownOpen(true)}
                />

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredDosenOptions.length > 0 ? (
                      filteredDosenOptions.map((option) => (
                        <div
                          key={option.id}
                          className="cursor-pointer p-2 hover:bg-gray-100"
                          onClick={() =>
                            handleSelectDosen(option.id, option.name)
                          }
                        >
                          {option.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        Tidak ada dosen yang cocok
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* path */}
              <div className="mt-3">
                <label htmlFor="path_id" className="block text-neutral2">
                  Path kursus
                </label>
                <select
                  name="path_id"
                  id="path_id"
                  className="mt-1 block w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                  value={formData.path_id === undefined ? "" : formData.path_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Path Kursus</option>
                  {selectPathApi.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* periode */}
              <div className="mt-3">
                <label htmlFor="period_id" className="block text-neutral2">
                  Periode Kelas
                </label>
                <select
                  name="period_id"
                  id="period_id"
                  className="mt-1 block w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                  value={
                    formData.period_id === undefined ? "" : formData.period_id
                  }
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Periode Kelas</option>
                  {selectPeriodApi.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* deskripsi */}
            <div className="h-full">
              <label htmlFor="description" className="block text-neutral2">
                Deskripsi
              </label>
              <textarea
                name="description"
                id="description"
                className="h-[82%] mt-1 relative shadow-sm block w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                value={formData.description}
                onChange={handleChange}
                maxLength={maxDescriptionLength}
                required
              ></textarea>
              <div
                className={`text-sm mt-1 ${
                  descriptionCharCount == maxDescriptionLength
                    ? "text-red-500"
                    : "text-neutral2"
                }`}
              >
                {descriptionCharCount}/{maxDescriptionLength} karakter
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-neutral2 text-base">Detail</p>
          <p className="text-neutral3 text-sm">
            Informasi detail terkait kelas
          </p>
          <div className="grid grid-cols-4 gap-x-4 mt-2">
            <Input
              type="number"
              label="Kuota"
              name="quota"
              value={formData.quota}
              onChange={handleChange}
              required
            />
            {/* Hari */}
            <div>
              <label htmlFor="day" className="block text-neutral2">
                Hari
              </label>
              <select
                name="day"
                id="day"
                className="mt-1 block w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                value={formData.day}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Hari</option>
                <option value={1}>Senin</option>
                <option value={2}>Selasa</option>
                <option value={3}>Rabu</option>
                <option value={4}>Kamis</option>
                <option value={5}>Jumat</option>
                <option value={6}>Sabtu</option>
                <option value={0}>Minggu</option>
              </select>
            </div>
            <Input
              type="text"
              label="Jam Mulai"
              name="time_start"
              value={formData.time_start}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Jam selesai"
              name="time_end"
              value={formData.time_end}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Ruangan"
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
            />
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
            <Input
              type="number"
              label="Tugas"
              name="task_percent"
              value={formData.task_percent}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              label="UTS"
              name="uts_percent"
              value={formData.uts_percent}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              label="UAS"
              name="uas_percent"
              value={formData.uas_percent}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <p className="font-semibold text-neutral2 text-base">
            Kontrak Pertemuan
          </p>
          <p className="text-neutral3 text-sm">Ketentuan penjadwalan</p>
          <div className="grid grid-cols-3 gap-x-4 mt-2">
            <Input
              type="number"
              label="Maksimal izin"
              name="max_absent"
              value={formData.max_absent}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              label="Jumlah Pertemuan"
              name="total_class_session"
              value={formData.total_class_session}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              label="Mulai Pertemuan"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="text-end">
          <Button text="Tambah Kursus" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default DashboardTambahKelasPage;
