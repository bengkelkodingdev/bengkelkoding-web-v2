"use client";
import StudentFooter from "@/app/component/dashboard/student/Footer";
import StudentHeader from "@/app/component/dashboard/student/Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <StudentHeader />
      <main className="min-h-screen mt-4 max-w-6xl mx-auto px-2 lg:px-4 py-4">
        {children}
      </main>
      <StudentFooter />
    </div>
  );
};

export default Layout;
