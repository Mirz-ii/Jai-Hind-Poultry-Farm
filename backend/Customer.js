const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    udhar: Number,
    nag: Number,
    weight: Number,
    rate: String,
    saleAmount: String,
    closingBalance: String
});

module.exports = mongoose.model("Customer", CustomerSchema);