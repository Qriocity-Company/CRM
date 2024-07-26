const express = require("express");
// Adjust the path as necessary
const { getAllLinks, createLink } = require("../controllers/linkController");

const router = express.Router();

// Fetch document link by unique link
router.get("/getAlllink", getAllLinks);

// Create a new document link
router.post("/createLink", createLink);

module.exports = router;
