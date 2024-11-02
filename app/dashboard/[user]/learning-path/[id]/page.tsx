"use client";
import { getAdminDetailLearningPath } from "@/app/api/admin/learning-path";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardDetailLearningPathPage = () => {
  const url = usePathname();
  const segments = url.split("/");
  const learningPathId = Number(
    segments[segments.indexOf("learning-path") + 1]
  );

  const [learningPath, setLearningPath] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Get Detail Learning Path
    const fetchData = async () => {
      try {
        // Response
        const response = await getAdminDetailLearningPath(learningPathId);
        setLearningPath(response.data);
      } catch (err) {
        console.error("Failed to load data. Please try again.");
      }
    };
    fetchData();
  }, [learningPathId]);

  return (
    <div className="max-w-7xl">
      {/* Detail Learning Path */}
      <div className="flex gap-6">
        <Image
          src={learningPath.image}
          alt={learningPath.name}
          width={300}
          height={250}
          className="rounded-xl"
        />
        <div>
          <p className="font-semibold text-xl">{learningPath.name}</p>
          <p className="text-md mt-2 text-neutral2">
            {learningPath.description}
          </p>
        </div>
      </div>

      {/* Learning Path Item */}
      {/* <div className="mt-8">
        <p className="font-semibold text-lg">Learning Path Item</p>
      </div> */}
    </div>
  );
};

export default DashboardDetailLearningPathPage;
