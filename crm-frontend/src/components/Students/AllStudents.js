import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ImSpinner8 } from "react-icons/im";
import { API_URL } from "../../config/api";

const URL = API_URL;

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/students/getStudent`);
      if (data?.success) {
        const sortedStudents = data.students.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setStudents(sortedStudents);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []); // URL is a constant

  const handleDel = async (id) => {
    try {
      const { data } = await axios.post(`${URL}/students/delStudent`, { id });
      if (data?.success) {
        // window.location.reload(); // Reloading is bad UX, let's refresh
        getStudents();
      }
    } catch (error) {
      console.log(error);
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

  const csvData = students.map((student) => ({
    Name: student.name,
    Email: student.email,
    Contact: student.phone,
    College: student.college,
    Department: student.department,
    Year: student.year,
    Date: formatDateTime(student.createdAt),
  }));

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <>
      <div className="content p-4">
        <h1 className="font-bold text-4xl ml-10 mt-10">Resources Data</h1>
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
            <div className="grid grid-cols-11 bg-[#2f2a7a] text-white mt-8 text-lg">
              <div className="col-span-2 p-4 font-bold">Name</div>
              <div className="col-span-2 p-4 font-bold">Email</div>
              <div className="col-span-2 p-4 font-bold text-left">
                Phone Number
              </div>
              <div className="col-span-2 p-4 text-xl font-bold text-left">
                College
              </div>
              <div className="col-span-1 p-4 text-xl font-bold">Year</div>
              <div className="col-span-1 p-4 text-xl font-bold">Date</div>
              <div className="col-span-1 p-4 text-xl font-bold"></div>
            </div>
            <div className="max-h-[75vh] overflow-y-scroll">
              {students.map((student, index) => (
                <div
                  className="grid grid-cols-11 bg-blue-200 border-2 border-b-gray-300 text-sm"
                  key={index}
                >
                  <div className="col-span-2 p-4 text-left font-bold flex flex-col gap-4">
                    <h1>{student.name}</h1>
                  </div>
                  <div className="col-span-2 p-4 text-left font-bold">
                    {student.email}
                  </div>
                  <div className="col-span-2 p-4 pl-10 font-bold text-left">
                    {student.phone}
                  </div>
                  <div className="col-span-2 p-4 pl-10 font-bold text-left">
                    {student.college}
                  </div>
                  <div className="col-span-1 p-4 pl-10 font-bold text-left">
                    {student.year}
                  </div>
                  <div className="col-span-1 p-4 text-left font-bold">
                    {student.date ? convertUTCtoIST(student.date) : "N/A"}
                  </div>
                  <div className="col-span-1 p-4">
                    <div
                      className="py-2 bg-red-500 text-white font-semibold text-center rounded-xl cursor-pointer hover:bg-red-700"
                      onClick={() => handleDel(student._id)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllStudents;
