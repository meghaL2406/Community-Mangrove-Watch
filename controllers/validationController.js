const Validation = require("../models/Validation");
const aiValidator = require("../utils/aiValidator");

exports.validateReport = async (req, res) => {
    try {
        const aiScore = aiValidator.analyze(req.body.photo);

        const validation = await Validation.create({
            report: req.body.report,
            aiScore,
            result: aiScore > 0.7 ? "valid" : "uncertain",
        });

        res.json(validation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
