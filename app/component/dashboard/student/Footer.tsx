import Image from "next/image";
import Link from "next/link";
import React from "react";

const StudentFooter = () => {
  return (
    <footer className="w-full px-2 lg:px-4 py-4">
      <div className="max-w-7xl mx-auto border-t pt-4 flex justify-between text-neutral3 items-center">
        <p className="text-xs lg:text-sm">&#xA9; 2024 Bengkel Koding</p>
        <div className="flex items-center gap-1 md:gap-2">
          <Link className="text-xs lg:text-sm" href="/terms">
            Terms
          </Link>{" "}
          •{" "}
          <Link className="text-xs lg:text-sm" href="/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default StudentFooter;
