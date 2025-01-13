import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im"; // Import spinner

const URL = "https://crm-backend-o6sb.onrender.com";

const HardwareCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${URL}/hardwareCustomers/fetch`);
      const sortedCustomers = response.data.customers.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setCustomers(sortedCustomers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`${URL}/hardwareCustomers/delete/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
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

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = customers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(customers.length / entriesPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-semibold text-2xl mb-6">Hardware Customers Lead</h1>

      {/* Table Header */}
      <div className="grid grid-cols-9 bg-[#2f2a7a] text-white text-center py-4 rounded-t-lg">
        <div className="p-2 font-bold">S.No</div>
        <div className="p-2 font-bold">Name</div>
        <div className="p-2 font-bold">Message</div>
        <div className="p-2 font-bold">Phone Number</div>
        <div className="p-2 font-bold">College</div>
        <div className="p-2 font-bold">Department</div>
        <div className="p-2 font-bold">Year</div>
        <div className="p-2 font-bold">Date</div>
        <div className="p-2"></div>
      </div>

      {/* Table Body */}
      <div className="max-h-[75vh] overflow-y-scroll">
        {currentEntries.map((customer, index) => (
          <div
            className="grid grid-cols-9 items-center bg-blue-200 border-b border-gray-300 text-center p-4"
            key={index}
          >
            <div className="p-2">{indexOfFirstEntry + index + 1}</div>
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

      {/* Pagination */}
      <div className="flex justify-center gap-5 items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HardwareCustomers;
