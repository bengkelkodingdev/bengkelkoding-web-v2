import { Assistant, ClassInformation } from "@/app/interface/Kelas";

import React, { useState } from "react";

interface PostFormProps {
  user: Assistant;
  onSave: (postedUser: Assistant, status: string) => void;
}

const PostFormAsisten: React.FC<PostFormProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [nim, setNim] = useState(user.nim);

  const handleSave = () => {
    const postedUser: Assistant = {
      ...user,
      name: name,
      nim: nim,
    };
    onSave(postedUser, "post");
  };

  return (
    <div>
      <div className="p-4 md:p-5 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nama
          </label>

          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div>
          <label
            htmlFor="nim"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nim
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            id="nim"
            required
            value={nim}
            onChange={(e) => setNim(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PostFormAsisten;
