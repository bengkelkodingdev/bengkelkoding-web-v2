"use client";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "time"
    | "date"
    | "datetime"
    | "datetime-local";
  name: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
}

const InputBasic = ({
  label,
  type,
  name,
  placeholder,
  errorMessage,
  required = false,
  ...rest
}: InputProps) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-neutral2">
        {label}
      </label>
      <div className="mt-1  rounded-md shadow-sm">
        <input
          type={inputType}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`block w-full px-3 py-2 border ${
            errorMessage ? "border-red1 focus:ring-red3" : "border-neutral4"
          } rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm`}
          {...rest}
        />
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputBasic;
