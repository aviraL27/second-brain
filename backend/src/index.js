const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/items", itemRoutes);

connectDB();

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ status: "success", message: "Second Brain API is alive!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
