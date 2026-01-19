import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { API_URL } from "../../config/api";

const URL = API_URL;
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
   

   const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${URL}/blog`);
        setBlogs(response.data.blogs);
        console.log(response.data.blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
  useEffect(() => {
    

    fetchBlogs();
  }, []);

  const deleteBlogHandler = (id)=>{
    alert(id);
    axios
      .get(`${URL}/blog/${id}`)
      .then((response) => {
      
        if (response.status === 200) {
            console.log(response);
          toast.success(response.data.message);
          fetchBlogs();
        }
       
        else{
            toast.error(response.data.message);
         
        }
       
      }).catch(error=>{
        console.log(error);
        toast.error(error.message);
         
      });
  }

  return (
    
<>
  {blogs.length === 0 ? <div className='text-center text-xl text-red-500'>
      no data
  </div> : <div className="w-5/6 mx-auto  my-10">
    
    <h1 className=" md:text-5xl text-2xl md:mb-5  font-bold">Blogs </h1>
    <div className="grid grid-flow-row lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-10">
      {blogs.map((b, index) => {
        return (
          <div  key={index} className="w-full relative mx-auto mt-4  bg-white border rounded-lg shadow-lg p-8">
          <h2 className="md:text-2xl font-bold mb-2">{b.title}</h2>
          <Link  to={`/dashboard/blogs/${b}`} state={{ b}}    >
            {/* <img src={`${URL}/${b.imageURL}`} alt={b.title} className="mb-4 w-full  rounded-lg" /> */}
    
            <div className='italic'>Company : {b.company}</div>
            
            <button className='text-blue-500'>Read more...</button>
            </Link>
            <MdDelete className='text-red-500 absolute top-2 right-2 ' size={24} onClick={()=>{
              deleteBlogHandler(b._id)
             
            }}  />
         
          </div>
        );
      })}
      {/* {blogs.map((b, index) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: b.content }}/>
        );
      })} */}
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
