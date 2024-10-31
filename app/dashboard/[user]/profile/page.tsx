"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/app/component/general/Modal";
import { getProfile } from "@/app/api/general";
import Button from "@/app/component/general/Button";
import Input from "@/app/component/general/Input";
import Image from "next/image";
import { putProfile } from "@/app/api/auth";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useState({
    id: 0,
    identity_code: "",
    name: "",
    email: "",
    role: "",
    image: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const responseProfile = await getProfile();
      setProfile(responseProfile.data);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Validate passwords match in real-time
    if (newPassword !== "" && retypePassword !== "") {
      setPasswordMatch(newPassword === retypePassword);
    } else {
      setPasswordMatch(true); // Reset validation when fields are empty
    }

    // Validate password length (at least 8 characters)
    if (newPassword !== "") {
      setPasswordValid(newPassword.length >= 8);
    } else {
      setPasswordValid(true);
    }
  }, [newPassword, retypePassword]);

  const handlePutStudentProfile = async () => {
    if (!oldPassword || !newPassword || !retypePassword) {
      toast.error("Semua kolom harus diisi!");
      return;
    }

    if (!passwordValid) {
      toast.error("Password baru harus terdiri dari minimal 8 karakter!");
      return;
    }

    if (!passwordMatch) {
      toast.error("Password Tidak Sama!");
      return;
    }

    try {
      await putProfile(oldPassword, newPassword, retypePassword);

      toast.success("Berhasil Memperbarui profil!");

      // Reset form fields after successful update
      setOldPassword("");
      setNewPassword("");
      setRetypePassword("");

      handleCloseModal();
    } catch (error) {
      toast.error("Gagal Memperbarui Profil!");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  console.log(profile);

  return (
    <>
      <div className="max-w-screen-xl flex gap-4">
        <div className="w-full md:w-[450px] xl:min-w-[500px]">
          <div className="relative h-max w-full">
            <div
              className="h-14 w-full bg-no-repeat bg-cover bg-center rounded-t-xl"
              style={{ backgroundImage: "url('/img/bg-profile.png')" }}
            />
            <div className="w-max flex gap-2 items-center -mt-5 ms-5">
              <div className="w-28 h-28 overflow-hidden rounded-full mx-auto border-4 border-white">
                {profile.image !== null ? (
                  <Image
                    src={profile.image}
                    alt="Image Profile"
                    width={400}
                    height={400}
                    className="w-full scale-110"
                  />
                ) : (
                  <Image
                    src="/img/user.png"
                    alt="Image Profile"
                    width={400}
                    height={400}
                    className="w-full"
                  />
                )}
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
          <form className="grid grid-cols-1 mt-4">
            <Input
              label="Password Lama"
              type="password"
              name="old_password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <Input
              label="Password Baru"
              type="password"
              name="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {!passwordValid && (
              <p className="text-red-500 text-xs -mt-3">
                Password baru harus terdiri dari minimal 8 karakter.
              </p>
            )}
            <Input
              label="Konfirmasi Password Baru"
              type="password"
              name="retype_password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
            {!passwordMatch && (
              <p className="text-red-500 text-xs -mt-3 mb-3">
                Password baru dan konfirmasi password tidak sama.
              </p>
            )}
            <Button
              type="button"
              text="Ganti Password"
              onClick={handleOpenModal}
            />
          </form>
        </div>
        <div className="hidden md:block w-full">
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
      <Modal
        title="Konfirmasi Ganti Password"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="mt-4">
          <p className="text-xs lg:text-sm text-neutral2 mb-4">
            Anda yakin ingin mengubah password?
          </p>
          <div className="flex gap-2">
            <Button
              text="Tidak"
              className="w-full"
              theme="tertiary"
              onClick={handleCloseModal}
            />
            <Button
              text="Ya"
              className="w-full"
              onClick={handlePutStudentProfile}
            />
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ProfilePage;
