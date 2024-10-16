import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im"; // Import spinner

const URL = "https://crm-backend-o6sb.onrender.com";

const HardwareCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${URL}/hardwareCustomers/fetch`);
      const sortedCustomers = response.data.customers.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setCustomers(sortedCustomers);
      setLoading(false); // Stop loading after data is fetched
      console.log(sortedCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false); // Stop loading if an error occurs
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `${URL}/hardwareCustomers/delete/${id}`
      );
      console.log(response.data);
      setCustomers(customers.filter((element) => element.id !== id));
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  function convertUTCtoIST(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);
    const istDateTime = utcDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    return istDateTime;
  }

  if (loading) {
    // Display spinner when loading
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-semibold text-2xl mb-6">Hardware Customers Lead</h1>

      <div className="grid grid-cols-8 bg-[#2f2a7a] text-white text-center py-4 rounded-t-lg">
        <div className="p-2 font-bold">Name</div>
        <div className="p-2 font-bold">Message</div>
        <div className="p-2 font-bold">Phone Number</div>
        <div className="p-2 font-bold">College</div>
        <div className="p-2 font-bold">Department</div>
        <div className="p-2 font-bold">Year</div>
        <div className="p-2 font-bold">Date</div>
        <div className="p-2"></div>
      </div>

      <div className="max-h-[75vh] overflow-y-scroll">
        {customers.map((customer, index) => (
          <div
            className="grid grid-cols-8 items-center bg-blue-200 border-b border-gray-300 text-center p-4"
            key={index}
          >
            <div className="p-2">{customer.name}</div>
            <div className="p-2">{customer.message}</div>
            <div className="p-2">{customer.phoneNumber}</div>
            <div className="p-2">{customer.college || "N/A"}</div>
            <div className="p-2">{customer.department || "N/A"}</div>
            <div className="p-2">{customer.year || "N/A"}</div>
            <div className="p-2">{convertUTCtoIST(customer.createdAt)}</div>
            <div className="p-2">
              <button
                className="py-1 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all"
                onClick={() => deleteCustomer(customer._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardwareCustomers;
