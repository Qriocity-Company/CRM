const express = require("express");
const {
  newStudent,
  getStudents,
  delStudent,
} = require("../controllers/roadmap");

const router = express.Router();

router.post("/newStudent", newStudent);

router.post("/delStudent", delStudent);

router.get("/getStudent", getStudents);

module.exports = router;