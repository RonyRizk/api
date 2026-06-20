require("dotenv").config();

const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const path = require("path");

const app = express();

// Enable CORS
app.use(cors());

// Read Excel file once on startup
const filePath = path.join(__dirname, "services.xlsx");

const workbook = XLSX.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const services = XLSX.utils.sheet_to_json(worksheet);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Services API is running"
  });
});

// Services endpoint
app.get("/services", (req, res) => {
  res.json(services);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});