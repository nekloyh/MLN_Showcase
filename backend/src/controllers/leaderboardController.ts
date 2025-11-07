import { Request, Response } from "express";
import Leaderboard from "../models/Leaderboard.js";

export const submitScore = async (req: Request, res: Response) => {
  try {
    const {
      playerName,
      scores,
      totalScore,
      gameRounds,
      completedAt,
      openAnswers,
    } = req.body;

    // Validation
    if (!playerName || !scores || totalScore === undefined) {
      return res.status(400).json({
        success: false,
        message: "Thiếu dữ liệu bắt buộc (playerName, scores, totalScore)",
      });
    }

    // Giới hạn độ dài playerName và đảm bảo là string
    const validatedPlayerName = String(playerName).trim().substring(0, 50);

    // Kiểm tra scores là object và có đủ 4 trường
    const requiredScores = ["politics", "economy", "society", "diplomacy"];
    if (
      typeof scores !== "object" ||
      requiredScores.some((key) => typeof scores[key] !== "number")
    ) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu scores không hợp lệ",
      });
    }

    // Kiểm tra totalScore là number
    if (typeof totalScore !== "number") {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu totalScore không hợp lệ",
      });
    }

    // Kiểm tra gameRounds là number
    const validatedGameRounds = typeof gameRounds === "number" ? gameRounds : 0;

    // Kiểm tra openAnswers là array và giới hạn độ dài mỗi phần tử
    const validatedOpenAnswers = Array.isArray(openAnswers)
      ? openAnswers.map((ans) => String(ans).substring(0, 255))
      : [];

    // Tạo entry mới
    const newEntry = new Leaderboard({
      playerName: validatedPlayerName,
      scores,
      totalScore,
      gameRounds: validatedGameRounds,
      completedAt: completedAt ? new Date(completedAt) : new Date(),
      openAnswers: validatedOpenAnswers,
    });

    await newEntry.save();
    // Tính rank
    const rank =
      (await Leaderboard.countDocuments({ totalScore: { $gt: totalScore } })) +
      1;
    const totalPlayers = await Leaderboard.countDocuments();
    res.status(201).json({
      success: true,
      message: "Đã lưu kết quả thành công!",
      data: {
        rank,
        totalPlayers,
      },
    });
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lưu dữ liệu",
    });
  }
};
export const getLeaderboard = async (req: Request, res: Response) => {
  // Yêu cầu chỉ lấy top 10, không cần phân trang
  const limit = 10;
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ totalScore: -1, completedAt: 1 })
      .limit(limit)
      .select("playerName totalScore completedAt scores") // Thêm scores để frontend có thể dùng
      .exec();
    // Thêm trường rank
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry.toObject(),
      rank: index + 1,
    }));
    res.json({
      success: true,
      data: rankedLeaderboard,
    });
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy dữ liệu",
    });
  }
};
