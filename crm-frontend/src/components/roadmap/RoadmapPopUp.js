import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv
import { API_URL } from "../../config/api";

const RoadmapPopUp = () => {
  const URL = API_URL;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStudents = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/roadmap-popup/getStudent`);
      if (data?.success) {
        const sortedStudents = data.students.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setStudents(sortedStudents);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const handleDel = async (id) => {
    try {
      const { data } = await axios.post(`${URL}/roadmap-popup/delStudent`, {
        id,
      });
      if (data?.success) {
        getStudents(); // Refetch the students list after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(students.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  useEffect(() => {
    getStudents();
  }, []);

  // CSV Data formatting
  const csvData = students.map((student) => ({
    Name: student.name,
    Email: student.email,
    Contact: student.phone,
    College: student.college,
    Department: student.department,
    Year: student.year,
    Date: formatDateTime(student.createdAt),
  }));

  return (
    <>
      <div className="content p-4">
        <h1 className="font-bold text-4xl ml-10 mt-10">
          Road Map Pop-Up Form Data
        </h1>
        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <ImSpinner8 size={80} className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mt-8">
              <CSVLink
                data={csvData}
                filename={"students_data.csv"}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Download CSV
              </CSVLink>
            </div>
            <div className="grid grid-cols-16 bg-[#2f2a7a] text-white mt-4 text-lg">
              <div className="col-span-2 p-4 font-bold">Name</div>
              <div className="col-span-3 p-4 font-bold">Email</div>
              <div className="col-span-2 p-4 font-bold">Contact</div>
              <div className="col-span-2 p-4 font-bold">College</div>
              <div className="col-span-2 p-4 font-bold">Department</div>
              <div className="col-span-2 p-4 font-bold">Year</div>
              <div className="col-span-2 p-4 text-xl font-bold">Date</div>
              <div className="col-span-1 p-4 text-xl font-bold">Delete</div>
            </div>
            <div className="max-h-[75vh] overflow-y-scroll">
              {currentStudents.map((student, index) => (
                <div
                  className="grid grid-cols-16 bg-blue-200 border-2 border-b-gray-300 text-sm"
                  key={index}
                >
                  <div className="col-span-2 p-4 text-left font-bold flex flex-col gap-4">
                    <h1>{student.name}</h1>
                  </div>
                  <div className="col-span-3 p-4 text-left font-bold break-words">
                    {student.email}
                  </div>
                  <div className="col-span-2 p-4 text-left font-bold">
                    {student.phone}
                  </div>
                  <div className="col-span-2 p-4 text-left font-bold break-words">
                    {student.college}
                  </div>
                  <div className="col-span-2 p-4 text-left font-bold break-words">
                    {student.department}
                  </div>
                  <div className="col-span-2 p-4 text-left font-bold">
                    {student.year}
                  </div>
                  <div className="col-span-2 p-4 text-left font-bold">
                    {formatDateTime(student.createdAt)}
                  </div>
                  <div className="col-span-1 p-4">
                    <div
                      className="p-2 bg-red-500 text-white flex justify-center items-center rounded-xl cursor-pointer hover:bg-red-700"
                      onClick={() => handleDel(student._id)}
                    >
                      <MdDelete size={30} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-100"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(students.length / itemsPerPage)}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(students.length / itemsPerPage)
                }
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-100"
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

export default RoadmapPopUp;
