import express from "express";
import {
  submitScore,
  getLeaderboard,
} from "../controllers/leaderboardController";

const router = express.Router();

router.post("/submit", submitScore);
router.get("/top", getLeaderboard);

export default router;
