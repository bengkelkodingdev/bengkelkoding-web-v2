import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbersToShow = 5; // Number of pages to display at once

  const getPaginationArray = () => {
    const pages = [];
    const half = Math.floor(pageNumbersToShow / 2);

    if (totalPages <= pageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= half + 1) {
        for (let i = 1; i <= pageNumbersToShow; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - half) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - pageNumbersToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - half; i <= currentPage + half; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const paginationArray = getPaginationArray();

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-neutral3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Menampilkan halaman {currentPage} dari {totalPages}
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral3 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-neutral2"
            disabled={currentPage === 1}
          >
            Sebelumnya
          </button>
        </li>

        {paginationArray.map((page, index) => (
          <li key={index}>
            {typeof page === "string" ? (
              <span className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border-gray-300">
                ...
              </span>
            ) : (
              <button
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === page
                    ? "text-blue-600 bg-blue-50 border-blue-300"
                    : "text-neutral3 bg-white border-gray-300 hover:bg-gray-100 hover:text-neutral2"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            className="flex items-center justify-center px-3 h-8 leading-tight text-neutral3 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-neutral2"
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
