"use client";
import {
  getActivatePeriod,
  getListPeriods,
  postSetActivePeriod,
} from "@/app/api/superadmin/pilihPeriode";
import Button from "@/app/component/general/Button";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeDashboardPilihPeriode = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listPeriods, setListPeriods] = useState([
    {
      id: 0,
      year: "",
      semester: "",
      is_active: false,
      period_ind: "",
    },
  ]);
  const [activePeriod, setActivePeriod] = useState({
    id: 0,
    year: "",
    semester: "",
    is_active: 0,
    period_ind: "",
  });

  const [selectedYear, setSelectedYear] = useState(activePeriod.year);
  const [selectedSemester, setSelectedSemester] = useState(
    activePeriod.semester
  );

  // Function to fetch periods
  const fetchData = async () => {
    try {
      // Get List Periods
      const responseListPeriods = await getListPeriods();
      setListPeriods(responseListPeriods.data);

      // Get Active Period
      const responseActivePeriod = await getActivatePeriod();
      const period = responseActivePeriod.data;
      setActivePeriod(period);
      setSelectedYear(period.year);
      setSelectedSemester(period.semester);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      setIsLoading(false);
    }
  };

  // UseEffect to load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
  };

  const handlePostActivePeriod = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postSetActivePeriod(selectedYear, selectedSemester);
      toast.success("Successfully changed the period 😁");

      // Fetch updated active period after change
      await fetchData();
    } catch (error: any) {
      toast.error(`Failed to change the period 😔: ${error.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
          Period {activePeriod.year} {activePeriod.semester}
        </p>
      </div>

      <div className="border border-neutral4 rounded-xl p-6">
        <h3 className="text-xl mb-1">Ganti Periode</h3>
        <p className="text-neutral2 text-base mb-1">
          Pilih periode yang ingin anda terapkan di Aplikasi Bengkel Koding.
        </p>
        <form
          className="flex gap-2 items-center"
          onSubmit={handlePostActivePeriod}
        >
          <p className="text-neutral2 text-base mb-1">Period</p>

          {/* Year Dropdown */}
          <select
            name="year-period"
            id="year-period"
            className="p-2.5 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Semester Dropdown */}
          <select
            name="semester-period"
            id="semester-period"
            className="p-2.5 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm border-neutral4"
            value={selectedSemester}
            onChange={handleSemesterChange}
          >
            <option value="odd">Odd</option>
            <option value="even">Even</option>
          </select>

          <Button text="Terapkan" type="submit" />
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomeDashboardPilihPeriode;
