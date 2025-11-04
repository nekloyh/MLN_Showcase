import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";
// Giả sử file routes của bạn nằm ở đây
import leaderboardRoutes from "./routes/leaderboard.js";

dotenv.config();

const app = express();
// Render sẽ tự động gán PORT, nhưng chúng ta set 3000 làm mặc định
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Bảo mật cơ bản
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Cho dev local
      "https://mln122.vercel.app", // Tạm thời, ta sẽ đổi sau
      /\.vercel\.app$/, // Cho phép tất cả subdomain của Vercel
    ],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Tối đa 100 request mỗi 15 phút
});
app.use("/api/", limiter);

// Kết nối MongoDB
const connectDB = async () => {
  try {
    // Biến MONGODB_URI sẽ được set trên Render
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Thoát nếu không kết nối được DB
  }
};

connectDB();

// Routes
app.use("/api/leaderboard", leaderboardRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "MLN122 API Server",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      submitScore: "POST /api/leaderboard/submit",
      getLeaderboard: "GET /api/leaderboard",
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});
