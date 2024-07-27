const express = require("express");
// Adjust the path as necessary
const { getDocLink, createDocLink, getAllDocs, deleteDocById } = require("../controllers/DocController");

const router = express.Router();

// Fetch document link by unique link
router.get("/getDocLink/:uniqueLink", getDocLink);

// Create a new document link
router.post("/createDocLink", createDocLink);
router.get("/getAlldoc", getAllDocs);
router.post('/delete', deleteDocById);

module.exports = router;
