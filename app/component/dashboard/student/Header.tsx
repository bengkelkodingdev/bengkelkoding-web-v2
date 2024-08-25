import { logout } from "@/app/api/auth";
import { getProfile } from "@/app/api/general";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const StudentHeader = () => {
  // State to manage the visibility of the dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Reference to the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside of the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Attach event listener once on mount

  const [profile, setProfile] = useState({
    id: 0,
    identity_code: "",
    name: "",
    email: "",
    role: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseProfile = await getProfile();
      setProfile(responseProfile.data);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-[#f7f9fa] bg-opacity-80 backdrop-blur-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 lg:px-4 py-4 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/logo/bengkelkoding-text.png"}
            alt={"Bengkel Koding"}
            width={110}
            height={110}
          />
        </Link>
        {/* Avatar Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {/* Image */}
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={toggleDropdown}
          >
            <Image
              src={profile.image}
              alt="Photo Profile"
              width={100}
              height={100}
            />
          </div>
          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div
              id="userDropdown"
              className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow overflow-hidden min-w-48"
            >
              <div className="px-4 py-3 text-sm text-gray-900 flex flex-col gap-1">
                <p className="text-xs md:text-sm font-medium">{profile.name}</p>
                <p className="text-xs md:text-sm">
                  {profile.email}
                </p>
                <p className="text-xs md:text-sm">
                  {profile.identity_code}
                </p>
              </div>
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="avatarButton"
              >
                <li>
                  <a
                    href="setting"
                    className="text-xs md:text-sm block px-4 py-2 hover:bg-gray-100"
                  >
                    Pengaturan
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="text-xs md:text-sm block px-4 py-2 text-red-700 hover:bg-red-100"
                  onClick={handleLogout}
                >
                  Keluar
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
