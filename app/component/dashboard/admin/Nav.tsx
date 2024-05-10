import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface NavProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const Nav = ({ open, setOpen }: NavProps) => {
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  const [notificationIsOpen, setNotificationIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileIsOpen(false);
        setNotificationIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfile = () => {
    setProfileIsOpen(!profileIsOpen);
  };

  const toggleNotification = () => {
    setNotificationIsOpen(!notificationIsOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-neutral4">
      <div className="max-w-7xl mx-auto px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm fill-neutral2 rounded-lg sm:hidden hover:bg-neutral5 focus:outline-none focus:ring-2 focus:ring-neutral4"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open sidebar</span>
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM20 6H4c-.55 0-1 .45-1 1v.01c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z" />
                </svg>
              )}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={"/logo/bengkelkoding-text.png"}
                alt="Bengkel Koding"
                width={110}
                height={110}
              />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center" ref={dropdownRef}>
              <div>
                <button
                  type="button"
                  className="p-1 rounded-full fill-neutral2 hover:bg-neutral5 focus:bg-neutral5"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-notification"
                  onClick={toggleNotification}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z" />
                  </svg>
                </button>
              </div>
              {/* {notificationIsOpen && ( */}
              {notificationIsOpen && (
                <div
                  className="absolute top-8 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                  id="dropdown-notification"
                >
                  {/* notification data on here */}
                  <div className="px-4 py-3">This is Notification</div>
                </div>
              )}
              {/* )} */}
            </div>
            <div className="relative flex items-center" ref={dropdownRef}>
              <div>
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4 focus:ring-primary5"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-profile"
                  onClick={toggleProfile}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    src={"/img/user.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                    width={50}
                    height={50}
                  />
                </button>
              </div>
              {profileIsOpen && (
                <div
                  className="absolute top-8 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                  id="dropdown-profile"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm text-neutral1">Arif Saputra</p>
                    <p className="text-sm font-medium text-neutral1 truncate">
                      arif.sptrra@gmail.com
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
