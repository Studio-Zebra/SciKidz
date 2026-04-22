console.log('server.js started')
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import fs from "fs";
import { connectDB } from "./config/db.js";

console.log("1) server.js loaded");

console.log("2) dotenv loaded. MONGO_URI present?", !!process.env.MONGO_URI);

if (process.env.JWT_SECRET_FILE) {
  try {
    process.env.JWT_SECRET = fs.readFileSync(process.env.JWT_SECRET_FILE, 'utf8').trim();
    console.log("Loaded JWT_SECRET from file");
  } catch (err) {
    console.error("Failed to read JWT_SECRET_FILE:", err);
  }
}

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());


app.get("/", (req, res) => res.send("Backend API running!"));

console.log("3) routes about to mount");
import userRoutes from "./routes/userRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/lessons", lessonRoutes);

const PORT = process.env.PORT || 5757;

app.listen(PORT, () => console.log(`4) Server running on port ${PORT}`));

// Connect AFTER listen so the server still starts (debug mode)
console.log("5) calling connectDB()");
connectDB();
