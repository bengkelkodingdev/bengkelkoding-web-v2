import Image from "next/image";
import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div
      className="h-screen w-full flex flex-col items-center text-center gap-6 bg-no-repeat bg-cover bg-center p-8 lg:p-10 2xl:p-20"
      style={{ backgroundImage: "url('/img/not-found.png')" }}
    >
      <Image
        src={"/logo/bengkelkoding-text.png"}
        alt="Bengkel Koding"
        width={150}
        height={150}
        className="mb-36"
      />
      <p className="text-3xl">😔</p>
      <h2 className="font-bold">Upss, halaman tidak ditemukan</h2>
      <p className="text-neutral3">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari.
      </p>
      <Link href={"/"} className="mt-8 flex items-center gap-2 font-medium text-primary1 fill-primary1 hover:text-primary2 hover:fill-primary2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
        </svg>
        <p>Kembali ke halaman beranda</p>
      </Link>
    </div>
  );
};

export default PageNotFound;
