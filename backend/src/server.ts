import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import leaderboardRoutes from "./routes/leaderboard";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Cho phép tất cả các domain (OK cho local, cần chỉnh lại khi deploy)
app.use(express.json());

// Routes
app.use("/api/leaderboard", leaderboardRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/game-leaderboard"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
