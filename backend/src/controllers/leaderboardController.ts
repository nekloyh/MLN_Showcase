import { Request, Response } from "express";
import Leaderboard from "../models/Leaderboard";

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
    if (!playerName || !scores || !totalScore) {
      return res.status(400).json({
        success: false,
        message: "Thiếu dữ liệu bắt buộc",
      });
    }

    // Tạo entry mới
    const newEntry = new Leaderboard({
      playerName,
      scores,
      totalScore,
      gameRounds,
      completedAt: completedAt ? new Date(completedAt) : new Date(),
      openAnswers: openAnswers || [],
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
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const leaderboard = await Leaderboard.find()
      .sort({ totalScore: -1, completedAt: 1 })
      .limit(limit)
      .skip(skip)
      .select("-__v");

    const total = await Leaderboard.countDocuments();

    res.json({
      success: true,
      data: leaderboard,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy dữ liệu",
    });
  }
};
