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
            <div className="grid grid-cols-6 bg-[#2f2a7a] text-white mt-8">
              <div className="col-span-1 p-4 text-xl font-bold">Name</div>
              <div className="col-span-1 p-4 text-xl font-bold">Email</div>
              <div className="col-span-1 p-4 text-xl font-bold text-left">
                Phone Number
              </div>
              <div className="col-span-2 p-4 text-xl font-bold text-left">
                College
              </div>
              <div className="col-span-1 p-4 text-xl font-bold">Year</div>
            </div>
            <div className="m-h-[75vh] overflow-y-scroll">
              {students.map((student, index) => {
                return (
                  <div
                    className="grid grid-cols-6 bg-blue-200 border-2 border-b-gray-300 text-lg"
                    id={index}
                  >
                    <div className="col-span-1 p-4  font-bold ">
                      {student.name}
                    </div>
                    <div className="col-span-1 p-4  font-bold ">
                      {student.email}
                    </div>
                    <div className="col-span-1 p-4 pl-10  font-bold text-left">
                      {student.phone}
                    </div>
                    <div className="col-span-2 p-4 pl-10  font-bold text-left">
                      {student.college}
                    </div>
                    <div className="col-span-1 p-4 pl-10 font-bold text-left">
                      {student.year}
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
