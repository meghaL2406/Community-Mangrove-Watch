const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    url: { type: String, required: true },
    validated: { type: Boolean, default: false },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Photo", photoSchema);
