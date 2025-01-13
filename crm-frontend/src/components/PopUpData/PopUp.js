import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ImSpinner8 } from "react-icons/im";

const PopUp = () => {
  const URL = "https://crm-backend-o6sb.onrender.com";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const getStudents = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/enquiry/getStudent`);
      if (data?.success) {
        const sortedStudents = data.students.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setStudents(sortedStudents);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDel = async (id) => {
    try {
      const { data } = await axios.post(`${URL}/enquiry/delStudent`, { id });
      if (data?.success) {
        getStudents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  function convertUTCtoIST(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);
    const istDate = utcDate.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    return istDate;
  }

  useEffect(() => {
    getStudents();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = students.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(students.length / entriesPerPage);

  const pageNumbers = [];
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const csvData = students.map((student) => ({
    Name: student.name,
    Email: student.email,
    Contact: student.phone,
    College: student.college,
    Department: student.department,
    Year: student.year,
    Date: formatDateTime(student.date),
  }));

  return (
    <>
      <div className="content p-4">
        <h1 className="font-bold text-4xl ml-10 mt-10">
          Home Page Pop Up Data
        </h1>
        <div className="flex justify-between items-center mt-8">
          <CSVLink
            data={csvData}
            filename={"home_page_pop_up_data.csv"}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Download CSV
          </CSVLink>
        </div>
        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <ImSpinner8 size={80} className="animate-spin" />
          </div>
        ) : (
          <>
            <table className="table-auto w-full border-collapse border border-gray-200 mt-8">
              <thead className="bg-[#2f2a7a] text-white text-lg">
                <tr>
                  <th className="border border-gray-300 p-4">S.No</th>
                  <th className="border border-gray-300 p-4">Name</th>
                  <th className="border border-gray-300 p-4">Email</th>
                  <th className="border border-gray-300 p-4">Contact</th>
                  <th className="border border-gray-300 p-4">College</th>
                  <th className="border border-gray-300 p-4">Department</th>
                  <th className="border border-gray-300 p-4">Year</th>
                  <th className="border border-gray-300 p-4">Date</th>
                  <th className="border border-gray-300 p-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((student, index) => (
                  <tr
                    className="bg-blue-200 border border-gray-300 text-sm"
                    key={student._id}
                  >
                    <td className="border border-gray-300 p-4 text-center">
                      {indexOfFirstEntry + index + 1}
                    </td>
                    <td className="border border-gray-300 p-4 text-left">
                      {student.name}
                    </td>
                    <td className="border border-gray-300 p-4 text-left">
                      {student.email}
                    </td>
                    <td className="border border-gray-300 p-4 text-left">
                      {student.phone}
                    </td>
                    <td className="border border-gray-300 p-4 text-left">
                      {student.college}
                    </td>
                    <td className="border border-gray-300 p-4 text-left">
                      {student.department}
                    </td>
                    <td className="border border-gray-300 p-4 text-left">
                      {student.year}
                    </td>
                    <td className="border border-gray-300 p-4 text-left">
                      {convertUTCtoIST(student.createdAt)}
                    </td>
                    <td className="border border-gray-300 p-4 text-center">
                      <button
                        className="py-2 px-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-700"
                        onClick={() => handleDel(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 gap-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="ml-4 mr-4 font-bold text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PopUp;
