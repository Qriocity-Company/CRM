import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Blog from "./NewBlog/Blog";
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [blog, setBlog] = useState(null);
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

  const blogHandle = (value) => {
    if (value != null && value != undefined) setBlog(value);
  };

  return (
    <div className="flex max-w-[144opx]  ">
      <div className="bg-indigo-950 flex-[15%] p-4 min-h-screen text-white">
        <div className="text-xl mb-5">Dashboard</div>
        <div className="flex flex-col gap-5 mb-10">
          <Link
            to="/dashboard/addCategory"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Add Category
          </Link>
          <Link to="/dashboard" className="hover:bg-blue-400 p-2 rounded-xl  ">
            Add Blog
          </Link>
          <Link
            to="/dashboard/blogs"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            All Blog
          </Link>
          <Link
            to="/dashboard/customers"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Website & Query
          </Link>
          <Link
            to="/dashboard/adsCustomer"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            FaceBook Ads Leads
          </Link>
          <Link
            to="/dashboard/campus_expert"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Campus Expert program
          </Link>
          <Link
            to="/dashboard/googleadsCustomer"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Google Ads Leads
          </Link>
          <Link
            to="/dashboard/ukAdsCustomer"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Uk Ads Leads
          </Link>
          <Link
            to="/dashboard/phdLeads"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Phd Proffersors Leads
          </Link>
          <Link
            to="/dashboard/hardwareLeads"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Hardware Leads
          </Link>
          <Link
            to="/dashboard/students"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Resources Data
          </Link>
          <Link
            to="/dashboard/popup"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Pop Up Data
          </Link>
          <Link
            to="/dashboard/document"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Document
          </Link>
          {/* <div>My blogs</div>
             <div>All blogs</div> */}

          <Link
            to="/dashboard/link"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            DocLinks
          </Link>

          <Link
            to="/dashboard/popup-roadmap"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            Roadmap Pop-Up Data
          </Link>

          <Link
            to="/dashboard/roadmap"
            className="hover:bg-blue-400 p-2 rounded-xl  "
          >
            RoadMap Data
          </Link>
        </div>
        <button
          onClick={logouthandler}
          className="hover:bg-blue-400 p-2 rounded-xl w-full text-start"
        >
          Logout
        </button>
      </div>
      <div className="flex-[85%]">
        <h1 className=" font-bold text-2xl bg-gray-300 p-3 md:px-10">CRM</h1>

        {/* {blog != "" && <div dangerouslySetInnerHTML={{ __html: blog }} />}
        <Blog blog={blog} blogHandle={blogHandle} /> */}
        {<Outlet />}
      </div>
    </div>
  );
};

export default Dashboard;
