const express = require("express");
const {
    newLead,
    getLeads,
    delLead,
} = require("../controllers/courseLeadController");

const router = express.Router();

router.post("/new", newLead);
router.get("/get", getLeads);
router.post("/delete", delLead);

module.exports = router;
