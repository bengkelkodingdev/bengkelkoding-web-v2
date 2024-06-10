import React, { useEffect } from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
  duration?: number;
  status?: number;
}

const Alert: React.FC<AlertProps> = ({
  message,
  onClose,
  duration = 4000,
  status = 200,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`z-10 ml-2 fixed top-2 md:top-5 right-2 md:right-5 px-3 lg:px-4 py-2 lg:py-3 rounded-lg flex items-center gap-2 lg:gap-4 text-sm ${
        status == 200
          ? "bg-green-100 border border-green-400 text-green-700"
          : "bg-red-100 border border-red-400 text-red-700"
      }`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="font-bold text-lg">
        &times;
      </button>
    </div>
  );
};

export default Alert;
