import React from "react";

const Button = ({ children, className, type, onClick, onSubmit }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      className={`border text-white font-medium rounded bg-blue-400 py-1 px-2 ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
