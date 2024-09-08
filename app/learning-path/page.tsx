"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "../component/general/Header";
import Footer from "../component/general/Footer";
import ContentPath from "../component/learning-path/ContentPath";
import { MenuPath } from "../interface/LearningPath";
import { getMenuLearningPath } from "../api/learning-path/getMenu-learningpaths";

export default function LearningPathPage() {
  const [menusPath, setMenusPath] = useState<MenuPath[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuPath | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false); // State untuk menentukan mode tampilan

  const pathNavRef = useRef<HTMLDivElement>(null);

  const fetchMenuPathList = async () => {
    const response = await getMenuLearningPath();
    setMenusPath(response);
  };

  useEffect(() => {
    fetchMenuPathList();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (menusPath.length > 0 && !selectedMenu) {
      const defaultMenu = menusPath.find((menu) => menu.id === 1);
      setSelectedMenu(defaultMenu || null);
    }
  }, [menusPath, selectedMenu]);

  const handleMenuClick = (menu: MenuPath) => {
    setSelectedMenu(menu);
    setActiveMenuId(menu.id);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    const selected = menusPath.find((menu) => menu.id === selectedId);
    if (selected) {
      setSelectedMenu(selected);
      setActiveMenuId(selected.id);
    }
  };

  const pathNavScrollLeft = () => {
    if (pathNavRef.current) {
      pathNavRef.current.scrollBy({
        left: -180,
        behavior: "smooth",
      });
    }
  };

  const pathNavScrollRight = () => {
    if (pathNavRef.current) {
      pathNavRef.current.scrollBy({
        left: 180,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#f7f9fa]">
      <Header />

      <div className="box-path px-2 py-2 border-b">
        <div className="lg:max-w-7xl md:max-w-5xl mx-auto flex items-center gap-4">
          {isMobile ? (
            // Dropdown untuk mode mobile
            <select
              className="w-full p-2 border rounded-md"
              value={activeMenuId || ""}
              onChange={handleSelectChange}
            >
              {menusPath.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
            </select>
          ) : (
            // Navigasi untuk mode desktop
            <>
              <button
                className="fill-neutral3 hover:fill-neutral1 hidden md:block"
                onClick={pathNavScrollLeft}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32px"
                  viewBox="0 -960 960 960"
                  width="32px"
                >
                  <path d="M472-440h128q17 0 28.5-11.5T640-480q0-17-11.5-28.5T600-520H472l36-36q11-11 11-28t-11-28q-11-11-28-11t-28 11L348-508q-12 12-12 28t12 28l104 104q11 11 28 11t28-11q11-11 11-28t-11-28l-36-36Zm8 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </button>
              <nav
                ref={pathNavRef}
                className="flex-1 overflow-x-auto no-scrollbar whitespace-nowrap flex gap-3"
              >
                {menusPath.map((menu, index) => (
                  <button
                    key={index}
                    className={`menu-item px-4 py-2 text-base hover:text-neutral2 ${
                      activeMenuId === menu.id ? "font-semibold" : ""
                    }`}
                    onClick={() => handleMenuClick(menu)}
                  >
                    {menu.name}
                  </button>
                ))}
              </nav>
              <button
                className="fill-neutral3 hover:fill-neutral1 hidden md:block"
                onClick={pathNavScrollRight}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32px"
                  viewBox="0 -960 960 960"
                  width="32px"
                >
                  <path d="m488-440-36 36q-11 11-11 28t11 28q11 11 28 11t28-11l104-104q12-12 12-28t-12-28L508-612q-11-11-28-11t-28 11q-11 11-11 28t11 28l36 36H360q-17 0-28.5 11.5T320-480q0 17 11.5 28.5T360-440h128Zm-8 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      <main className="w-full mx-auto px-2 lg:px-4 py-4 min-h-screen mt-2 ">
        {selectedMenu && (
          <div
            className="flex justify-center items-center flex-col content-section"
            data-section-id={selectedMenu.id}
          >
            <ContentPath selectedMenu={selectedMenu.id} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
