"use client";
import Aside from "@/app/component/dashboard/admin/Aside";
import Footer from "@/app/component/dashboard/admin/Footer";
import Nav from "@/app/component/dashboard/admin/Nav";
import PageNotFound from "@/app/component/general/PageNotFound";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const url = usePathname();
  const parts = url.split("/");
  const userRole = parts[2];

  const validRoles = ["superadmin", "admin", "dosen", "asisten"];
  const accessed = validRoles.includes(userRole);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return accessed ? (
    <div>
      <Nav open={sidebarIsOpen} setOpen={toggleSidebar} />

      <Aside user={userRole} open={sidebarIsOpen} setOpen={toggleSidebar} />

      {children}

      <Footer />
    </div>
  ) : (
    <PageNotFound />
  );
};

export default Layout;
