const StudentModel = require("../models/Student");

exports.newStudent = async (req, res) => {
  try {
    const { name, email, phone, college, year, date } = req.body;
    if (!name || !email || !phone || !college || !year || !date) {
      return res.status(404).send({
        success: false,
        message: "Please fill all fields",
      });
    }

    const student = new StudentModel({
      name: name,
      email: email,
      phone: phone,
      college: college,
      year: year,
      date: date,
    });

    await student.save();

    return res.status(200).send({
      success: true,
      message: "Succesfull",
      student,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    if (!students) {
      return res.status(404).send({
        message: "Students not found",
        success: false,
      });
    }
    return res.status(200).send({
      success: true,
      message: "Students Data",
      students,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};

exports.delStudent = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).send({
        message: "Student not found",
        success: false,
      });
    }
    const student = await StudentModel.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).send({
        message: "Student not found",
        success: false,
      });
    }
    return res.status(200).send({
      success: true,
      message: "Student Deleted",
      student,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};
