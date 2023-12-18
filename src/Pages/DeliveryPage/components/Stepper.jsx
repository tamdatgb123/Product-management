import React from "react";
import ShoppingBag from "../../../../public/icons/ShoppingBag";
import CarShipping from "../../../../public/icons/CarShipping";
import UserIcon from "../../../../public/icons/User";

const Stepper = ({ activeStep }) => {
  return (
    <>
      <ol className="flex items-center w-full pr-2">
        <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
          <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <ShoppingBag className="w-8 text-white" />
          </span>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <CarShipping className="w-8 text-white" />
          </span>
        </li>
        <li className="flex items-center">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <UserIcon className="w-8 text-white" />
          </span>
        </li>
      </ol>
      <div className="flex justify-between mt-1">
        <span className="text-gray-800 font-semibold">Waiting</span>
        <span className="text-gray-800 font-semibold">Delivering</span>
        <span className="text-gray-800 font-semibold">Received</span>
      </div>
    </>
  );
};

export default Stepper;
