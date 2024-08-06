"use client";

import React, { useEffect, useState } from "react";
import Header from "../component/general/Header";
import { menuData, MenuPath } from "../data/LearningPath-Dummy";
import Button from "../component/general/Button";
import Footer from "../component/general/Footer";
import ContentPath from "../component/learning-path/ContentPath";

export default function LearningPathPage() {
  const [menusPath, setMenusPath] = useState<MenuPath[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuPath | null>(null);

  useEffect(() => {
    setMenusPath(menuData);
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
      <div className="box-path max-w-7xl mx-auto px-2 lg:px-4 py-4 flex items-center ">
        {/* konsum disini */}
        {menusPath.map((menu, index) => (
          <button
            key={index}
            className="menu-item px-4 py-2"
            onClick={() => handleMenuClick(menu)}
          >
            {menu.name}
          </button>
        ))}
      </div>
      <main className="max-w-5xl mx-auto px-2 lg:px-4 py-4 min-h-screen">
        {selectedMenu && (
          <div>
            <ContentPath selectedMenu={selectedMenu.id} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
