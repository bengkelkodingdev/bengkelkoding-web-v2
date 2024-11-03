"use client";
import { getRole } from "@/app/api/general";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HomeDashboardAdmin from "./home-dashboard/Admin";
import HomeDosenAsisten from "./home-dashboard/DosenAsisten";

const HomeDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState({ role: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUserRole = await getRole();
        setUserRole(responseUserRole.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (userRole.role === "admin" || userRole.role === "superadmin") {
    return <HomeDashboardAdmin />;
  } else if (userRole.role === "lecture" || userRole.role === "assistant") {
    return <HomeDosenAsisten />;
  }

  return <div>Role tidak dikenali</div>;
};

export default HomeDashboardPage;
