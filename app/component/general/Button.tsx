import React from "react";

interface buttonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  theme?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  text,
  type = "button",
  theme = "primary",
  onClick,
  disabled = false,
  className,
  ...props
}: buttonProps) => {
  const getButtonClass = (theme: string): string => {
    switch (theme) {
      case "primary":
        return "bg-primary1 text-white hover:bg-primary2 focus:ring-primary5";
      case "secondary":
        return "bg-secondary1 text-white hover:bg-secondary2 focus:ring-secondary3";
      case "tertiary":
        return "bg-neutral6 text-black hover:bg-neutral5 focus:ring-neutral5 border";
      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      className={`px-5 py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300 ${getButtonClass(
        theme
      )} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
