import React, { useState } from "react";

const ModalFormKeterangan: React.FC = () => {

  return (
    <div>
      <div className=" grid mt-4 gap-4 w-96"> 
        <div className="">
          <label 
            htmlFor="keterangan" 
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Keterangan
          </label>
          <textarea
            id="keterangan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
            placeholder="Masukkan keterangan..."
          ></textarea>
        </div>
      </div>

      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default ModalFormKeterangan;
