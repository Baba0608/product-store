import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { toastNotifyError, toastNotifySuccess } from "../utils/toast-notify";
import { Button } from "./Button";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/admin/home";
    navigate(path);
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    if (email != "" && password != "") {
      try {
        setLoading(true);
        const { data } = await axios.post(`${BACKEND_API}/admin/admin-login`, {
          email: email,
          password: password,
        });

        localStorage.setItem("store-token", data.token);
        setLoading(false);
        toastNotifySuccess("Successfully logged in");
        routeChange();
      } catch (err) {
        console.log(err);
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
    <div className="login-container">
      <div className="title">
        <h2>Admin Login</h2>
      </div>
      <div className="login-input">
        <form>
          <div className="email-input">
            <label htmlFor="email">Email</label> <br />
            <input
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

          <div className="password-input">
            <label htmlFor="password">Password</label> <br />
            <input
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

          <div className="btn">
            <Button
              loading={loading}
              className={"submit-btn"}
              functionOnClick={submitFormData}
              content={"Login"}
            />
          </div>
        </form>

        <div>
          <p>
            Signup as admin with secret key ?{" "}
            <Link to="/admin/signup">Signup</Link>
          </p>

          <p>
            Login as user, <Link to="/user/login">user-login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
