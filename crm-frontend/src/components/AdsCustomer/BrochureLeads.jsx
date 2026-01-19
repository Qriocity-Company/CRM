import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im"; // Import spinner
import { CSVLink } from "react-csv";
import { API_URL } from "../../config/api";

const URL = API_URL;

const BrochureLeads = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${URL}/adsCustomer/fetch`);
            // Filter for BrochureDownload source
            const brochureLeads = response.data.customers
                .filter((c) => c.source === "BrochureDownload")
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            setCustomers(brochureLeads);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching customers:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);




    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    };

    // CSV Export data
    const csvData = customers.map((customer) => ({
        Name: customer.name,
        Contact: customer.phoneNumber,
        College: customer.college,
        Department: customer.department,
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
        return (
            <div className="flex justify-center items-center h-screen">
                <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="font-semibold text-2xl mb-6">Brochure Download Leads</h1>

            <div className="flex justify-between items-center mt-8">
                <CSVLink
                    data={csvData}
                    filename={"brochure_leads.csv"}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Download CSV
                </CSVLink>
            </div>

            <div className="grid grid-cols-6 bg-[#2f2a7a] text-white text-center py-4 rounded-t-lg mt-[10px]">
                <div className="p-2 font-bold">S.No</div>
                <div className="p-2 font-bold">Name</div>
                <div className="p-2 font-bold">Phone Number</div>
                <div className="p-2 font-bold">College</div>
                <div className="p-2 font-bold">Department</div>
                <div className="p-2 font-bold">Date</div>
            </div>

            <div className="max-h-[75vh] overflow-y-scroll">
                {currentCustomers.map((customer, index) => (
                    <div
                        className="grid grid-cols-6 items-center bg-blue-200 border-b border-gray-300 text-center p-4"
                        key={index}
                    >
                        <div className="p-2">
                            {(currentPage - 1) * customersPerPage + index + 1}
                        </div>
                        <div className="p-2 break-words whitespace-normal">
                            {customer.name}
                        </div>
                        <div className="p-2">{customer.phoneNumber}</div>
                        <div className="p-2">{customer.college || "N/A"}</div>
                        <div className="p-2">{customer.department || "N/A"}</div>
                        <div className="p-2">
                            {customer.date ? formatDateTime(customer.date) : "N/A"}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 ${currentPage === 1 ? "cursor-not-allowed" : ""
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
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 ${currentPage === totalPages ? "cursor-not-allowed" : ""
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BrochureLeads;
