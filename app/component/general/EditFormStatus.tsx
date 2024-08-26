import { Student } from "@/app/interface/DetailSesi";
import React, { useState } from "react";

interface EditStatusProps {
  user: Student;
  onSave: (updatedUser: Student) => void;
}

const EditFormStatus: React.FC<EditStatusProps> = ({ user, onSave }) => {
  const [status, setStatus] = useState(user.is_present);
  const [statusLabel, setStatusLabel] = useState(user.is_present_label);

  const handleSave = () => {
    const updatedUser: Student = {
      ...user,
      is_present: status,
      is_present_label: status ? "Hadir" : "Tidak Hadir",
    };
    onSave(updatedUser);
  };

  return (
    <div>
      <div className="grid mt-4 gap-4 w-96">
        <div>
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Status Kehadiran
          </label>
          <select
            id="status"
            value={status ? "Hadir" : "Tidak Hadir"}
            onChange={(e) => {
              const isPresent = e.target.value === "Hadir";
              setStatus(isPresent);
              setStatusLabel(isPresent ? "Hadir" : "Tidak Hadir");
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="Tidak Hadir">Tidak Hadir</option>
            <option value="Hadir">Hadir</option>
          </select>
        </div>
      </div>

      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default EditFormStatus;
