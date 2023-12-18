import React from "react";

const Checkbox = ({ id, name, checked, label, className, onClick }) => {
  return (
    <div className="px-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        className={`mr-2 ${className ? className : ""}`}
        checked={checked}
        onChange={() => {}}
        onClick={onClick}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
