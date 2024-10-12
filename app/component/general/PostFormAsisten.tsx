"use client";
import { Assistant, ClassInformation } from "@/app/interface/Kelas";
import React, { useEffect, useRef, useState } from "react";
import InputBasic from "./InputBasic";
import { SelectAssistant } from "@/app/interface/SelectData";
import { getSelectAssistant, postAssistant } from "@/app/api/kelas";

interface PostFormProps {
  onSave: (postedUser: Assistant, status: string) => void;
  user: Assistant;
  idClassroom: number;
}

const PostFormAsisten: React.FC<PostFormProps> = ({
  user,
  idClassroom,
  onSave,
}) => {
  const handleSave = () => {
    if (!selectedAssistantId) {
      console.error("Assistant belum dipilih");
      return;
    }

    if (selectedAssistantId && selectedAssistantNIM) {
      const postedUser: Assistant = {
        id: selectedAssistantId, // Pastikan ID asisten sudah terdefinisi
        name: searchTerm, // Nama asisten yang dipilih
        nim: selectedAssistantNIM, // identity_code asisten yang dipilih
      };

      onSave(postedUser, "post"); // Panggil fungsi onSave dengan objek Assistant dan status
    } else {
      console.error("Asisten belum dipilih");
    }
  };

  const [selectedAssistantId, setSelectedAssistantId] = useState<
    string | undefined
  >(undefined);
  const [selectAssistantApi, setSelectAssistantApi] = useState<
    SelectAssistant[]
  >([]);
  const [selectedAssistantNIM, setSelectedAssistantNim] = useState<
    string | undefined
  >(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredAssistantOptions = selectAssistantApi.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    setIsDropdownOpen(true);
  };

  const fetchSelectAssistant = async () => {
    try {
      const response = await getSelectAssistant(idClassroom);

      setSelectAssistantApi(response.data);
    } catch (error) {
      console.error("Gagal mengambil data assistant:", error);
    }
  };

  useEffect(() => {
    fetchSelectAssistant();
  }, []);

  const handleSelectAssistant = (
    assistantId: string,
    assistantName: string,
    assistantNim: string
  ) => {
    setSelectedAssistantId(assistantId);
    setSearchTerm(assistantName);
    setSelectedAssistantNim(assistantNim);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div className="p-4 md:p-5 space-y-4">
        <div className="block" ref={dropdownRef}>
          {" "}
          <InputBasic
            type="text"
            id="name"
            label="Nama"
            name="searchAssistant"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
          />
          {isDropdownOpen && (
            <div className="absolute max-h-60 overflow-y-scroll z-10 px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {filteredAssistantOptions.length > 0 ? (
                filteredAssistantOptions.map((option) => (
                  <div
                    key={option.id}
                    className="cursor-pointer p-2  hover:bg-gray-100"
                    onClick={() =>
                      handleSelectAssistant(
                        option.id.toString(),
                        option.name,
                        option.identity_code
                      )
                    }
                  >
                    {option.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">
                  Tidak ada Asisten yang cocok
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <InputBasic
            type="text"
            id="nim"
            label="NIM"
            name="searchAssistant"
            value={selectedAssistantNIM}
            disabled
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
