import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ImSpinner8 } from "react-icons/im";
import { API_URL } from "../../config/api";

const URL = API_URL;

const CourseLeads = () => {
    // const URL = API_URL; // Or use environment variable if available
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);

    const getLeads = React.useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${URL}/course-leads/get`);
            if (data?.success) {
                setLeads(data.leads);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    const handleDel = async (id) => {
        try {
            const { data } = await axios.post(`${URL}/course-leads/delete`, { id });
            if (data?.success) {
                getLeads(); // Refresh list instead of reload
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    };

    const csvData = leads.map((lead) => ({
        Name: lead.name,
        Email: lead.email,
        Phone: lead.phone,
        Education: lead.education,
        Profile: lead.profile,
        Date: formatDateTime(lead.createdAt),
    }));

    useEffect(() => {
        getLeads();
    }, [getLeads]);

    return (
        <div className="content p-4">
            <h1 className="font-bold text-4xl ml-10 mt-10">Course Leads Data</h1>
            {loading ? (
                <div className="flex justify-center items-center mt-40">
                    <ImSpinner8 size={80} className="animate-spin" />
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mt-8">
                        <CSVLink
                            data={csvData}
                            filename={"course_leads_data.csv"}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                        >
                            Download CSV
                        </CSVLink>
                    </div>
                    <div className="grid grid-cols-12 bg-[#2f2a7a] text-white mt-8 text-lg">
                        <div className="col-span-2 p-4 font-bold">Name</div>
                        <div className="col-span-3 p-4 font-bold">Email</div>
                        <div className="col-span-2 p-4 font-bold">Phone</div>
                        <div className="col-span-2 p-4 font-bold">Education</div>
                        <div className="col-span-2 p-4 font-bold">Profile</div>
                        <div className="col-span-1 p-4 font-bold">Action</div>
                    </div>
                    <div className="max-h-[75vh] overflow-y-scroll">
                        {leads.map((lead, index) => (
                            <div
                                className="grid grid-cols-12 bg-blue-200 border-2 border-b-gray-300 text-sm"
                                key={index}
                            >
                                <div className="col-span-2 p-4 font-bold">{lead.name}</div>
                                <div className="col-span-3 p-4 font-bold break-all">{lead.email}</div>
                                <div className="col-span-2 p-4 font-bold">{lead.phone}</div>
                                <div className="col-span-2 p-4 font-bold">{lead.education}</div>
                                <div className="col-span-2 p-4 font-bold">{lead.profile}</div>
                                <div className="col-span-1 p-4">
                                    <button
                                        className="py-1 px-3 bg-red-500 text-white font-semibold rounded hover:bg-red-700"
                                        onClick={() => handleDel(lead._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CourseLeads;
