// backend/app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Allow cross-origin requests from frontend
app.use(cors());

// Allow JSON body (including large base64 photos)
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/photos", require("./routes/photoRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/validate", require("./routes/validationRoutes"));

// Health check route
app.get("/", (req, res) => {
    res.send("✅ API is running and connected to MongoDB");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(
        `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
    )
);
