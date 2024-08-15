"use client";
import Nav from "@/app/component/dashboard/admin/Nav";  // makek admin dulu
import { useState } from "react";
import { usePathname } from "next/navigation";

const StudentDashboard = ({ children }: { children: React.ReactNode }) => {
  const url = usePathname();
  const parts = url.split("/");
  const userRole = parts[2];
  
  const validRoles = ["student"];
  const accessed = validRoles.includes(userRole);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return accessed ? (
    <div>
      <Nav open={sidebarIsOpen} setOpen={toggleSidebar} />

      <div className="min-h-screen px-2 py-4 lg:p-4">
        <main className="mt-14">{children}</main>
      </div>
    </div>
  ) : (
    <div>Page Not Found</div>
  );
};

export default StudentDashboard;
