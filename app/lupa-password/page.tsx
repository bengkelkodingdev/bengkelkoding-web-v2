import Image from "next/image";
import React from "react";
import Input from "../component/general/Input";
import Button from "../component/general/Button";
import Link from "next/link";

const LupaPasswordPage = () => {
  return (
    <div className="min-h-screen w-full flex">
      <div className="h-screen mx-auto md:w-[40%] lg:p-5 flex items-center">
        <div className="max-w-96 px-4 lg:px-0 mx-auto">
          <div>
            <Link href={"/"}>
              <Image
                src={"/logo/bengkelkoding-text.png"}
                alt="Bengkel Koding"
                width={150}
                height={150}
                className="mx-auto"
              />
            </Link>
            <div className="mt-8 mb-4 lg:mt-10 lg:mb-6">
              <h2 className="font-semibold">Lupa Password</h2>
              <p className="text-neutral3">
                Silakan masukkan alamat email yang terkait dengan akun Anda!
              </p>
            </div>
          </div>
          <form action="">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="11120210001@mhs.dinus.ac.id"
              required
            />
            <Link
              href={"/"}
              className="block mb-8 lg:mb-10 text-neutral3 hover:underline"
            >
              <p></p>
            </Link>
            <Button text="Kirim" className="w-full" />
          </form>
        </div>
      </div>
      <div className="hidden md:block h-screen w-[60%] py-3 pr-3 lg:p-5">
        <div
          className="h-full w-full bg-no-repeat bg-cover bg-center rounded-2xl p-8 lg:p-10 2xl:p-20"
          style={{ backgroundImage: "url('/img/h6-2.png')" }}
        >
          <div className="h-full w-full flex flex-col justify-between backdrop-blur-md bg-white/10 text-neutral6 rounded-xl p-5 2xl:p-10">
            <div className="flex items-center gap-2 font-semibold">
              <div className="w-5 h-0.5 bg-neutral6 rounded-full" />
              <p>Bengkel Koding</p>
              <div className="w-5 h-0.5 bg-neutral6 rounded-full" />
            </div>
            <h1 className="font-bold text-[32px] lg:text-[42px] 2xl:text-6xl 2xl:leading-normal">
              Lupa Password!
            </h1>
            <p>
              Hubungi kami jika anda mengalami kesulitan{" "}
              <strong>bengkelkodingudinus@gmail.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LupaPasswordPage;
