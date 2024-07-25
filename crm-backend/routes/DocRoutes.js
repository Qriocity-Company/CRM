const express = require("express");
// Adjust the path as necessary
const { getDocLink, createDocLink } = require("../controllers/DocController");

const router = express.Router();

// Fetch document link by unique link
router.get("/getDocLink/:uniqueLink", getDocLink);

// Create a new document link
router.post("/createDocLink", createDocLink);

module.exports = router;
