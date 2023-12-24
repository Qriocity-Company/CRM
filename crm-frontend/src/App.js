// App.js
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Blog from "./components/NewBlog/Blog";
import AddCategory from "./components/AddCategory";
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
      
        element: <Blog/>, 
      },
      {
        path : "addCategory",
        element: <AddCategory />, 
      },
      {
       path : "blogs",
       element: <BlogList />, 
     },
    {
      path : "blogs/:blog",
       element : <BlogItem />
    },{
      path:"customers",
      element:<Customers/>
    }
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
    <RouterProvider router = {routes} />
    </AuthProvider>
  );
}

export default App;
