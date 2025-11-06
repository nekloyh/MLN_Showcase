import { useCallback, useEffect, useState } from "react";
import { Scenario, getRandomScenarios } from "../data/situations";
import { LeaderboardSubmission, submitToLeaderboard } from "../services/leaderboardService";

// --- 1. INTERFACE & TYPES ---

export interface PlayerStats {
  CT: number; // Ổn định Chính trị
  KT: number; // Tăng trưởng Kinh tế
  CB: number; // Công bằng Xã hội
  NG: number; // Ngoại giao
}

export interface GameState {
  currentRound: number; // 1 to 16
  currentYear: number; // 1 to 4
  currentQuarter: number; // 1 to 4
  stats: PlayerStats;
  scenarios: Scenario[];
  currentScenarioIndex: number;
  selectedChoiceIndex: number | null;
  showResult: boolean;
  gameFinished: boolean;
  playerName: string;
  gameStartTime: number;
  gameEndTime: number | null;
  leaderboardSubmitted: boolean;
  leaderboardStatus: 'idle' | 'sending' | 'success' | 'error';
  showIntro: boolean;
  showLeaderboardModal: boolean;
}

// --- 2. CONSTANTS ---

const MAX_STAT = 100;
const MIN_STAT = 0;
const INITIAL_STATS: PlayerStats = {
  CT: 50,
  KT: 50,
  CB: 50,
  NG: 50,
};
const TOTAL_ROUNDS = 16;

// --- 3. CUSTOM HOOK ---

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 0,
    currentYear: 0,
    currentQuarter: 0,
    stats: INITIAL_STATS,
    scenarios: [],
    currentScenarioIndex: 0,
    selectedChoiceIndex: null,
    showResult: false,
    gameFinished: false,
    playerName: "",
    gameStartTime: 0,
    gameEndTime: null,
    leaderboardSubmitted: false,
    leaderboardStatus: 'idle',
    showIntro: true,
    showLeaderboardModal: false,
  });

  const {
    currentRound,
    stats,
    scenarios,
    currentScenarioIndex,
    selectedChoiceIndex,
    showResult,
    gameFinished,
    playerName,
    leaderboardSubmitted,
    leaderboardStatus,
    showIntro,
  } = gameState;

  const handleStartGame = useCallback(() => {
    const newScenarios = getRandomScenarios(TOTAL_ROUNDS);
    setGameState({
      currentRound: 1,
      currentYear: 1,
      currentQuarter: 1,
      stats: INITIAL_STATS,
      scenarios: newScenarios,
      currentScenarioIndex: 0,
      selectedChoiceIndex: null,
      showResult: false,
      gameFinished: false,
      playerName: "",
      gameStartTime: Date.now(),
      gameEndTime: null,
      leaderboardSubmitted: false,
      leaderboardStatus: 'idle',
      showIntro: false,
      showLeaderboardModal: false,
    });
  }, []);

  const handleChoiceSelect = (index: number) => {
    if (showResult) return;
    setGameState((prev) => ({ ...prev, selectedChoiceIndex: index }));
  };

  const handleSubmitChoice = () => {
    if (selectedChoiceIndex === null) return;

    const choice = scenarios[currentScenarioIndex].choices[selectedChoiceIndex];
    const newStats = {
      CT: Math.max(MIN_STAT, Math.min(MAX_STAT, stats.CT + choice.impact.CT)),
      KT: Math.max(MIN_STAT, Math.min(MAX_STAT, stats.KT + choice.impact.KT)),
      CB: Math.max(MIN_STAT, Math.min(MAX_STAT, stats.CB + choice.impact.CB)),
      NG: Math.max(MIN_STAT, Math.min(MAX_STAT, stats.NG + choice.impact.NG)),
    };

    setGameState((prev) => ({
      ...prev,
      stats: newStats,
      showResult: true,
    }));
  };

  const handleNextScenario = () => {
    const nextRound = currentRound + 1;
    const nextQuarter = (gameState.currentQuarter % 4) + 1;
    const nextYear = gameState.currentYear + (gameState.currentQuarter === 4 ? 1 : 0);

    if (
      stats.CT <= MIN_STAT ||
      stats.KT <= MIN_STAT ||
      stats.CB <= MIN_STAT ||
      stats.NG <= MIN_STAT
    ) {
      setGameState((prev) => ({ 
        ...prev, 
        gameFinished: true,
        gameEndTime: Date.now() 
      }));
      return;
    }

    if (nextRound > TOTAL_ROUNDS) {
      setGameState((prev) => ({ 
        ...prev, 
        gameFinished: true,
        gameEndTime: Date.now() 
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentRound: nextRound,
        currentYear: nextYear,
        currentQuarter: nextQuarter,
        currentScenarioIndex: prev.currentScenarioIndex + 1,
        selectedChoiceIndex: null,
        showResult: false,
      }));
    }
  };

  const handleSubmitLeaderboard = async () => {
    if (leaderboardSubmitted) return;

    const name = playerName.trim() || "Người chơi ẩn danh";
    const totalScore = stats.CT + stats.KT + stats.CB + stats.NG;

    const submissionData: LeaderboardSubmission = {
      playerName: name,
      scores: {
        politics: stats.CT,
        economy: stats.KT,
        society: stats.CB,
        diplomacy: stats.NG,
      },
      totalScore: totalScore,
      completedAt: new Date().toISOString(),
      gameRounds: currentRound - 1,
      openAnswers: [],
    };

    setGameState((prev) => ({
      ...prev,
      leaderboardStatus: 'sending',
    }));

    try {
      const response = await submitToLeaderboard(submissionData);
      
      if (response.success) {
        setGameState((prev) => ({
          ...prev,
          leaderboardSubmitted: true,
          leaderboardStatus: 'success',
          showLeaderboardModal: true, // Show leaderboard on success
        }));

      } else {
        throw new Error(response.message || 'Gửi thất bại');
      }
    } catch (error) {
      setGameState((prev) => ({
        ...prev,
        leaderboardStatus: 'error',
      }));
      
      const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
      alert(`Có lỗi xảy ra khi gửi dữ liệu.\n\nChi tiết: ${errorMessage}\n\nVui lòng thử lại!`);
    }
  };

  const handlePlayerNameChange = (name: string) => {
    setGameState((prev) => ({
      ...prev,
      playerName: name,
    }));
  };

  const handleShowLeaderboardModal = (show: boolean) => {
    setGameState((prev) => ({
      ...prev,
      showLeaderboardModal: show,
    }));
  };

  const handleRestartGame = () => {
    setGameState((prev) => ({
      ...prev,
      currentRound: 0,
      currentYear: 0,
      currentQuarter: 0,
      stats: INITIAL_STATS,
      scenarios: [],
      currentScenarioIndex: 0,
      selectedChoiceIndex: null,
      showResult: false,
      gameFinished: false,
      playerName: "",
      gameStartTime: 0,
      gameEndTime: null,
      leaderboardSubmitted: false,
      leaderboardStatus: 'idle',
      showIntro: true,
      showLeaderboardModal: false,
    }));
  };

  useEffect(() => {
    if (currentRound === 0 && !showIntro) {
      handleStartGame();
    }
  }, [currentRound, showIntro, handleStartGame]);

  return {
    gameState,
    currentScenario: scenarios[currentScenarioIndex],
    handleStartGame,
    handleChoiceSelect,
    handleSubmitChoice,
    handleNextScenario,
    handleSubmitLeaderboard,
    handlePlayerNameChange,
    handleShowLeaderboardModal,
    handleRestartGame,
    TOTAL_ROUNDS,
    INITIAL_STATS,
  };
};

