import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const URL = "https://crm-backend-o6sb.onrender.com/";
// const URL = "http://localhost:5000/";

const AddCategory = () => {
  const [Category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const AddCategoryHandler = () => {
    let data_obj = {
      company: company,
      category: Category,
    };

    console.log(data_obj);
    setCategory("");
    setCompany("");
    axios
      .post(`${URL}blog/add-category`, data_obj)
      .then((response) => {
      
        if (response.status == 200) {
            console.log(response);
          toast.success(response.data.message);
         
        }
        else if  (response.status == 202) {
            console.log(response);
            toast.warning(response.data.message);
        }
        else{
            toast.error(response.data.message);
         
        }
        setCategory("");
          setCompany("");
      }).catch(error=>{
        console.log(error);
        toast.error(error.message);
          setCategory("");
          setCompany("");
      });
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="  mt-20">
        <div class=" p-8 rounded shadow-md w-[500px]">
          <h1 class="text-2xl font-semibold mb-4">Add Category</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
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
              <option value="Ressent">Resnet</option>
              <option value="Invictus">Invictus</option>
            </select>
          </div>
          <input
            type="text"
            name="category"
            placeholder="Enter the category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={Category}
            class="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <button
            className="bg-blue-500 mt-9  text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            onClick={() => {
              AddCategoryHandler();
            }}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
