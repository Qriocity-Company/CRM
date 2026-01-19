import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_URL } from "../../config/api";

const URL = API_URL;
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token, user) => {
    // Set the token in a cookie
    Cookies.set("token", token, { expires: 7 }); // Set expiration to 7 days or adjust as needed
    Cookies.set("User", user);
    login(user);
    // Navigate to "/dashboard"
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    setIsLoading(true);
    setError("");

    if (showOtpInput) {
      // Create a specific object for verification if needed, or just send username/otp
      const verifyData = {
        username: formData.username,
        otp: otp
      };

      axios.post(`${URL}/auth/verify-otp`, verifyData)
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          if (res.status === 200) {
            handleLoginSuccess(res.data.token, res.data.username);
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError("OTP Verification failed. Please try again.");
          }
        });
      return;
    }

    // Call your backend API to handle login
    axios
      .post(`${URL}/auth/login`, formData)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        if (res.status === 200) {
          if (res.data.requiresOTP) {
            setShowOtpInput(true);
            setError("OTP sent to your email. Please enter it below.");
          } else {
            // Fallback if backend doesn't enforce OTP (should not happen with new code)
            console.log(res.data.token)
            handleLoginSuccess(res.data.token, res.data.username);
          }
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong. Server might be waking up (it goes to sleep when inactive). Please wait 30s and try again.");
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="text-center text-red-500 font-medium mb-4">{error}</div>
          )}
          <h2 className="text-2xl font-bold mb-4">{showOtpInput ? 'Enter OTP' : 'Login'}</h2>

          {!showOtpInput && (
            <>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {showOtpInput && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="otp"
              >
                One-Time Password (OTP):
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={isLoading}
                placeholder="Enter 6-digit OTP"
              />
            </div>
          )}

          <div className="flex items-center justify-between ">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (showOtpInput ? 'Verifying...' : 'Logging in...') : (showOtpInput ? 'Verify OTP' : 'Login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
