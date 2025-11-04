import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboard extends Document {
  playerName: string;
  scores: {
    politics: number;
    economy: number;
    society: number;
    diplomacy: number;
  };
  totalScore: number;
  gameRounds: number;
  completedAt: Date;
  openAnswers?: string[];
}

const LeaderboardSchema: Schema = new Schema(
  {
    playerName: { type: String, required: true, maxLength: 100 },
    scores: {
      politics: { type: Number, required: true, min: 0, max: 100 },
      economy: { type: Number, required: true, min: 0, max: 100 },
      society: { type: Number, required: true, min: 0, max: 100 },
      diplomacy: { type: Number, required: true, min: 0, max: 100 },
    },
    totalScore: { type: Number, required: true },
    gameRounds: { type: Number, required: true },
    openAnswers: [{ type: String }],
    completedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index
LeaderboardSchema.index({ totalScore: -1 });
LeaderboardSchema.index({ completedAt: -1 });

export default mongoose.model<ILeaderboard>("Leaderboard", LeaderboardSchema);
