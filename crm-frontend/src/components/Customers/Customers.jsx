import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { ImSpinner8 } from "react-icons/im";

const URL = "https://crm-backend-o6sb.onrender.com";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/customer/fetch`);
        const sortedCustomers = response.data.customers.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setCustomers(sortedCustomers);
        setLoading(false);
        console.log(sortedCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(`${URL}/customer/delete/${id}`);
      console.log(response.data);
      setCustomers(customers.filter((element) => element.id !== id));
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

  // Pagination logic
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const csvData = customers.map((customer) => ({
    Name: customer.name,
    message: customer.message,
    Contact: customer.phoneNumber,
    College: customer.college,
    Department: customer.department,
    Year: customer.year,
    Date: formatDateTime(customer.date),
  }));

  // Pagination button handlers
  const goToNextPage = () => {
    if (currentPage < Math.ceil(customers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-semibold text-2xl mb-6">
        Customer Messages Received
      </h1>
      <div className="flex justify-between items-center mt-8">
        <CSVLink
          data={csvData}
          filename={"customers_data.csv"}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Download CSV
        </CSVLink>
      </div>
      <>
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <ImSpinner8
              size={50}
              className="animate-spin text-blue-500 mt-[200px]"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-10 bg-[#2f2a7a] text-white text-center py-4 rounded-t-lg mt-10">
              <div className="p-2 font-bold">S.No</div>
              <div className="p-2 font-bold">Name</div>
              <div className="p-2 font-bold">Email</div>
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
                  <div className="p-2">{indexOfFirstCustomer + index + 1}</div>
                  <div className="p-2">{customer.name}</div>
                  <div className="p-2">{customer.email}</div>
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
                      onClick={() => deleteCustomer(customer.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4 items-center">
              <button
                onClick={goToPrevPage}
                className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-lg font-medium">
                Page {currentPage} of{" "}
                {Math.ceil(customers.length / itemsPerPage)}
              </span>
              <button
                onClick={goToNextPage}
                className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300"
                disabled={
                  currentPage === Math.ceil(customers.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Customers;
