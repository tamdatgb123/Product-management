import React from "react";
import ShowPasswordIcon from "../../../public/icons/ShowPassword";
import HidePasswordIcon from "../../../public/icons/HidePassword";

const Input = ({
    label, 
    name, 
    value, 
    type, 
    className, 
    placeholder, 
    iconColor, 
    onChange, 
    onFocus, 
    onBlur, 
    require, 
    textError
}) => {
    const [isShow, setIsShow] = React.useState(true);
    const togglePasswordVisibility = () => {
        setIsShow(!isShow);
    };
    return (
        <div className="w-full">
            <div className="">
                <label className="font-medium">{label}{require && <span className="text-red-500 px-1">*</span>}</label>
            </div>
            <div className="relative">
                <input 
                    name={name}
                    value={value}
                    type={!isShow ? "text" : type} 
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`w-full outline-none rounded-sm p-2 border border-gray-300
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    ${className ? className : ""}`}
                />
                {type === "password" && (
                    <div
                        className="absolute top-3 right-2 w-5 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                    {isShow ? (
                        <ShowPasswordIcon iconColor="black" />
                    ) : (
                        <HidePasswordIcon iconColor="black" />
                    )}
                    </div>
                )}
            </div>
            {textError && 
            <div className="text-red-500 h-fit">
                {textError}
            </div>}
        </div>
        
    )
}

export default Input;