const express = require("express");
const { newStudent, getStudents } = require("../controllers/studentController");

const router = express.Router();

router.post("/newStudent", newStudent);

router.get("/getStudent", getStudents);

module.exports = router;
