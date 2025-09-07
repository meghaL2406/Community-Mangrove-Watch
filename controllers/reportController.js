const Report = require("../models/Report");
const User = require("../models/User");
const UserGamification = require("../utils/userGamification");

exports.createReport = async (req, res) => {
    try {
        const { user: userId, type, description, photo, location, validated } = req.body;

        // 1️⃣ Create report
        const report = await Report.create({ user: userId, type, description, photo, location });

        // 2️⃣ Fetch user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // 3️⃣ Update gamification
        const userGam = new UserGamification(user);
        userGam.submitReport(validated || false);

        // 4️⃣ Save updated user
        await user.save();

        // 5️⃣ Return report + user summary
        res.json({
            report,
            user_summary: userGam.getSummary()
        });

    } catch (err) {
        console.error("Report creation error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate("user");
        res.json(reports);
    } catch (err) {
        console.error("Get reports error:", err.message);
        res.status(500).json({ error: err.message });
    }
};
