"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import { ClassFormData, EditFormClassroom } from "@/app/interface/Kelas";

import Button from "@/app/component/general/Button";
import { toast, ToastContainer } from "react-toastify";
import {
  SelectLecture,
  SelectPath,
  SelectPeriod,
} from "@/app/interface/SelectData";

import { useSearchParams } from "next/navigation";

import InputBasic from "@/app/component/general/InputBasic";
import {
  createClassroom,
  getSelectLecture,
  getSelectPaths,
  getSelectPeriods,
  updateClassroom,
} from "@/app/api/kelas";
import {
  findDetailClassroom,
  getDetailClassroom,
} from "@/app/api/detailClassroom";

const DashboardTambahKelasPage: React.FC = () => {
  const searchParams = useSearchParams();
  const IdClassroom = searchParams.get("idClassroom");
  const StatusForm = searchParams.get("status");

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

  const [formDataEdit, setFormDataEdit] = useState<EditFormClassroom>();

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

      console.log("Data dosen berhasil di-fetch: ", response.data);
      setSelectLectureApi(response.data);
      console.log(
        "State selectLectureApi setelah di-update:",
        selectLectureApi
      );
    } catch (error) {
      console.error("Gagal mengambil data dosen:", error);
    }
  };

  const fetchSelectPaths = async () => {
    try {
      const response = await getSelectPaths();
      // console.log("responnan: ", response);
      setSelectPathApi(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchSelectPeriods = async () => {
    try {
      const response = await getSelectPeriods();
      // console.log("responnan: ", response);
      setSelectPeriodApi(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  // cari nama dosen
  const mapLectureToName = (lectureId: number) => {
    const lecture = selectLectureApi.find((lec) => {
      console.log(`Comparing "${lectureId}" with "${lec.id}"`);
      return lec.id === lectureId; // Langsung membandingkan
    });

    if (lecture) {
      console.log("Dosen ditemukan:", lecture.name); // Log nama dosen jika ditemukan
    } else {
      console.warn(`Dosen tidak ditemukan untuk ID: ${lectureId}`); // Tidak mencoba mengakses undefined
      console.log("Data selectLectureApi yang tersedia:", selectLectureApi); // Log data yang ada di selectLectureApi
    }

    return lecture ? lecture.name : "Dosen tidak ditemukan"; // Mengembalikan pesan default jika tidak ditemukan
  };

  const changeFormatTime = (time: string) => {
    return time.slice(0, 5);
  };

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

    if (StatusForm) {
      setFormDataEdit((prevData) => {
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
            name === "max_absent"
              ? value === ""
                ? undefined
                : Number(value)
              : value,
          // name === "total_class_session" ? value === "" ? undefined : Number(value): value,
        };
        console.log(`${name}: ${updatedData[name]}`);
        return updatedData;
      });
    } else {
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
    }
  };

  // eksperimen

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (StatusForm) {
      try {
        const response = await updateClassroom(
          formDataEdit,
          parseInt(IdClassroom)
        );
        toast.success("Berhasil Mengubah Kelas 😁");
        window.location.href = `./`;
      } catch (error) {
        console.error("Failed to update classroom", error);
        toast.error(`Gagal Mengubah Kelas 😔: ${error.message}`);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        }
      }
    } else {
      try {
        const response = await createClassroom(formData);
        toast.success("Berhasil Menambahkan Kelas 😁");
        window.location.href = `./`;
      } catch (error) {
        console.error("Failed to create classroom", error);
        toast.error(`Gagal Menambahkan Kelas 😔: ${error.message}`);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        }
      }
    }
  };

  // UseEffect

  useEffect(() => {
    fetchSelectLecture();
    fetchSelectPaths();
    fetchSelectPeriods();
  }, []);

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

  useEffect(() => {
    if (StatusForm && IdClassroom) {
      findDetailClassroom(IdClassroom)
        .then((response) => {
          // Pastikan ini sesuai dengan perubahan tipe response
          if (response && response.data && response.data.length > 0) {
            const classroomData = response.data[0]; // ambil dari array
            console.log("hasil", classroomData);

            // setFormDataEdit dengan data yang sudah difetch
            setFormDataEdit({
              name: classroomData.name,
              lecture_id: classroomData.lecture_id,
              path_id: classroomData.path_id,
              period_id: classroomData.period_id,
              description: classroomData.description,
              quota: classroomData.quota,
              day: classroomData.day,
              time_start: changeFormatTime(classroomData.time_start),
              time_end: changeFormatTime(classroomData.time_end),
              room: classroomData.room,
              task_percent: classroomData.task_percent,
              uts_percent: classroomData.uts_percent,
              uas_percent: classroomData.uas_percent,
              start_date: classroomData.start_date,
              max_absent: classroomData.max_absent,
            });
            console.log("sidosen", classroomData.lecture_id);
            const namaDosen = mapLectureToName(classroomData.lecture_id);
            setSearchTerm(namaDosen);
          } else {
            toast.error("Data kelas tidak ditemukan");
          }
        })
        .catch((error) => {
          console.error("Error fetching classroom details:", error);

          // Jika error berasal dari server, tampilkan pesan error dari response
          if (error.response) {
            console.error("1Error response data:", error.response.data);
            console.error("1Error status:", error.response.status);
            toast.error(
              `1Gagal memuat detail kelas: ${
                error.response.data.message || "Unknown error"
              }`
            );
          } else if (error.request) {
            // Jika request dibuat tetapi tidak ada respons
            console.error("2Error request:", error.request);
            toast.error(
              "2Gagal memuat detail kelas: Tidak ada respons dari server."
            );
          } else {
            // Kesalahan lain yang mungkin terjadi
            console.error("3Error message:", error.message);
            toast.error(`3Gagal memuat detail kelas: ${error.message}`);
          }
        });
    }
  }, [StatusForm, IdClassroom, selectLectureApi]);

  useEffect(() => {
    if (StatusForm === "edit" && selectLectureApi.length > 0 && IdClassroom) {
      findDetailClassroom(IdClassroom)
        .then((response) => {
          if (response) {
            const classroomData = response.data[0];

            const mappedLectureId = classroomData.lecture_id;
            console.log("Mapped Lecture ID HALLO:", mappedLectureId);
            setFormData((prevData) => ({
              ...prevData,
              lecture_id: mappedLectureId,
            }));
            setSelectedDosenId(mappedLectureId);
          } else {
            toast.error("Data kelas tidak ditemukan");
          }
        })
        .catch((error) => {
          console.error("Error fetching classroom details:", error);
          toast.error("2Gagal memuat detail kelas catch 2");
        });
    }
  }, [StatusForm, selectLectureApi, IdClassroom]); // Dependensi termasuk selectLectureApi

  return (
    <>
      <form className="max-w-5xl flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          {StatusForm == "edit" ? (
            <p className="font-semibold text-neutral2 text-base">Ubah Data</p>
          ) : (
            <p className="font-semibold text-neutral2 text-base">Tambah Data</p>
          )}
          <p className="text-neutral3 text-sm">Indentitas kelas</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mt-2">
            {/* nama */}
            <div>
              <InputBasic
                type="text"
                label="Nama"
                name="name"
                value={
                  StatusForm === "edit"
                    ? formDataEdit?.name || ""
                    : formData.name
                }
                onChange={handleChange}
                required
              />
              {/* dosen */}
              <div className="block" ref={dropdownRef}>
                <InputBasic
                  type="text"
                  label="Cari Dosen"
                  name="searchDosen"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsDropdownOpen(true)}
                />

                {isDropdownOpen && (
                  <div className="absolute z-10 w-[90%] sm:w-[40%] mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
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
                  // value={formData.path_id === undefined ? "" : formData.path_id}
                  value={
                    StatusForm === "edit"
                      ? formDataEdit?.path_id || ""
                      : formData.path_id
                  }
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
                  // value={
                  //   formData.period_id === undefined ? "" : formData.period_id
                  // }
                  value={
                    StatusForm === "edit"
                      ? formDataEdit?.period_id || ""
                      : formData.period_id
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
            <div className="h-full mt-3 mb-24 sm:mt-0 sm:mb-4">
              <label htmlFor="description" className="block text-neutral2">
                Deskripsi
              </label>
              <textarea
                name="description"
                id="description"
                className="h-[82%] mt-1  shadow-sm block w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
                value={
                  StatusForm === "edit"
                    ? formDataEdit?.description || ""
                    : formData.description
                }
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
          <p className="font-semibold text-neutral2 text-base mt-3 ">Detail</p>
          <p className="text-neutral3 text-sm">
            Informasi detail terkait kelas
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 mt-2">
            {/* kuota */}
            <InputBasic
              type="number"
              label="Kuota"
              name="quota"
              value={
                StatusForm === "edit"
                  ? formDataEdit?.quota || ""
                  : formData.quota
              }
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
                value={
                  StatusForm === "edit" ? formDataEdit?.day || "" : formData.day
                }
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

            {/* jam mulai */}
            <InputBasic
              type="time"
              label="Jam Mulai"
              name="time_start"
              value={
                StatusForm === "edit"
                  ? formDataEdit?.time_start || ""
                  : formData.time_start
              }
              onChange={handleChange}
              required
            />
            <InputBasic
              type="time"
              label="Jam selesai"
              name="time_end"
              value={
                StatusForm === "edit"
                  ? formDataEdit?.time_end || ""
                  : formData.time_end
              }
              onChange={handleChange}
              required
            />
            <InputBasic
              type="text"
              label="Ruangan"
              name="room"
              value={
                StatusForm === "edit" ? formDataEdit?.room || "" : formData.room
              }
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
            <InputBasic
              type="number"
              label="Tugas"
              name="task_percent"
              value={
                StatusForm === "edit"
                  ? formDataEdit?.task_percent || ""
                  : formData.task_percent
              }
              onChange={handleChange}
              required
            />
            <InputBasic
              type="number"
              label="UTS"
              name="uts_percent"
              value={
                StatusForm === "edit"
                  ? formDataEdit?.uts_percent || ""
                  : formData.uts_percent
              }
              onChange={handleChange}
              required
            />
            <InputBasic
              type="number"
              label="UAS"
              name="uas_percent"
              value={
                StatusForm === "edit"
                  ? formDataEdit?.uas_percent || ""
                  : formData.uas_percent
              }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 mt-2">
            <InputBasic
              type="number"
              label="Maksimal izin"
              name="max_absent"
              value={
                StatusForm === "edit"
                  ? formDataEdit?.max_absent || ""
                  : formData.max_absent
              }
              onChange={handleChange}
              required
            />

            {StatusForm ? (
              <></>
            ) : (
              <InputBasic
                type="number"
                label="Jumlah Pertemuan"
                name="total_class_session"
                value={formData.total_class_session}
                onChange={handleChange}
                required
              />
            )}

            <InputBasic
              type="date"
              label="Mulai Pertemuan"
              name="start_date"
              value={
                StatusForm === "edit"
                  ? formDataEdit?.start_date || ""
                  : formData.start_date
              }
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="text-end">
          {StatusForm == "edit" ? (
            <Button text="Update Kelas" type="submit" />
          ) : (
            <Button text="Tambah Kelas" type="submit" />
          )}
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default DashboardTambahKelasPage;
