import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "./Button";
// import { routeChange } from "../utils/navigate";
import { useNavigate } from "react-router-dom";

import { toastNotify } from "../utils/toast-notify";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/user/login";
    navigate(path);
  };

  const submitFormData = async (e) => {
    e.preventDefault();

    if (
      username != "" &&
      email != "" &&
      password != "" &&
      conformPassword != ""
    ) {
      if (password != conformPassword) {
        // show error
        // notification -- password is not matching.
      } else {
        setLoading(true);
        try {
          const result = await axios.post(`${BACKEND_API}/user/signup`, {
            username: username,
            email: email,
            password: password,
          });
          setLoading(false);
          console.log(result);
          // toast - Notification
          toastNotify("Signup successfull!");

          routeChange();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      // notification -- Please enter all fields.
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-input">
        <form>
          <div className="username-input">
            <label htmlFor="username">Username</label> <br />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="email-input">
            <label htmlFor="email">Email</label> <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email..."
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="conform-password-input">
            <label htmlFor="conform-password">Conform Password</label> <br />
            <input
              type="password"
              name="conform-password"
              id="conform-password"
              placeholder="Re-enter password..."
              onChange={(e) => {
                setConformPassword(e.target.value);
              }}
            />
          </div>

          <div className="btn">
            <Button
              loading={loading}
              id={"submit-btn"}
              submitFormData={submitFormData}
              content={"Signup"}
            />
          </div>
        </form>

        <div>
          <p>
            Already have account ? <Link to="/user/login">Login</Link>
          </p>

          <p>
            If you are admin, <Link to="/admin/login">admin-login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
