import React from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useData } from "../../provider/defaultProvider/dataContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { data } = useData();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  //Text Error
  const [textError, setTextError] = React.useState({
    email: "",
    password: "",
    failed: "",
  });

  //Error
  const Error = {
    email: "Your email is invalid",
    password:
      "Your password must have at least 8 characters that include at least 1 lowercase charecter, 1 special characters and 1 number",
    failed: "Login failed! Invalid email or password",
  };

  //Check Error
  const [checkError, setCheckError] = React.useState({
    email: false,
    password: false,
    failed: false,
  });

  //RegEx
  const RegEx = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/,
  };

  const handleCheckError = (key, value) => {
    if (value === "") {
      setCheckError({ ...checkError, [key]: true });
      setTextError({ ...textError, [key]: "This field is required" });
    } else {
      if (RegEx[key].test(value)) {
        setCheckError({ ...checkError, [key]: false, failed: false });
        setTextError({ ...textError, [key]: "" });
      } else {
        setCheckError({ ...checkError, [key]: true });
        setTextError({ ...textError, [key]: Error[key] });
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    handleCheckError(name, value);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    handleCheckError(name, value);
  };

  const handleSubmit = async () => {
    const checkSubmit = Object.values(checkError).includes(true);
    if (!checkSubmit) {
      let user = data.user.find((user) => user.email === formData.email);
      if (user) {
        if (user.password === formData.password) {
          setCheckError({ ...checkError, failed: false });
          setTextError({ ...textError, failed: "" });

          const token = "your_token_here";
          const expirationTime = new Date().getTime() + 3600 * 1000;

          localStorage.setItem("token", token);
          localStorage.setItem("expirationTime", expirationTime);
          localStorage.setItem("id", user.id);
          localStorage.setItem("role", user.role);

          navigate("/", { replace: true });
          window.location.reload();
        } else {
          setCheckError({ ...checkError, failed: true });
          setTextError({ ...textError, failed: Error.failed });
        }
      } else {
        setCheckError({ ...checkError, failed: true });
        setTextError({ ...textError, failed: Error.failed });
      }
    }
  };

  return (
    <>
      <div className="relative w-screen h-screen">
        <img
          className="absolute top-0 w-full h-full z-[-1] object-cover"
          src="https://file.hstatic.net/1000026716/file/gearvn-ban-phim-steelseries-apex-3-02_05c490d804014fb782a0c3687721c3e2.jpg"
          alt="bg_image"
        />
        <div className="flex w-full h-full justify-center items-center p-4">
          <div className="w-full md:w-2/4 xl:w-2/5 bg-white rounded">
            <div className="p-8">
              <p className="w-full text-center text-4xl font-bold">Login</p>
              <p className="w-full text-center text-red-500">
                {checkError.failed ? textError.failed : ""}
              </p>
              <div className="my-4">
                <Input
                  value={formData.email}
                  name="email"
                  label="Email"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  textError={checkError.email ? textError.email : ""}
                  className={`${checkError.email ? "border-red-500" : ""}`}
                  require
                />
              </div>
              <div className="my-4">
                <Input
                  value={formData.password}
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  textError={checkError.password ? textError.password : ""}
                  className={`${checkError.password ? "border-red-500" : ""}`}
                  require
                />
              </div>
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
  );
};

export default LoginPage;
