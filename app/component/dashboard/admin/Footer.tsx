import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 sm:ml-64 text-center text-neutral3">
      <p>© 2023-{currentYear} bengkelkoding.dinus.ac.id All rights reserved.</p>
    </footer>
  );
};

export default Footer;
