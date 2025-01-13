import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im"; // Import spinner
import { CSVLink } from "react-csv";

const URL = "https://crm-backend-o6sb.onrender.com";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const customersPerPage = 10; // Set number of customers per page

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${URL}/adsCustomer/fetch`);
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
      const response = await axios.delete(`${URL}/adsCustomer/delete/${id}`);
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

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const csvData = customers.map((customer) => ({
    Name: customer.name,
    Message: customer.message,
    Contact: customer.phoneNumber,
    College: customer.college,
    Department: customer.department,
    Year: customer.year,
    Date: formatDateTime(customer.date),
  }));

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(customers.length / customersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      <h1 className="font-semibold text-2xl mb-6">Face Book Ads Lead</h1>

      <div className="flex justify-between items-center mt-8">
        <CSVLink
          data={csvData}
          filename={"students_data.csv"}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Download CSV
        </CSVLink>
      </div>

      <div className="grid grid-cols-9 bg-[#2f2a7a] text-white text-center py-4 rounded-t-lg mt-[10px]">
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

      <div className="max-h-[75vh] overflow-y-scroll">
        {currentCustomers.map((customer, index) => (
          <div
            className="grid grid-cols-9 items-center bg-blue-200 border-b border-gray-300 text-center p-4"
            key={index}
          >
            <div className="p-2">
              {(currentPage - 1) * customersPerPage + index + 1}
            </div>
            <div className="p-2">{customer.name}</div>
            <div className="p-2">{customer.message}</div>
            <div className="p-2">{customer.phoneNumber}</div>
            <div className="p-2">{customer.college || "N/A"}</div>
            <div className="p-2">{customer.department || "N/A"}</div>
            <div className="p-2">{customer.year || "N/A"}</div>
            <div className="p-2">
              {customer.date ? convertUTCtoIST(customer.date) : "N/A"}
            </div>
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 ${
            currentPage === 1 ? "cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 ${
            currentPage === totalPages ? "cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers;
