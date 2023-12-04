// src/components/Auth/Signup.js
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { Link  , useNavigate} from 'react-router-dom';

const Signup = () => {
     const navigate = useNavigate();
 //  const history = useHistory();
 //  const { login } = useAuth(); // You might want to replace this with a proper signup function
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
   const [error, setError] = useState("")
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit =  (e) => {
    e.preventDefault();
    axios.post("https://crm-backend-o6sb.onrender.com/auth/signup" , formData).then((res)=>{
      console.log(res.data);
      if(res.status === 201){
        navigate("/");
      }else{
        setError(res.data.message);
      }
    }).catch((err)=> {console.log(err);
      setError(err.response.data.message);
    });
    // try {
    //   console.log("^^^^^^^^" , formData);
    //   // Make a POST request to your backend API endpoint
    // 
  
    //   // // Handle the response from the server
    //   console.log('Server Response:', response.data);
  
    //   // Optionally, you can redirect the user or perform other actions based on the response
    // } catch (error) {
    //   // Handle any errors that occurred during the request
    //   console.error('Error:', error.message);
    // }

    // Call your backend API to handle signup
    // For now, simulate a successful signup
   // login({ username: formData.username });

    // Redirect to the desired page after signup (e.g., home page)
 //   history.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
          onSubmit={handleSubmit}
        >
           {error && <div className='text-center text-red-500 font-medium'>{error}</div>}
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className='text-center mt-5 '> <Link to="/" >Have account ? <span className='font-medium'>Login</span></Link></div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
