import React from "react";
import FacebookIcon from "../../../public/icons/Facebook";
import TwitterIcon from "../../../public/icons/Twitter";

const Footer = () => {
  return (
    <div className="w-full flex justify-center border-t-2 border-gray-500/10">
      <div className="w-4/5">
        <div className="flex justify-between py-6">
          <div className="text-gray-900">
            &copy;2023 Copyright: Panda.com
          </div>
          <div className="flex gap-4">
            <a href="#"><FacebookIcon className="w-6 h-6 cursor-pointer" /></a>
            <a href="#"><TwitterIcon className="w-6 h-6 cursor-pointer" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
