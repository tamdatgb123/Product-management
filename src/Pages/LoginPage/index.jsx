import React from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import data from "../../../db.json";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    });
    //Text Error
    const [textError, setTextError] = React.useState({
        username: "",
        password: ""
    });
    //Check Error
    const [checkError, setCheckError] = React.useState({
        username: false,
        password: false
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setCheckError({ ...checkError, [name]: false});
        setTextError({ ...textError, [name]: ""});
    }

    const handleBlur = (event) => {
        const { name, value } = event.target;
        if (value === "" ) {
            setCheckError({ ...checkError, [name]: true});
            setTextError({ ...textError, [name]: "This field cannot empty"});
        } else {
            setCheckError({ ...checkError, [name]: false});
            setTextError({ ...textError, [name]: ""});
        }
    };

    const validator = () => {
        const keys = Object.keys(formData);
        let checkErrorArr = {};
        let textErrorArr = {};
        for ( let i = 0; i < keys.length; i++ ) {
            const key = keys[i];
            const value = formData[key];
            if ( value === "" ) {
                checkErrorArr = {...checkErrorArr, [key]: true};
                textErrorArr = {...textErrorArr, [key]: "This field cannot empty"};
            } else {
                checkErrorArr = {...checkErrorArr, [key]: false};
                textErrorArr = {...textErrorArr, [key]: ""};
            }
        }
        setCheckError(checkErrorArr);
        setTextError(textErrorArr);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        validator();
        if (checkError.username === false && checkError.password === false) {
            let userData = "";
            data.user && data.user.find(user => {if (user.username === formData.username) {
                userData = user;
            }});
            if (userData) {
                if (userData.password === formData.password) {
                    const token = 'your_token_here';
                    const expirationTime = new Date().getTime() + 3600 * 1000;

                    localStorage.setItem('token', token);
                    localStorage.setItem('expirationTime', expirationTime);
                    const id = userData.id;
                    localStorage.setItem('id', id);

                    navigate("/", { replace: true });
                    window.location.reload();
                } else {
                    setCheckError({...checkError, password: true});
                    setTextError({...textError, password: "Invalid password"});
                }
            } else {
                setCheckError({...checkError, username: true});
                setTextError({...textError, username: "Invalid username"});
            }
        }
    }

    return (
        <>
        <div className="w-screen h-screen bg-blue-200">
            <div className="flex w-full h-full justify-center items-center p-4">
                <div className="w-full md:w-2/4 xl:w-1/4 bg-white rounded">
                    <div className="py-8">
                        <p className="w-full text-center text-4xl font-bold">Login</p>
                        <Input 
                            value={formData.username}
                            name="username"
                            label="Username"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            textError={textError.username}
                            className={`${checkError.username ? "border-red-500" : ""}`}
                            require
                        />
                        <Input 
                            value={formData.password}
                            name="password"
                            label="Password"
                            type="password"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            textError={textError.password}
                            className={`${checkError.password ? "border-red-500" : ""}`}
                            require
                        />
                        <Button 
                            type="button"
                            onClick={handleSubmit}
                            className="w-full text-xl"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginPage;