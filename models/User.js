const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    points: { type: Number, default: 0 },        // gamification points
    badges: { type: [String], default: [] },     // badges
    reports_submitted: { type: Number, default: 0 },
    validated_reports: { type: Number, default: 0 },
    user_type: { type: String, default: "Coastal Community" } // store type
});

module.exports = mongoose.model("User", userSchema);
