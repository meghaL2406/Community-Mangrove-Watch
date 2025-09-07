const Photo = require("../models/Photo");

exports.uploadPhoto = async (req, res) => {
    try {
        const photo = await Photo.create({ url: req.body.url });
        res.json(photo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
