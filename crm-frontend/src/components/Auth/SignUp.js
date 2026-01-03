// src/components/Auth/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState("")
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    axios.post("https://crm-backend-o6sb.onrender.com/auth/signup", formData, {
      headers: {
        "Access_Token": token
      }
    }).then((res) => {
      console.log(res.data);
      if (res.status === 201) {
        // navigate("/"); // Don't navigate to login, maybe stay or show success message. 
        // For now, let's just alert or clear form. 
        // But user might expect some feedback.
        // Let's navigate to dashboard which is parent.   
        navigate("/dashboard");
      } else {
        setError(res.data.message);
      }
    }).catch((err) => {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
          onSubmit={handleSubmit}
        >
          {error && <div className='text-center text-red-500 font-medium'>{error}</div>}
          {/* Change title to indicate Admin Action */}
          <h2 className="text-2xl font-bold mb-4">Create User</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Signup;
