import React, { useState } from "react";

import { useAuth } from "../../AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const {login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token , user) => {
    // Set the token in a cookie
    Cookies.set("token", token,  { expires: 7 }); // Set expiration to 7 days or adjust as needed
    Cookies.set( "User" , user );
    login(user);
    // Navigate to "/dashboard"
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call your backend API to handle login
    axios
      .post("https://crm-backend-o6sb.onrender.com/auth/login", formData)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          console.log(res.data.token)
          handleLoginSuccess(res.data.token , res.data.username);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });

    console.log("login Successfull");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="text-center text-red-500 font-medium">{error}</div>
          )}
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-5 ">
            {" "}
            <Link to="/signup">
              Dont't have account ? <span className="font-medium">Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
