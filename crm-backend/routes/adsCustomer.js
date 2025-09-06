const Customer = require("../models/AdsCustomer");
const express = require("express");
const uuid = require("uuid");
const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const  formData  = req.body;
    const {city} = req.body
    const {
      senderEmail,
      message,
      phoneNumber,
      name,
      departmentCollege,
      YearCollege,
      College,
    } = formData;
    

    console.log("received:", name);

    let customer = new Customer({
      name: name,
      email: senderEmail,
      phoneNumber: phoneNumber,
      message: message,
      department: departmentCollege,
      year: YearCollege,
      college: College,
      id: uuid.v4(),
      city: city,
    });

    const saved = await customer.save();

    res.status(200).json({ message: "Customer Created", customer: saved });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ date: -1 });

    res.status(200).json({
      message: "Customers fetched Successfully",
      customers: customers,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully", deletedCustomer });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
