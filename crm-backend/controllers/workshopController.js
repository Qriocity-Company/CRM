const Workshop = require("../models/Workshop");

exports.addWorkshop = async (req, res) => {
    try {
        const workshop = new Workshop(req.body);
        await workshop.save();
        res.status(201).json({ message: "Workshop registration added successfully", workshop });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.find().sort({ createdAt: -1 });
        res.status(200).json(workshops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
