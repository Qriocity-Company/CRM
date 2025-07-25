// App.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import BlogList from "./components/Blog/BlogList";
import BlogForm from "./components/Blog/BlogForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BlogItem from "./components/Blog/BlogItem";
import Customers from "./components/Customers/Customers";
import AdsCustomer from "./components/AdsCustomer/AdsCustomer";
import Blog from "./components/NewBlog/Blog";
import AddCategory from "./components/AddCategory";
import AllStudents from "./components/Students/AllStudents";
import Create from "./components/Document/Create";
import Links from "./components/Document/Links";
import PopUp from "./components/PopUpData/PopUp";
import RoadmapPopUp from "./components/roadmap/RoadmapPopUp";
import Roadmap from "./components/roadmap/Roadmap";
import GoogleAdsCustomer from "./components/AdsCustomer/GoogleAdsCustomer";
import UkAdsCustomer from "./components/AdsCustomer/UkAdsCustomer";
import HardwareCustomers from "./components/AdsCustomer/HardwareCutsomers";
import PHDCustomers from "./components/AdsCustomer/PhdProffesors";
import CampusExpert from "./components/AdsCustomer/CampusExpert";
import NewAdsData from "./components/AdsCustomer/NewAdsData";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,

        element: <Blog />,
      },
      {
        path: "addCategory",
        element: <AddCategory />,
      },
      {
        path: "blogs",
        element: <BlogList />,
      },
      {
        path: "blogs/:blog",
        element: <BlogItem />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "adsCustomer",
        element: <AdsCustomer />,
      },
      {
        path: "hardwareLeads",
        element: <HardwareCustomers />,
      },
      {
        path: "phdLeads",
        element: <PHDCustomers />,
      },
      {
        path: "googleadsCustomer",
        element: <GoogleAdsCustomer />,
      },
      {
        path: "students",
        element: <AllStudents />,
      },
      {
        path: "document",
        element: <Create />,
      },
      {
        path: "link",
        element: <Links />,
      },
      {
        path: "popup",
        element: <PopUp />,
      },
      {
        path: "popup-roadmap",
        element: <RoadmapPopUp />,
      },
      {
        path: "roadmap",
        element: <Roadmap />,
      },
      {
        path: "ukAdsCustomer",
        element: <UkAdsCustomer />,
      },
      {
        path: "campus_expert",
        element: <CampusExpert />,
      },
      {
        path: "new_ads",
        element: <NewAdsData />,
      },
    ],
  },
]);

function App() {
  return (
    // <Router>
    //   <AuthProvider>
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //       <Route path="/signup" element={<Signup />} />
    //       <Route path="/blogs" element={<BlogList />} />
    //       <Route path="/create-blog" element={<BlogForm />} />
    //       {/* Add more routes as needed */}
    //     </Routes>
    //   </AuthProvider>
    // </Router>
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
