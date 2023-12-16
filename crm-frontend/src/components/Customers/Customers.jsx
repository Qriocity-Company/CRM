
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const URL = "https://crm-backend-o6sb.onrender.com"

const Customers = () => {

    const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${URL}/customer/fetch`);
        setCustomers(response.data.customers);
        console.log(response.data.customers)
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchCustomers();
  }, []);

  const deleteCustomer= async (id)=>{
    const response = await axios.delete(`${URL}/customer/delete/${id}`);

    console.log(response.data)

    setCustomers(customers.filter((element)=>element.id!=id));
  }

  return (
    <div className='p-[2rem]'>

        <h1 className='font-semibold text-2xl'>Customer Messages Received</h1>

        <div className='grid grid-cols-6 bg-[#2f2a7a] text-white mt-4'>
            <div className='col-span-1 p-4 text-xl font-bold'> 
                Name
            </div>
            <div className='col-span-2 p-4 text-xl font-bold'>
                Message
            </div>
            <div className='col-span-1 p-4 text-xl font-bold text-left'>
                Phone Number
            </div>
            <div className='col-span-1 p-4 text-xl font-bold text-left'>
                Date
            </div>
            <div className='col-span-1 p-4 text-xl font-bold'>
                
            </div>
        </div>
        <div className='m-h-[75vh] overflow-y-scroll'>
        {
            customers.map((customer,index)=>{
                return(
                    <div className='grid grid-cols-6 bg-blue-200 border-2 border-b-gray-300' id={index}>
                        <div className='col-span-1 p-4 font-semibold'> 
                            {customer.name}
                        </div>
                        <div className='col-span-2 p-4'>
                            {customer.message}
                        </div>
                        <div className='col-span-1 p-4 pl-10 text-xl font-bold text-left'>
                            {customer.phoneNumber}
                        </div>
                        <div className='col-span-1 p-4 pl-10 text-xl font-bold text-left'>
                            {customer.date?customer.date:'N/A'}
                        </div>
                        <div className='col-span-1 p-4'>
                            <div className='py-2 bg-red-500 text-white font-semibold text-center rounded-xl cursor-pointer hover:bg-red-700' onClick={()=>deleteCustomer(customer.id)}>
                                Delete
                            </div>
                        </div>
                    </div>
                )
            })
        }
            

        </div>
        
    </div>
  )
}

export default Customers