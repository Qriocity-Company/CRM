import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

const PopUp = () => {
  const URL = "https://crm-backend-o6sb.onrender.com";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/enquiry/getStudent`);
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
  };

  const handleDel = async (id) => {
    try {
      const { data } = await axios.post(`${URL}/enquiry/delStudent`, { id });
      if (data?.success) {
        window.location.reload();
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
  const sortedStudents = students
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <>
      <div className="content p-4">
        <h1 className="font-bold text-4xl ml-10 mt-10">Pop Up Form Data</h1>
        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <ImSpinner8 size={80} className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-16 bg-[#2f2a7a] text-white mt-8 text-lg">
              <div className="col-span-2 p-4 font-bold">Name</div>
              <div className="col-span-2 p-4 font-bold">Email</div>
              <div className="col-span-2 p-4 font-bold ">Contact</div>
              <div className="col-span-2 p-4 font-bold ">College</div>
              <div className="col-span-2 p-4 font-bold ">Department </div>
              <div className="col-span-2 p-4 font-bold ">Year</div>
              <div className="col-span-2 p-4 text-xl font-bold">Date</div>
              <div className="col-span-2 p-4 text-xl font-bold">Delete</div>
            </div>
            <div className="max-h-[75vh] overflow-y-scroll">
              {sortedStudents.map((student, index) => (
                <div
                  className="grid grid-cols-16 bg-blue-200 border-2 border-b-gray-300 text-sm"
                  key={index}
                >
                  <div className="col-span-2 p-4 text-left font-bold flex flex-col gap-4 whitespace-normal break-words">
                    <h1>{student.name}</h1>
                  </div>
                  <div className="col-span-2 p-4 text-left font-bold whitespace-normal break-words">
                    {student.email}
                  </div>
                  <div className="col-span-2 p-4 pl-10 font-bold text-left whitespace-normal break-words">
                    {student.phone}
                  </div>
                  <div className="col-span-2 p-4 pl-10 font-bold text-left whitespace-normal break-words">
                    {student.college}
                  </div>
                  <div className="col-span-2 p-4 pl-10 font-bold text-left whitespace-normal break-words">
                    {student.department}
                  </div>
                  <div className="col-span-2 p-4 pl-10 font-bold text-left ">
                    {student.year}
                  </div>
                  <div className="col-span-2 p-4 text-left font-bold whitespace-normal break-words">
                    {student.date ? convertUTCtoIST(student.date) : "N/A"}
                  </div>
                  <div className="col-span-2 p-4">
                    <div
                      className="py-2 px-4 bg-red-500 text-white font-semibold text-center rounded-xl cursor-pointer hover:bg-red-700"
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

export default PopUp;
