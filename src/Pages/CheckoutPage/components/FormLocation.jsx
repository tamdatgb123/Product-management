import React from "react";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";

const FormLocation = ({
    formData = {
        fullname: "",
        phone: "",
        address: "",
        type_address: ""
    }, 
    setFormData,
    setShowForm
}) => {
    const [ typeAddress, setTypeAddress ] = React.useState();

    const [ checkError, setCheckError] = React.useState({
        fullname: false,
        phone: false,
        address: false,
        type_address: false
    });

    const handleCheckError = (key, value) => {
        if (value == "" ) {
            setCheckError({ ...checkError, [key]: true});
        } else {
            setCheckError({ ...checkError, [key]: false});
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        handleCheckError(name, value);
    };

    const handleSelectType = (event) => {
        const type = event.target.title;
        setTypeAddress(type);
        setFormData({ ...formData, type_address: type});
        setCheckError({ ...checkError, type_address: false});
    };

    const handleConfirm = () => {
        let checkErrorArr = "";
        for (const [key, value] of Object.entries(formData)) {
            if (value == "" ) {
                checkErrorArr = { ...checkErrorArr, [key]: true};
            } else {
                checkErrorArr = { ...checkErrorArr, [key]: false};
            }
        }
        setCheckError(checkErrorArr);
        const canConfirm = Object.values(checkErrorArr).includes(true);
        if (!canConfirm) {
            setFormData(formData);
            setShowForm(false);
            document.body.classList.remove('overflow-hidden');
        }
    };

    return (
        <>
        <div className="w-full h-full fixed top-0 bg-gray-900 opacity-40 z-10"></div>
        <div className="w-full h-full fixed top-0 z-20">
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-full md:w-2/4 xl:w-1/4 bg-white p-4 m-8">
                    <div className="text-xl p-2">
                        Update address
                    </div>
                    <div className="sm:grid sm:grid-cols-2 gap-2">
                        <Input 
                            name="fullname"
                            value={formData.fullname}
                            placeholder={"Fullname"}
                            onChange={handleInputChange}
                            className={`${checkError.fullname ? "border-red-500" : "border-gray-300"}`}
                        />
                        <Input 
                            name="phone"
                            value={formData.phone}
                            placeholder={"Phone number"}
                            onChange={handleInputChange}
                            className={`${checkError.phone ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>
                    <div className="py-2">
                        <textarea 
                            name="address"
                            value={formData.address}
                            rows={2}
                            placeholder={"Address"}
                            onChange={handleInputChange}
                            className={`w-full outline-none rounded-sm p-2 border resize-none
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            ${checkError.address ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>
                    <div>
                        Type address:
                    </div>
                    <div>
                        <div className="flex gap-4 py-2">
                            <div 
                                title="home"
                                onClick={handleSelectType}
                                className={`p-2 border cursor-pointer ${typeAddress == "home" ? "border-blue-500" : "border-gray-300"}`}
                            >
                                Home
                            </div>
                            <div 
                                title="office"
                                onClick={handleSelectType}
                                className={`p-2 border cursor-pointer ${typeAddress == "office" ? "border-blue-500" : "border-gray-300"}`}
                            >
                                Office
                            </div>
                        </div>
                        {checkError.type_address ? 
                        <div className= "text-red-500 px-2">
                            Please choose type address
                        </div> : null}
                    </div>
                    <div className="flex justify-end">
                        <Button 
                            className="text-lg"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default FormLocation;