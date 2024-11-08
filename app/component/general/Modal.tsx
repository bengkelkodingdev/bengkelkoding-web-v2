"use client";
import React, { Fragment, ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // Close the modal when the Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Prevent modal from closing when clicking inside it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      {isOpen ? (
        <div
          className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="flex h-full items-center justify-center p-2"
            onClick={handleModalClick}
          >
            <div className="bg-white w-96 rounded-lg shadow-lg p-6 z-[60]">
              <div className="flex items-center justify-between pb-2 md:p-5 border-b rounded-t ">
                {/* judul */}
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                {/* close */}
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div>{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Modal;
