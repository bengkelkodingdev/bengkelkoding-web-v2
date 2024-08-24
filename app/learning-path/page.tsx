"use client";
import React, { useEffect, useState } from "react";
import Header from "../component/general/Header";
import Footer from "../component/general/Footer";
import ContentPath from "../component/learning-path/ContentPath";
import { MenuPath, ResponMenuPath } from "../interface/LearningPath";
import { getMenuLearningPath } from "../api/learning-path/getMenu-learningpaths";

export default function LearningPathPage() {
  const [menusPath, setMenusPath] = useState<MenuPath[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuPath | null>(null);

  const fetchMenuPathList = async () => {
    const response = await getMenuLearningPath();
    setMenusPath(response);
  };

  useEffect(() => {
    fetchMenuPathList();
  }, []);

  useEffect(() => {
    if (menusPath.length > 0 && !selectedMenu) {
      const defaultMenu = menusPath.find((menu) => menu.id === 1);
      setSelectedMenu(defaultMenu || null);
    }
  }, [menusPath, selectedMenu]);

  const handleMenuClick = (menu: MenuPath) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="bg-[#f7f9fa]">
      <Header />
      <div className="box-path px-2 py-2 flex gap-3 items-center border-b">
        {/* konsum disini */}
        <div className="max-w-7xl mx-auto ">
          {menusPath.map((menu, index) => (
            <button
              key={index}
              className="menu-item px-4 py-2 text-lg "
              onClick={() => handleMenuClick(menu)}
            >
              {menu.name}
            </button>
          ))}
        </div>
      </div>
      <main className="w-full mx-auto px-2 lg:px-4 py-4 min-h-screen">
        {selectedMenu && (
          <div className=" flex justify-center items-center flex-col">
            <ContentPath selectedMenu={selectedMenu.id} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
