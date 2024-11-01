"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Cookies from "js-cookie";

const CallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const success = searchParams.get("success");

    if (success === "true" && token) {
      // Save the token in cookies
      Cookies.set("access_token", token);
      Cookies.set("user_role", "student");
      // Redirect to dashboard or other page
      router.push("/dashboard/student");
    } else {
      // Handle login failure or missing token
      router.push("/masuk?error=true?message=akun_tidak_terdaftar");
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
};

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackPage />
    </Suspense>
  );
}
