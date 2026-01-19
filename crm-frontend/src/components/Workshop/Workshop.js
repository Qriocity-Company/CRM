import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { ImSpinner8 } from "react-icons/im";
import { API_URL } from "../../config/api";

const URL = API_URL;

const Workshop = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/workshop/get`);
            const sortedWorkshops = response.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setWorkshops(sortedWorkshops);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching workshops:", error);
            setLoading(false);
        }
    };

    function convertUTCtoIST(utcTimestamp) {
        const utcDate = new Date(utcTimestamp);
        const istDateTime = utcDate.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
        });
        return istDateTime;
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWorkshops = workshops.slice(indexOfFirstItem, indexOfLastItem);

    const csvData = workshops.map((item) => ({
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        College: item.college,
        Department: item.department,
        Year: item.year,
        RegisteredAt: convertUTCtoIST(item.createdAt),
    }));

    // Pagination button handlers
    const goToNextPage = () => {
        if (currentPage < Math.ceil(workshops.length / itemsPerPage)) {
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
            <h1 className="font-semibold text-2xl mb-6">Workshop Registrations</h1>
            <div className="flex justify-between items-center mt-8">
                <CSVLink
                    data={csvData}
                    filename={"workshop_registrations.csv"}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Download CSV
                </CSVLink>
            </div>

            {loading ? (
                <div className="h-full w-full flex justify-center items-center">
                    <ImSpinner8
                        size={50}
                        className="animate-spin text-blue-500 mt-[200px]"
                    />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-8 bg-[#2f2a7a] text-white text-center py-4 rounded-t-lg mt-10">
                        <div className="p-2 font-bold">S.No</div>
                        <div className="p-2 font-bold">Name</div>
                        <div className="p-2 font-bold">Email</div>
                        <div className="p-2 font-bold">Phone</div>
                        <div className="p-2 font-bold">College</div>
                        <div className="p-2 font-bold">Department</div>
                        <div className="p-2 font-bold">Year</div>
                        <div className="p-2 font-bold">Registered At</div>
                    </div>

                    <div className="max-h-[75vh] overflow-y-scroll">
                        {currentWorkshops.map((item, index) => (
                            <div
                                className="grid grid-cols-8 items-center bg-blue-200 border-b border-gray-300 text-center p-4"
                                key={item._id}
                            >
                                <div className="p-2">{indexOfFirstItem + index + 1}</div>
                                <div className="p-2 break-words whitespace-normal">{item.name}</div>
                                <div className="p-2 break-words whitespace-normal">{item.email}</div>
                                <div className="p-2">{item.phone}</div>
                                <div className="p-2 break-words whitespace-normal">{item.college}</div>
                                <div className="p-2">{item.department}</div>
                                <div className="p-2">{item.year}</div>
                                <div className="p-2">{convertUTCtoIST(item.createdAt)}</div>
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
                            Page {currentPage} of {Math.ceil(workshops.length / itemsPerPage)}
                        </span>
                        <button
                            onClick={goToNextPage}
                            className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300"
                            disabled={currentPage === Math.ceil(workshops.length / itemsPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Workshop;
