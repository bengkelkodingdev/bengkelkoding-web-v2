import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  text: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2" aria-label="Breadcrumb">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        className="fill-neutral3"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
      </svg>
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  className="fill-neutral3"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M9.31 6.71c-.39.39-.39 1.02 0 1.41L13.19 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01z" />
                </svg>
              </div>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-neutral2 hover:text-neutral3"
              >
                {item.text}
              </Link>
            ) : (
              <span className="inline-flex items-center text-sm font-medium text-neutral2 md:ms-2">
                {item.text}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
