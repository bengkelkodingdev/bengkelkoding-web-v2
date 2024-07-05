import { Presence } from "@/app/interface/Kelas";
import { stringify } from "querystring";
import React, { useState } from "react";



const EditFormKelas: React.FC = () => {

  return (
    <div>
      <div className=" grid mt-4 gap-4 grid-cols-6">     
        <div className="col-span-3">
            <label htmlFor="kelas" className="block mb-2 text-sm font-medium text-gray-900 ">Nama Kelas</label>
            <input type="text" name="kelas" id="kelas" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Masukan nama kelas"/>
        </div>
        <div className="col-span-3">
            <label htmlFor="Dosen" className="block mb-2 text-sm font-medium text-gray-900 ">Dosen</label>
            <input type="text" name="Dosen" id="Dosen" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Masukkan Dosen"/>
        </div>
        <div className="col-span-3">
            <label htmlFor="room" className="block mb-2 text-sm font-medium text-gray-900 ">Kelas</label>
            <input type="text" name="room" id="room" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Masukkan Kelas"/>
        </div>
        <div className="col-span-3">
          <label 
            htmlFor="days" 
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Hari
          </label>
          <select 
            id="days" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            <option>Senin</option>
            <option>Selasa</option>
            <option>Rabu</option>
            <option>Kamis</option>
            <option>Jumat</option>
            <option>Sabtu</option>
            <option>MInggu</option>
          </select>
        </div>
        <div className="col-span-2">
            <label htmlFor="Jam" className="block mb-2 text-sm font-medium text-gray-900 ">Jam</label>
            <input type="text" name="Jam" id="Jam" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Masukkan Jam"/>
        </div>
        <div className="col-span-2">
            <label htmlFor="Kuota" className="block mb-2 text-sm font-medium text-gray-900 ">Kuota</label>
            <input type="text" name="Kuota" id="Kuota" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Masukkan Kuota"/>
        </div>
        <div className="col-span-2">
            <label htmlFor="Terisi" className="block mb-2 text-sm font-medium text-gray-900 ">Terisi</label>
            <input type="text" name="Terisi" id="Terisi" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Masukkan Jumlah Terisi"/>
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

export default EditFormKelas;
