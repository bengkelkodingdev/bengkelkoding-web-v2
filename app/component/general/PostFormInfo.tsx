import { ClassInformation } from "@/app/interface/Kelas";

import React, { useState } from "react";

interface PostFormProps {
  user: ClassInformation;
  onSave: (postedUser: ClassInformation, status: string) => void;
}

const PostFormInfo: React.FC<PostFormProps> = ({ user, onSave }) => {
  const [title, setTitle] = useState(user.title);
  const [description, setDescription] = useState(user.description);

  const handleSave = () => {
    const postedUser: ClassInformation = {
      ...user,
      title: title,
      description: description,
    };
    onSave(postedUser, "post");
  };

  return (
    <div>
      <div className="p-4 md:p-5 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Judul
          </label>

          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Deskripsi
          </label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
            placeholder="Masukkan keterangan..."
            id="desc"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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

export default PostFormInfo;
