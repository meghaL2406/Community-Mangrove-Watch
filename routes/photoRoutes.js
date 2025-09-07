const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photoController");

router.post("/", photoController.uploadPhoto);
router.get("/", photoController.getPhotos);

module.exports = router;
