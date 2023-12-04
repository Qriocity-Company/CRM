import axios from "axios";
import React from "react";
import { useAuth } from "../AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const logouthandler = () => {
    axios
      .get("https://crm-backend-o6sb.onrender.com/auth/logout", {
        header: {
          Access_Token: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Cookies.remove("token");
          Cookies.remove("User");
          logout();
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  // if (!user) {
  //   // If not logged in, redirect to the login page
  //   navigate("/signup");
  // //  return null; // You can also render a loading state or a message here
  // }

  return (
    <div className="flex max-w-[144opx]  h-screen">
      <div className="bg-indigo-950 flex-[15%] p-4 text-white">
        <div className="text-xl mb-5">Dashboard</div>
        <div className="flex flex-col gap-5 mb-10">
          <Link to="/dashboard" className="hover:bg-blue-400 p-2 rounded-xl  ">
            Add Blog
          </Link>
          {/* <div>My blogs</div>
             <div>All blogs</div> */}
        </div>
        <button
          onClick={logouthandler}
          className="hover:bg-blue-400 p-2 rounded-xl w-full text-start"
        >
          Logout
        </button>
      </div>
      <div className="flex-[85%]">
        <h1 className=" font-bold text-2xl bg-gray-300 p-3 md:px-10">
          Add a new Blog
        </h1>
        {<Outlet />}
      </div>
    </div>
  );
};

export default Dashboard;
