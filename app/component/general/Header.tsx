"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const url = usePathname();
  const activePath = url.split("/")[1];

  const navigations = [
    {
      link: "",
      text: "Home",
    },
    {
      link: "learning-path",
      text: "Learning Path",
    },
    {
      link: "kursus",
      text: "Kursus",
    },
  ];

  const login = false;
  const user = "superadmin";

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
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
        <div className="hidden md:flex gap-10">
          {navigations.map((nav, index) => (
            <Link
              key={index}
              href={`/${nav.link}`}
              className={`font-semibold ${
                nav.link == activePath
                  ? "text-primary1"
                  : "text-neutral1 hover:text-primary1"
              }`}
            >
              {nav.text}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          {login ? (
            <Link
              href={`/dashboard/${user}`}
              className="font-medium hover:text-primary1"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href={"/masuk"}
              className="bg-primary1 text-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              Masuk
            </Link>
          )}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            onClick={toggleMobileMenu}
          >
            <path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
          </svg>
        </div>
        <div
          className={`w-full fixed items-end h-screen flex md:hidden text-right bg-[#f7f9fa] bg-opacity-80 backdrop-blur-md top-0 right-0 z-50 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="w-[20%] h-screen" onClick={toggleMobileMenu}></div>
          <div className="w-[80%] h-screen bg-[#f7f9fa] bg-opacity-80 backdrop-blur-md">
            <div className="py-6 px-2 flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                onClick={toggleMobileMenu}
              >
                <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              {navigations.map((nav, index) => (
                <Link
                  key={index}
                  href={`/${nav.link}`}
                  className={`font-semibold px-2 ${
                    nav.link == activePath
                      ? "text-primary1"
                      : "text-neutral1 hover:text-primary1"
                  }`}
                >
                  {nav.text}
                </Link>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 mr-2">
              {login ? (
                <Link
                  href={`/dashboard/${user}`}
                  className="font-medium hover:text-primary1"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={"/masuk"}
                  className="bg-primary1 text-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
