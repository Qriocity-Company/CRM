import axios from "axios";
import React , {useState} from "react";
import { useAuth } from "../AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Blog from "./NewBlog/Blog";
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [blog, setBlog] = useState(null)
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



  const blogHandle = (value)=>{
    if(value != null && value != undefined)
       setBlog(value);
  }

  return (
    <div className="flex max-w-[144opx]  ">
      <div className="bg-indigo-950 flex-[15%] p-4 min-h-screen text-white">
        <div className="text-xl mb-5">Dashboard</div>
        <div className="flex flex-col gap-5 mb-10">
        <Link to="/dashboard/addCategory" className="hover:bg-blue-400 p-2 rounded-xl  ">
            Add Category
          </Link>
          <Link to="/dashboard" className="hover:bg-blue-400 p-2 rounded-xl  ">
            Add Blog
          </Link>
          <Link to="/dashboard/blogs" className="hover:bg-blue-400 p-2 rounded-xl  ">
            All Blog
          </Link>
          <Link to="/dashboard/customers" className="hover:bg-blue-400 p-2 rounded-xl  ">
            Customers
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
          CRM
        </h1>
        <h1>thuis is my blog</h1>
        {/* {blog != "" && <div dangerouslySetInnerHTML={{ __html: blog }} />}
        <Blog blog={blog} blogHandle={blogHandle} /> */}
        {<Outlet />}
      </div>
    </div>
  );
};

export default Dashboard;
