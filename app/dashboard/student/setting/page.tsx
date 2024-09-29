"use client";
import { getProfile } from "@/app/api/general";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const StudentSettingPage = () => {
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

  return (
    <div className="flex gap-4">
      <div className="w-full md:w-[450px]">
        <div className="relative h-max w-full">
          <div
            className="h-14 w-full bg-no-repeat bg-cover bg-center rounded-t-xl"
            style={{ backgroundImage: "url('/img/bg-profile.png')" }}
          />
          <div className="w-max flex gap-2 items-center -mt-5 ms-5">
            <div className="w-28 h-28 overflow-hidden rounded-full mx-auto border-4 border-white">
              <Image
                src={profile.image}
                alt="Image Profile"
                width={400}
                height={400}
                className="w-full"
              />
            </div>
            <div className="">
              <p className="text-xl font-semibold">{profile.name}</p>
              <div className="text-neutral2 flex flex-col md:flex-row md:gap-1">
                <p className="text-xs">{profile.identity_code}</p>
                <p className="text-xs hidden md:block">|</p>
                <p className="text-xs">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>
        <form action="" className="grid grid-cols-1 mt-4">
          <Input
            label="Password Lama"
            type="password"
            name="old_password"
            required
          />
          <Input
            label="Password Baru"
            type="password"
            name="new_password"
            required
          />
          <Input
            label="Konfirmasi Password Baru"
            type="password"
            name="retype_password"
            required
          />
          <Button type="submit" text="Ganti Password" />
        </form>
      </div>
      <div className="hidden md:block">
        <div
          className="h-full w-full bg-no-repeat bg-cover bg-center rounded-xl p-8 lg:p-10 2xl:p-20"
          style={{ backgroundImage: "url('/img/bg-profile-robot.jpg')" }}
        >
          <div className="h-full w-full flex flex-col justify-between backdrop-blur-md bg-white/10 text-neutral6 rounded-xl p-5 2xl:p-10">
            <div className="flex items-center gap-2 font-semibold">
              <div className="w-5 h-0.5 bg-neutral6 rounded-full" />
              <p>Bengkel Koding</p>
              <div className="w-5 h-0.5 bg-neutral6 rounded-full" />
            </div>
            <h1 className="font-bold text-[32px] lg:text-[42px] 2xl:text-6xl 2xl:leading-normal">
              Ganti Password
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettingPage;
