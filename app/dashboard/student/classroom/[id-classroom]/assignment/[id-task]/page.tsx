import Breadcrumb from "@/app/component/general/Breadcrumb";
import React from "react";

const StudentClassroomTaskDetailPage = () => {
  const dataBreadcrumb = [
    { text: "Dashboard", href: "/dashboard/student" },
    { text: "Kelas", href: "/dashboard/classroom/" },
    { text: "Tugas" },
  ];

  return (
    <>
      <Breadcrumb items={dataBreadcrumb} />

      <div>StudentClassroomTaskDetailPage</div>
    </>
  );
};

export default StudentClassroomTaskDetailPage;
