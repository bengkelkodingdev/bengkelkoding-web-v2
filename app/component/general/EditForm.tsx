import { Presence } from "@/app/interface/Kelas";
import { stringify } from "querystring";
import React, { useState } from "react";

interface EditFormProps {
  user: Presence;
  onSave: (updatedUser: Presence) => void;
}

const EditForm: React.FC<EditFormProps> = ({ user, onSave }) => {
  const [date, setDate] = useState(user.presence_date);
  const [time, setTime] = useState(user.presence_date_formatted);

  const [status, setStatus] = useState(user.is_enabled_label);

  const handleSave = () => {
    const updatedUser: Presence = {
      ...user,
      presence_date: date,
      presence_date_formatted: time,
      is_enabled_label: status,
    };
    onSave(updatedUser);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold text-gray-900">Pertemuan</h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="default-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        <div>
          <label
            htmlFor="Date"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Date
          </label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="time"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Time
          </label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default EditForm;
