const express = require("express");
const Customer = require("../models/Customer");
const router = express.Router();

// ➤ Add a customer
router.post("/add", async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.json({ message: "✅ Customer added!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➤ Get all customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➤ Search customer by name
router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.name;
        const customers = await Customer.find({ name: new RegExp(searchQuery, "i") });
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➤ Delete a customer
router.delete("/:id", async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: "🗑️ Customer deleted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;