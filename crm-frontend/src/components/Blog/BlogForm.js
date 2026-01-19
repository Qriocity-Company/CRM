import React, { useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../config/api";
const URL = API_URL;

// Array of technology categories
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

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [company, setCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const EmptyField = () => {

    setCaption("");
    setTitle("");
    setDescription("");
    setCompany("");
    setSelectedCategory("");
    setImage(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(title, caption, description, company)
    // Use FormData to send files
    // let formData = new FormData();
    // formData.append('title', title);
    // formData.append('caption', caption);
    // formData.append('description', description);
    // formData.append('image', image);
    // formData.append('company', company);

    // if(title.trim("") === "" || caption.trim("") === "" || description.trim("") === "" || company === "" ) 
    // {
    //   setError("Enter all Field !");
    //   return;
    // }


    try {
      const user = Cookies.get("User");
      // const formData = {
      //   'title': title,
      //   'caption' :  caption,
      //   'description' : description,
      //   'company': company,
      //   'image' : image,
      //   "writer" : user
      // }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('caption', caption);
      formData.append('description', description);
      formData.append('company', company);
      formData.append('category', selectedCategory);

      formData.append('image', image);
      const token = Cookies.get("token");
      const response = await axios.post(`${URL}/blog`, formData, {
        headers: {
          Access_Token: token
        },
      });

      console.log(response.data);
      if (response.status === 201) {
        setError(response.data.message);
        EmptyField();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err.response);
      // setError(err.response.data);
    }
  };


  return (
    <form id="blogForm" onSubmit={handleSubmit} enctype="multipart/form-data" className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-gray-400 rounded-lg shadow-lg ">
      {error && (
        <div className="text-center text-red-500 font-medium">{error}</div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter Title here'
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="caption">
          Caption:
        </label>
        <input
          type="text"
          id="caption"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder='Enter Caption here'
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          rows="3"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter Description here...'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor="techCategory" className='block text-gray-700 text-sm font-bold mb-2'>Category:</label>
        <select
          id="techCategory"
          name="techCategory"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value) }}
        >
          <option value="" disabled>
            Select a category
          </option>
          {techCategories.map((category, index) => (
            <option key={index} value={category} >
              {category}
            </option>
          ))}
        </select>


      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          onChange={handleFileChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
          Company:
        </label>
        <select
          id="company"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="">Select Company</option>
          <option value="Qriocity">Qriocity</option>
          <option value="Ressent">Ressent</option>
          <option value="Invictus">Invictus</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
    </form>
  );
};


export default BlogForm