// --- 4. HELPER FUNCTIONS (Moved from MiniGame.tsx) ---

export const getStatPrefix = (statKey: keyof PlayerStats): string => {
  switch (statKey) {
    case "CT":
      return "politics";
    case "KT":
      return "economy";
    case "CB":
      return "society";
    case "NG":
      return "diplomacy";
    default:
      return "politics";
  }
};

export const getStatImageLevel = (score: number): number => {
  if (score <= 20) return 0;
  if (score <= 40) return 25;
  if (score <= 60) return 50;
  if (score <= 80) return 75;
  return 100;
};

export const getStatImagePath = (
  statKey: keyof PlayerStats,
  score: number
): string => {
  const prefix = getStatPrefix(statKey);
  const level = getStatImageLevel(score);
  return `/images/${prefix}_${level}.png`; 
};

export const getStatDisplayName = (statKey: keyof PlayerStats): string => {
  switch (statKey) {
    case "CT":
      return "Chính trị";
    case "KT":
      return "Kinh tế";
    case "CB":
      return "Xã hội";
    case "NG":
      return "Ngoại giao";
    default:
      return "";
  }
};

export const getPerformanceLevel = (stats: PlayerStats) => {
  const totalScore = stats.CT + stats.KT + stats.CB + stats.NG;
  const avg = totalScore / 4;
  
  if (avg >= 80)
    return {
      title: "Thiên Tài Lãnh Đạo",
      description:
        "Đất nước thịnh vượng, dân giàu nước mạnh, uy tín quốc tế cao.",
      color: "text-green-600",
    };
  if (avg >= 65)
    return {
      title: "Lãnh Đạo Xuất Sắc",
      description: "Đất nước phát triển ổn định, vượt qua mọi thử thách.",
      color: "text-blue-600",
    };
  if (avg >= 45)
    return {
      title: "Lãnh Đạo Trung Bình",
      description: "Đất nước duy trì được sự ổn định, cần cải thiện nhiều mặt.",
      color: "text-yellow-600",
    };
  if (avg >= 25)
    return {
      title: "Lãnh Đạo Yếu Kém",
      description: "Đất nước gặp nhiều khó khăn, cần thay đổi chiến lược.",
      color: "text-orange-600",
    };
  return {
    title: "Thất Bại Thảm Hại",
    description: "Đất nước rơi vào khủng hoảng, cần phải bắt đầu lại.",
    color: "text-red-600",
  };
};
