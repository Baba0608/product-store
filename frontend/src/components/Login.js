import { useState } from "react";
import axios from "axios";

import { Button } from "./Button";
import { toastNotifySuccess, toastNotifyError } from "../utils/toast-notify";
import { useNavigate, Link } from "react-router-dom";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/user/home";
    navigate(path);
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    if (email != "" && password != "") {
      try {
        setLoading(true);
        const { data } = await axios.post(`${BACKEND_API}/user/login`, {
          email: email,
          password: password,
        });

        localStorage.setItem("store-token", data.token);
        setLoading(false);
        toastNotifySuccess("Successfully logged in");
        routeChange();
      } catch (err) {
        setLoading(false);
        setEmail("");
        setPassword("");

        const statusCode = err.message.split(" ").reverse()[0];

        if (statusCode === "401") toastNotifyError("Password is incorrect.");
        if (statusCode === "500") toastNotifyError("Something went wrong.");
      }
    } else {
      // please enter all fields
      toastNotifyError("Please enter all fields.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-blue-200">
      <div className="login-container bg-orange-200 p-5 w-[90%] rounded-lg shadow-lg sm:w-[600px]">
        <div className="title text-center font-bold text-[25px]">
          <h2>Login</h2>
        </div>
        <div className="login-input">
          <form>
            <div className="email-input text-lg">
              <label htmlFor="email">Email</label> <br />
              <input
                className="w-[100%] mt-1 mb-2 p-1 rounded-md"
                type="text"
                name="email"
                id="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="password-input text-lg">
              <label htmlFor="password">Password</label> <br />
              <input
                className="w-[100%] p-1 rounded-md"
                type="password"
                name="password"
                id="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="btn flex justify-center mt-1">
              <Button
                loading={loading}
                className={"submit-btn"}
                functionOnClick={submitFormData}
                content={"Login"}
              />
            </div>
          </form>

          <div className="text-lg">
            <p className="mt-2">
              Don't have an account ?{" "}
              <Link
                className="text-blue-400 hover:text-blue-600 hover:underline"
                to="/user/signup"
              >
                Signup
              </Link>
            </p>

            <p className="mt-2">
              If you are admin,{" "}
              <Link
                className="text-blue-400 hover:text-blue-600 hover:underline"
                to="/admin/login"
              >
                admin-login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
