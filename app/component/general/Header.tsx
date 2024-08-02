import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const login = false;
  const user = "superadmin";

  return (
    <header className="bg-[#f7f9fa] bg-opacity-80 backdrop-blur-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 lg:px-4 py-4 flex items-center justify-between">
        <Image
          src={"/logo/bengkelkoding-text.png"}
          alt={"Bengkel Koding"}
          width={110}
          height={110}
        />
        <div className="flex gap-10">
          <Link href={"/"} className="font-semibold text-primary1">
            Home
          </Link>
          <Link
            href={"/learning-path"}
            className="text-neutral1 hover:text-primary1 font-semibold"
          >
            Learning Path
          </Link>

          <Link
            href={"/kursus"}
            className="text-neutral1 hover:text-primary1 font-semibold"
          >
            Kursus
          </Link>
        </div>
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
    </header>
  );
};

export default Header;
