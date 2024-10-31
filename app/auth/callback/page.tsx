"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      // Get query params from the callback URL
      const token = searchParams.get("token");
      const success = searchParams.get("success") === "true";
      const errorMessage = searchParams.get("error");

      if (!success) {
        toast.error(errorMessage || "Gagal Masuk!");
        router.push("/masuk"); // Redirect to masuk if unsuccessful
      } else if (token) {
        // Save token to cookies
        Cookies.set("access_token", token);
        Cookies.set("user_role", "student");

        toast.success("Berhasil Masuk!");

        router.push("/dashboard/student");
      }
    };

    handleGoogleCallback();
  }, [searchParams, router]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <p>Processing login...</p>
      </div>
      <ToastContainer />
    </>
  );
};

export default GoogleCallback;
