import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

const AllStudents = () => {
  const URL = "https://crm-backend-o6sb.onrender.com";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/students/getStudent`);
      if (data?.success) {
        setStudents(data?.students);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDel = async (id) => {
    try {
      const { data } = await axios.post(`${URL}/students/delStudent`, {
        id: id,
      });
      if (data?.success) {
        window.location.reload();
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

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <div className="content p-4 ">
        <h1 className="font-bold text-4xl ml-10 mt-10">All Students</h1>
        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <ImSpinner8 size={80} className="animate-spin" />
          </div>
        ) : (
          <>
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
              {students.map((student, index) => {
                return (
                  <div
                    className="grid grid-cols-11 bg-blue-200 border-2 border-b-gray-300 text-sm"
                    key={index}
                  >
                    <div className="col-span-2 p-4 text-left font-bold flex flex-col gap-4">
                      <h1>{student.name}</h1>
                    </div>
                    <div className="col-span-2 p-4 text-left font-bold ">
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
                    <div className="col-span-1 p-4 text-left font-bold ">
                      {student.date ? convertUTCtoIST(student?.date) : "N/A"}
                    </div>
                    <div className="col-span-1 p-4">
                      <div
                        className="py-2 bg-red-500 text-white font-semibold text-center rounded-xl cursor-pointer hover:bg-red-700"
                        onClick={() => handleDel(student?._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllStudents;
