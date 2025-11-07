import express from "express";
import {
  submitScore,
  getLeaderboard,
} from "../controllers/leaderboardController.js";

const router = express.Router();

router.post("/submit", submitScore);
router.get("/top", getLeaderboard);

export default router;
