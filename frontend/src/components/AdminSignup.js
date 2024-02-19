import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "./Button";
// import { routeChange } from "../utils/navigate";
import { useNavigate } from "react-router-dom";

import { toastNotifySuccess, toastNotifyError } from "../utils/toast-notify";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const AdminSignup = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/admin/login";
    navigate(path);
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    if (
      username != "" &&
      email != "" &&
      secretKey != "" &&
      password != "" &&
      conformPassword != ""
    ) {
      if (password != conformPassword) {
        // show error
        // notification -- password is not matching.
        toastNotifyError("Password not matching.");
      } else {
        setLoading(true);
        try {
          const result = await axios.post(`${BACKEND_API}/admin/admin-signup`, {
            username: username,
            email: email,
            adminSecretKey: secretKey,
            password: password,
          });
          setLoading(false);
          console.log(result);
          // toast - Notification
          toastNotifySuccess("Signup successfull!");

          routeChange();
        } catch (err) {
          console.log(err);
          toastNotifyError("Something went wrong.");
        }
      }
    } else {
      // notification -- Please enter all fields.
      toastNotifyError("Please enter all fields.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-blue-200">
      <div className="signup-container bg-orange-200 p-5 w-[90%] rounded-lg shadow-lg sm:w-[600px]">
        <div className="title text-center font-bold text-[25px]">
          <h2>Admin Signup</h2>
        </div>
        <div className="signup-input">
          <form>
            <div className="username-input text-lg">
              <label htmlFor="username">Username</label> <br />
              <input
                className="w-[100%] mt-1 mb-2 p-1 rounded-md"
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="email-input text-lg">
              <label htmlFor="email">Email</label> <br />
              <input
                className="w-[100%] mt-1 mb-2 p-1 rounded-md"
                type="text"
                name="email"
                id="email"
                placeholder="Enter email..."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="secret-key-input text-lg">
              <label htmlFor="secret-key">Secret key</label> <br />
              <input
                className="w-[100%] mt-1 mb-2 p-1 rounded-md"
                type="text"
                name="secretkey"
                id="secret-key"
                placeholder="Enter secret key..."
                onChange={(e) => {
                  setSecretKey(e.target.value);
                }}
              />
            </div>

            <div className="password-input text-lg">
              <label htmlFor="password">Password</label> <br />
              <input
                className="w-[100%] mt-1 mb-2 p-1 rounded-md"
                type="password"
                name="password"
                id="password"
                placeholder="Enter password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="conform-password-input text-lg">
              <label htmlFor="conform-password">Conform Password</label> <br />
              <input
                className="w-[100%] mt-1 mb-2 p-1 rounded-md"
                type="password"
                name="conform-password"
                id="conform-password"
                placeholder="Re-enter password..."
                onChange={(e) => {
                  setConformPassword(e.target.value);
                }}
              />
            </div>

            <div className="btn flex justify-center mt-1">
              <Button
                loading={loading}
                id={"submit-btn"}
                functionOnClick={submitFormData}
                content={"Signup"}
              />
            </div>
          </form>

          <div className="text-lg">
            <p className="mt-2">
              Login as Admin.{" "}
              <Link
                className="text-blue-400 hover:text-blue-600 hover:underline"
                to="/admin/login"
              >
                admin-Login
              </Link>
            </p>

            <p>
              Login as user.{" "}
              <Link
                className="text-blue-400 hover:text-blue-600 hover:underline"
                to="/user/login"
              >
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
