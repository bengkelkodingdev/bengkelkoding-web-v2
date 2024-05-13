"use client";
import Aside from "@/app/component/dashboard/admin/Aside";
import Footer from "@/app/component/dashboard/admin/Footer";
import Nav from "@/app/component/dashboard/admin/Nav";
import Breadcrumb from "@/app/component/general/Breadcrumb";
import PageNotFound from "@/app/component/general/PageNotFound";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

interface BreadcrumbItem {
  text: string;
  href?: string;
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

  // Split the URL path and remove the first empty string element
  const pathParts = url.split("/").filter(Boolean);

  // Generate breadcrumb items based on the path parts
  const items: BreadcrumbItem[] = pathParts.map((part, index) => {
    const href = `/${pathParts.slice(0, index + 1).join("/")}`;
    return { text: part.charAt(0).toUpperCase() + part.slice(1), href };
  });

  // Convert text slug minus to upercase with space
  function convertToTitleCase(input: string): string {
    return input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function modifyBreadcrumb(data: BreadcrumbItem[]): BreadcrumbItem[] {
    const modifiedData: BreadcrumbItem[] = [];

    for (let i = 0; i < data.length; i++) {
      // Ambil data pertama dari array awal
      if (i === 0) {
        const firstData = data[0];
        modifiedData.push({ text: convertToTitleCase(firstData.text) });
      } else {
        if (data[i].text == "Pengguna") {
          modifiedData.push({ text: convertToTitleCase(data[i].text) });
        } else {
          // Tambahkan data terakhir dari array awal tanpa href
          if (data.length - 1 === i) {
            const lastItem = data[data.length - 1];
            modifiedData.push({ text: convertToTitleCase(lastItem.text) });
          } else {
            modifiedData.push({
              text: convertToTitleCase(data[i].text),
              href: data[i].href,
            });
          }
        }
      }
    }

    return modifiedData;
  }

  const modifiedData = modifyBreadcrumb(items);

  return accessed ? (
    <div>
      <Nav open={sidebarIsOpen} setOpen={toggleSidebar} />

      <Aside user={userRole} open={sidebarIsOpen} setOpen={toggleSidebar} />

      <div className="min-h-screen px-2 py-4 lg:p-4 sm:ml-64">
        <div className="px-2 py-4 lg:p-4 mt-14">
          <Breadcrumb items={modifiedData} />
          <main className="mt-4 lg:mt-4">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <PageNotFound />
  );
};

export default Layout;
