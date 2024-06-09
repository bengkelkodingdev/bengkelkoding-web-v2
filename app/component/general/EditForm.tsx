import { Meeting } from "@/app/dashboard/[user]/kelas/detail/data";
import React, { useState } from "react";

interface EditFormProps {
  user: Meeting;
  onSave: (updatedUser: Meeting) => void;
}

const EditForm: React.FC<EditFormProps> = ({ user, onSave }) => {
  const [date, setDate] = useState(user.date);
  const [time, setTime] = useState(user.time);
  const [room, setRoom] = useState(user.room);
  const [status, setStatus] = useState(user.status);

  const handleSave = () => {
    const updatedUser: Meeting = {
      ...user,
      date,
      time,
      room,
      status,
    };
    onSave(updatedUser);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="Date" className="block font-bold mb-2">
          Date
        </label>
        <input
          type="text"
          id="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-400 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block font-bold mb-2">
          time
        </label>
        <input
          type="text"
          id="username"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border border-gray-400 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Room" className="block font-bold mb-2">
          Room
        </label>
        <input
          type="text"
          id="room"
          value={time}
          onChange={(e) => setRoom(e.target.value)}
          className="border border-gray-400 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block font-bold mb-2">
          status
        </label>
        <input
          type="text"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-400 p-2 w-full"
        />
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
