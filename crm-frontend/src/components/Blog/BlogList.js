import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const URL = "https://crm-backend-o6sb.onrender.com"
// const URL = "http://localhost:5000"
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${URL}/blog`);
        setBlogs(response.data.blogs);
        console.log(response.data.blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    
<>
  {blogs.length == 0 ? <div className='text-center text-xl text-red-500'>
      no data
  </div> : <div className="w-5/6 mx-auto  my-10">
    
    <h1 className=" md:text-5xl text-2xl md:mb-5  font-bold">Blogs </h1>
    <div className="grid grid-flow-row lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-10">
      {/* {blogs.map((b, index) => {
        return (
          <Link  key={index} to={`/dashboard/blogs/${b}`} state={{ b}}    className="max-w-md mx-auto mt-4 p-4 bg-white border rounded-lg shadow-lg">
            <img src={`${URL}/${b.imageURL}`} alt={b.title} className="mb-4 w-full  rounded-lg" />
    
            <h2 className="md:text-2xl font-bold mb-2">{b.title}</h2>
            <p className="text-gray-600 mb-2">{b.caption}</p>
          </Link>
        );
      })} */}
      {blogs.map((b, index) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: b.content }}/>
        );
      })}
    </div>
    </div>}
</>
  );
};

export default BlogList;


// <div>
//       <h2>Blogs</h2>
//       {blogs.map((blog , index) => (
//         <div key={blog._id}>
//           <h3>{index} {blog.title}</h3>
//           <p>{blog.caption}</p>
//           <p>{blog.description}</p>
//           <p>{blog.company}</p>
//           <p>{blog.writer}</p>
//            <img className='w-1/2' src={`http://localhost:5000/${blog.imageURL}`} alt="Blog" />
          
//         </div>
//       ))}
//     </div>
