const CourseLead = require("../models/CourseLead");

exports.newLead = async (req, res) => {
    try {
        const { name, email, phone, education, profile, date } = req.body;

        // Basic validation
        if (!name || !email || !phone) {
            return res.status(400).send({
                success: false,
                message: "Please fill all required fields (Name, Email, Phone)",
            });
        }

        const lead = new CourseLead({
            name,
            email,
            phone,
            education,
            profile,
            date: date || new Date(),
        });

        await lead.save();

        return res.status(200).send({
            success: true,
            message: "Course Lead Saved Successfully",
            lead,
        });
    } catch (error) {
        console.error("Error creating course lead:", error);
        return res.status(500).send({
            message: "Internal Server Error",
            success: false,
            error,
        });
    }
};

exports.getLeads = async (req, res) => {
    try {
        const leads = await CourseLead.find().sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "Course Leads Data",
            leads,
        });
    } catch (error) {
        console.error("Error fetching course leads:", error);
        return res.status(500).send({
            message: "Internal Server Error",
            success: false,
            error,
        });
    }
};

exports.delLead = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({
                message: "Lead ID required",
                success: false,
            });
        }
        const lead = await CourseLead.findByIdAndDelete(id);
        if (!lead) {
            return res.status(404).send({
                message: "Lead not found",
                success: false,
            });
        }
        return res.status(200).send({
            success: true,
            message: "Lead Deleted",
            lead,
        });
    } catch (error) {
        console.error("Error deleting course lead:", error);
        return res.status(500).send({
            message: "Internal Server Error",
            success: false,
            error,
        });
    }
};
