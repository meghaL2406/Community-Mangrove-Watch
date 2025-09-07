const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["cutting", "dumping", "other"], required: true },
    description: { type: String },
    photo: { type: String }, // file path / URL
    location: {
        lat: Number,
        lon: Number,
    },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);
