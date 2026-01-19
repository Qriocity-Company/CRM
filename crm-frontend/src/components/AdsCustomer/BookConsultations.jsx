import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import { CSVLink } from "react-csv";
import { API_URL } from "../../config/api";

const URL = API_URL;

const BookConsultations = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState("All");
  const customersPerPage = 10;

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${URL}/bookConsultations/fetch`);
      // Sort by createdAt field in descending order (newest first)
      const sortedCustomers = response.data.customers.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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
      await axios.delete(`${URL}/bookConsultations/delete/${id}`);
      setCustomers(customers.filter((element) => element._id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  function convertUTCtoIST(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);
    return utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  // Filter customers by city
  const filteredCustomers =
    selectedCity === "All"
      ? customers
      : customers.filter((customer) => customer.city === selectedCity);

  // Extract unique cities for dropdown
  const uniqueCities = [
    "All",
    ...new Set(customers.map((c) => c.city).filter(Boolean)),
  ];

  // CSV Export data
  const csvData = filteredCustomers.map((customer) => ({
    Name: customer.name,
    Email: customer.email,
    Contact: customer.phoneNumber,
    Department: customer.department,
    Year: customer.year,
    City: customer.city || "N/A",
    Date: formatDateTime(customer.createdAt),
  }));

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

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
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-semibold text-2xl mb-6">Book Consultations Leads</h1>

      {/* CSV + City Filter */}
      <div className="flex justify-between items-center mt-8">
        <CSVLink
          data={csvData}
          filename={"book_consultations_data.csv"}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Download CSV
        </CSVLink>


      </div>

      <div className="grid grid-cols-8 bg-[#2f2a7a] text-white text-center py-4 rounded-t-lg mt-[10px]">
        <div className="p-2 font-bold">S.No</div>
        <div className="p-2 font-bold">Name</div>
        <div className="p-2 font-bold">Email</div>
        <div className="p-2 font-bold">Phone Number</div>
        <div className="p-2 font-bold">Department</div>
        <div className="p-2 font-bold">Year</div>
        <div className="p-2 font-bold">Date</div>
        <div className="p-2 font-bold">Actions</div>
      </div>

      <div className="max-h-[75vh] overflow-y-auto">
        {currentCustomers.length > 0 ? (
          currentCustomers.map((customer, index) => (
            <div
              className="grid grid-cols-8 items-center bg-blue-100 border-b border-gray-300 text-center p-4 hover:bg-blue-50"
              key={customer._id}
            >
              <div className="p-2">
                {(currentPage - 1) * customersPerPage + index + 1}
              </div>
              <div className="p-2 break-words whitespace-normal">
                {customer.name}
              </div>
              <div className="p-2 break-words whitespace-normal">
                {customer.email || "N/A"}
              </div>
              <div className="p-2">{customer.phoneNumber}</div>
              <div className="p-2">{customer.department || "N/A"}</div>
              <div className="p-2">{customer.year || "N/A"}</div>
              <div className="p-2">
                {customer.createdAt
                  ? convertUTCtoIST(customer.createdAt)
                  : "N/A"}
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
          ))
        ) : (
          <div className="text-center py-8 bg-blue-100">No customers found</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-700 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookConsultations;
