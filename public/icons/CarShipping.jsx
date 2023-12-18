import React from "react";

const CarShipping = ({className}) => (
  <svg
    fill="#000000"
    viewBox="0 0 22 22"
    id="car-shipping"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className={className || "icon line-color"}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        id="primary"
        d="M15,6V17H10a2,2,0,0,0-4,0H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5H14A1,1,0,0,1,15,6Zm5.83,4.75L19.3,8.45A1,1,0,0,0,18.46,8H15v9h1a2,2,0,0,1,4,0h1V11.3A1,1,0,0,0,20.83,10.75Z"
        fill = "none" stroke = "currentColor" strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = "2"
      ></path>
      <path
        id="secondary"
        d="M10,17a2,2,0,1,1-2-2A2,2,0,0,1,10,17Zm8-2a2,2,0,1,0,2,2A2,2,0,0,0,18,15Z"
        fill = "none" stroke = "currentColor" strokeLinecap = "round" strokeLinejoin = "round" strokeWidth = "2"
      ></path>
    </g>
  </svg>
);

export default CarShipping;