const mongoose = require("mongoose");

const validationSchema = new mongoose.Schema({
    report: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
    aiScore: { type: Number, default: 0 },
    humanValidated: { type: Boolean, default: false },
    result: { type: String, enum: ["valid", "invalid", "uncertain"], default: "uncertain" },
});

module.exports = mongoose.model("Validation", validationSchema);
