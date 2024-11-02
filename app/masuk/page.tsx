"use client";

import Image from "next/image";
import React, { useState } from "react";
import Input from "../component/general/Input";
import Button from "../component/general/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { login } from "../api/auth";
import { LoginResponse } from "../component/types/auth";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const LOGIN_WITH_GOOGLE: string =
  process.env.NEXT_PUBLIC_API_LOGIN_WITH_GOOGLE || "";

const MasukPage = () => {
  // for input data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for user role path
  const roleToPath = {
    student: "/dashboard/student",
    assistant: "/dashboard/asisten",
    lecture: "/dashboard/dosen",
    admin: "/dashboard/admin",
    superadmin: "/dashboard/superadmin",
  };

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // call login api
      const response: LoginResponse = await login(email, password);

      // Set status message and show alert
      toast.success("Berhasil Masuk!");

      // Handle login success
      if (response.meta.success) {
        // set cookie
        Cookies.set("access_token", response.token);
        Cookies.set("user_role", response.data.role);
        // push to dashboard
        const path =
          roleToPath[response.data.role as keyof typeof roleToPath] || "/";
        router.push(path);
      } else {
        toast.success(response.meta.message);
      }
    } catch (error) {
      toast.error("Gagal Masuk. Email atau Password Anda Salah!");
    }
  };

  return (
    <>
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
                <h2 className="font-semibold">Masuk</h2>
                <p className="text-neutral3">
                  Siap Meningkatkan Diri, dan Siap Berkembang? Ayo Masuk!
                </p>
              </div>
            </div>
            <form onSubmit={handleLogin}>
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="11120210001@mhs.dinus.ac.id"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Input password anda"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                href={"/lupa-password"}
                className="block -mt-3 mb-8 lg:mb-10 text-neutral3 hover:underline"
              >
                <p>Lupa password?</p>
              </Link>
              <Button type="submit" text="Masuk" className="w-full" />
            </form>
            {/* or login with google */}
            <div className="flex gap-2 items-center my-6">
              <div className="w-full h-0.5 bg-gray-200 rounded-full" />
              <p className="text-xs text-neutral2">atau</p>
              <div className="w-full h-0.5 bg-gray-200 rounded-full" />
            </div>
            <Link
              href={LOGIN_WITH_GOOGLE}
              className="w-full flex items-center justify-center gap-2 bg-neutral6 text-black hover:bg-neutral5 focus:ring-neutral5 border px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>{" "}
              <p>Login with Google</p>
            </Link>
          </div>
        </div>
        <div className="hidden md:block h-screen w-[60%] py-3 pr-3 lg:p-5">
          <div
            className="h-full w-full bg-no-repeat bg-cover bg-center rounded-2xl p-8 lg:p-10 2xl:p-20"
            style={{ backgroundImage: "url('/img/h6-1.png')" }}
          >
            <div className="h-full w-full flex flex-col justify-between backdrop-blur-md bg-white/10 text-neutral6 rounded-xl p-5 2xl:p-10">
              <div className="flex items-center gap-2 font-semibold">
                <div className="w-5 h-0.5 bg-neutral6 rounded-full" />
                <p>Bengkel Koding</p>
                <div className="w-5 h-0.5 bg-neutral6 rounded-full" />
              </div>
              <h1 className="font-bold text-[32px] lg:text-[42px] 2xl:text-6xl 2xl:leading-normal">
                Tingkatkan Kemampuan Koding Anda bersama Bengkel Koding ✨
              </h1>
              <p>
                Lebih dari <strong>1000+</strong> mahasiswa telah bergabung
                dengan kami dan sukses meningkatkan keterampilan mereka.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MasukPage;
