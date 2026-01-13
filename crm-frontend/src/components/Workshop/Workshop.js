import React, { useEffect, useState } from "react";
import axios from "axios";

const Workshop = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const response = await axios.get("http://localhost:5000/workshop/get");
            setWorkshops(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching workshops:", error);
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <h1 className="text-3xl font-bold mb-6">Workshop Registrations</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Phone</th>
                                    <th scope="col" className="px-6 py-3">College</th>
                                    <th scope="col" className="px-6 py-3">Department</th>
                                    <th scope="col" className="px-6 py-3">Year</th>
                                    <th scope="col" className="px-6 py-3">Registered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workshops.map((workshop) => (
                                    <tr key={workshop._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {workshop.name}
                                        </td>
                                        <td className="px-6 py-4">{workshop.email}</td>
                                        <td className="px-6 py-4">{workshop.phone}</td>
                                        <td className="px-6 py-4">{workshop.college}</td>
                                        <td className="px-6 py-4">{workshop.department}</td>
                                        <td className="px-6 py-4">{workshop.year}</td>
                                        <td className="px-6 py-4">
                                            {new Date(workshop.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Workshop;
