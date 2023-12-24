import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
// const URL = "https://crm-backend-o6sb.onrender.com";
const URL = "http://localhost:5000";


const techCategories = [
    'Web Development',
    'Mobile App Development',
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'Cybersecurity',
    'Artificial Intelligence',
    'DevOps',
    'Blockchain',
    'Internet of Things (IoT)',
  ];

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["image"],
  ["clean"],
];

function Blog(props) {
  const [value, setValue] = useState("");
 

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetch =  ()=>{
     
      axios.get(`${URL}/blog/category/${company}`).then((response)=>{
         if(response.status == 200)
         {
            // console.log(response);
            setCategoryList(response.data);
         }
     }).catch((error)=>{
        console.log(error);
     })
 }

useEffect(()=>{
   
 fetch();
}  , [company])
    
const saveBlogHandler = ()=>{
  const blogData = {
    title : title,
    content : value , 
    company: company,
    category : selectedCategory
  }
  console.log(blogData);
  const token = Cookies.get("token");
  axios.post(`${URL}/blog`, blogData , {
    headers: {
      Access_Token: token
    },
  } ).then((response)=>{
    if(response.status == 201)
       toast.success(response.data.message);
    else if(response.status == 413)  
    toast.warning("Blog Size is too large , use image less than 1mb.");
  }).catch((error)=>{
    console.log(error);
    toast.error("Blog Size is too large , use image less than 1mb.");
  })
}
 


  return (
    <div className="p-3">
      <h1></h1>
      <div className="flex justify-start gap-5 ">
      <div className="mb-4">
          {/* <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="company"
          >
            Company:
          </label> */}
          <select
            id="company"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
            value={company}
            onChange={(e) => {setCompany(e.target.value); }}
          >
            <option value="">Select Company</option>
            <option value="Qriocity">Qriocity</option>
            <option value="Ressent">Resnet</option>
            <option value="Invictus">Invictus</option>
          </select>
        </div>
        <div className="mb-4">
          {/* <label
            htmlFor="techCategory"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category:
          </label> */}
          <select
            id="techCategory"
            name="techCategory"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categoryList.map((category, index) => (
              <option key={index} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
       
      </div>
      <div className="mb-4">
      <input
            type="text"
            name="title"
            placeholder="Enter the Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            class="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
        className="max-h-[80vh] min-h-[70vh] overflow-scroll"
      />
      <button
        className="bg-blue-500 text-white font-bold  p-3 rounded-lg px-6 mt-5 "
        onClick={saveBlogHandler}
      >
        Save{" "}
      </button>
    </div>
  );
}

export default Blog;
