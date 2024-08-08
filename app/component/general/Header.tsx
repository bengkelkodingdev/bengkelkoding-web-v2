"use client";
import { getRole } from "@/app/api/general";
import { loggedIn } from "@/app/api/checkAccessToken";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { logout } from "@/app/api/auth";

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

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const [user, setUser] = useState({
    role: "",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const login = isMounted && loggedIn();

  useEffect(() => {
    if (login) {
      const fetchData = async () => {
        try {
          // Response Role
          const responseRole = await getRole();
          setUser(responseRole.data);
        } catch (error) {
          console.error("Failed to fetch user role:", error);
        }
      };
      fetchData();
    }
  }, [login]);

  const handleLogout = async () => {
    if (login) {
      try {
        await logout();
        window.location.href = "/";
      } catch (error) {
        console.error("Logout failed:", error);
      }
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
            <div className="flex gap-3 items-center">
              <Link
                href={`/dashboard/${user.role}`}
                className="font-medium hover:text-primary1"
              >
                Dashboard
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                className="hover:fill-red1 cursor-pointer"
                onClick={handleLogout}
              >
                <g>
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                  <g>
                    <path d="M5,5h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h6c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H5V5z" />
                    <path d="M20.65,11.65l-2.79-2.79C17.54,8.54,17,8.76,17,9.21V11h-7c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h7v1.79 c0,0.45,0.54,0.67,0.85,0.35l2.79-2.79C20.84,12.16,20.84,11.84,20.65,11.65z" />
                  </g>
                </g>
              </svg>
            </div>
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
                <div className="flex flex-col gap-2 items-end">
                  <Link
                    href={`/dashboard/${user.role}`}
                    className="font-medium hover:text-primary1"
                  >
                    Dashboard
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="18px"
                    className="hover:fill-red1 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <g>
                      <path d="M0,0h24v24H0V0z" fill="none" />
                    </g>
                    <g>
                      <g>
                        <path d="M5,5h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h6c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H5V5z" />
                        <path d="M20.65,11.65l-2.79-2.79C17.54,8.54,17,8.76,17,9.21V11h-7c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h7v1.79 c0,0.45,0.54,0.67,0.85,0.35l2.79-2.79C20.84,12.16,20.84,11.84,20.65,11.65z" />
                      </g>
                    </g>
                  </svg>
                </div>
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
