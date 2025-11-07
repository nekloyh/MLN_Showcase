import {
  ArrowRight,
  CheckCircle,
  Globe,
  HeartHandshake,
  RotateCcw,
  Send,
  Shield,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Scenario, getRandomScenarios } from "../content/situations.ts";
import { LeaderboardSubmission, submitToLeaderboard } from "../services/leaderboardService";
import GameIntro from "./GameIntro";
import LeaderboardModal from "./LeaderboardModal";

// --- 1. INTERFACE & TYPES ---

interface PlayerStats {
  CT: number; // Ổn định Chính trị
  KT: number; // Tăng trưởng Kinh tế
  CB: number; // Công bằng Xã hội
  NG: number; // Ngoại giao
}

interface GameState {
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

const MAX_STAT = 100; // Resetting MAX_STAT to 100 as per the initial refactoring, assuming the user wants a wider range.
const MIN_STAT = 0;
const INITIAL_STATS: PlayerStats = {
  CT: 65,
  KT: 65,
  CB: 65,
  NG: 65,
};
const TOTAL_ROUNDS = 16;

// --- 3. HELPER FUNCTIONS ---

// Helper function to map stat key to image prefix
const getStatPrefix = (statKey: keyof PlayerStats): string => {
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

// Helper function to map score to image level (0, 25, 50, 75, 100)
const getStatImageLevel = (score: number): number => {
  // Ngưỡng điểm: 0, 20, 40, 60, 80, 100 (tương ứng với file 0, 25, 50, 75, 100)
  if (score <= 20) return 0;
  if (score <= 40) return 25;
  if (score <= 60) return 50;
  if (score <= 80) return 75;
  return 100;
};

// Helper function to get the full image path
const getStatImagePath = (
  statKey: keyof PlayerStats,
  score: number
): string => {
  const prefix = getStatPrefix(statKey);
  const level = getStatImageLevel(score);
  return `/images/${prefix}_${level}.png`;
};

// Helper function to get the stat display name
const getStatDisplayName = (statKey: keyof PlayerStats): string => {
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

const getIcon = (iconName: "CT" | "KT" | "CB" | "NG") => {
  switch (iconName) {
    case "CT":
      return <Shield className="w-12 h-12 text-blue-600" />;
    case "KT":
      return <TrendingUp className="w-12 h-12 text-green-600" />;
    case "CB":
      return <HeartHandshake className="w-12 h-12 text-red-600" />;
    case "NG":
      return <Globe className="w-12 h-12 text-yellow-600" />;
    default:
      return <Shield className="w-12 h-12 text-gray-500" />;
  }
};

const getStatColor = (value: number) => {
  if (value >= 80) return "text-green-500";
  if (value >= 60) return "text-green-400";
  if (value >= 40) return "text-yellow-500";
  if (value >= 20) return "text-orange-500";
  return "text-red-500";
};

const getPerformanceLevel = (stats: PlayerStats) => {
  const totalScore = stats.CT + stats.KT + stats.CB + stats.NG;
  const avg = totalScore / 4;
  
  // Tổng điểm tối đa: 400 (4 chỉ số x 100)
  // Điểm trung bình mỗi chỉ số: 0-100
  
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

// --- 4. MAIN COMPONENT ---

function DecisionGame() {
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
    currentYear,
    currentQuarter,
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
    showLeaderboardModal,
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

  useEffect(() => {
    if (currentRound === 0) {
      handleStartGame();
    }
  }, [currentRound, handleStartGame]);

  const handleChoiceSelect = (index: number) => {
    if (showResult) return;
    setGameState((prev) => ({ ...prev, selectedChoiceIndex: index }));
  };

  // ========================================
  // MULTIPLIER dựa vào trạng thái hiện tại
  // ========================================
  const getImpactMultiplier = (currentScore: number, impact: number): number => {
    // Nguy hiểm cực độ (< 15)
    if (currentScore < 15) {
      // Nếu impact tiêu cực → nhân 2.0 (khủng hoảng sâu)
      // Nếu impact tích cực → nhân 1.5 (khó cải thiện khi đang suy sụp)
      return impact < 0 ? 2.0 : 1.5;
    }
    
    // Khủng hoảng (< 30)
    if (currentScore < 30) {
      // Impact tiêu cực → nhân 1.5 (tình hình xấu thêm)
      // Impact tích cực → nhân 1.2 (khó cải thiện)
      return impact < 0 ? 1.5 : 1.2;
    }
    
    // Bình thường (30-80)
    if (currentScore >= 30 && currentScore <= 80) {
      return 1.0;  // Không thay đổi
    }
    
    // Phát triển tốt (> 80)
    if (currentScore > 80) {
      // Impact tích cực → nhân 1.3 (phát huy thế mạnh)
      // Impact tiêu cực → nhân 0.8 (đệm chống sốc tốt)
      return impact > 0 ? 1.3 : 0.8;
    }
    
    return 1.0;
  };

  const handleSubmitChoice = () => {
    if (selectedChoiceIndex === null) return;

    const choice = scenarios[currentScenarioIndex].choices[selectedChoiceIndex];
    
    // Apply multiplier cho từng chỉ số dựa vào trạng thái hiện tại
    const ctMultiplier = getImpactMultiplier(stats.CT, choice.impact.CT);
    const ktMultiplier = getImpactMultiplier(stats.KT, choice.impact.KT);
    const cbMultiplier = getImpactMultiplier(stats.CB, choice.impact.CB);
    const ngMultiplier = getImpactMultiplier(stats.NG, choice.impact.NG);
    
    const newStats = {
      CT: Math.max(MIN_STAT, Math.min(MAX_STAT, stats.CT + Math.round(choice.impact.CT * ctMultiplier))),
      KT: Math.max(MIN_STAT, Math.min(MAX_STAT, stats.KT + Math.round(choice.impact.KT * ktMultiplier))),
      CB: Math.max(MIN_STAT, Math.min(MAX_STAT, stats.CB + Math.round(choice.impact.CB * cbMultiplier))),
      NG: Math.max(MIN_STAT, Math.min(MAX_STAT, stats.NG + Math.round(choice.impact.NG * ngMultiplier))),
    };

    setGameState((prev) => ({
      ...prev,
      stats: newStats,
      showResult: true,
    }));
  };

  const handleNextScenario = () => {
    const nextRound = currentRound + 1;
    const nextQuarter = (currentQuarter % 4) + 1;
    const nextYear = currentYear + (currentQuarter === 4 ? 1 : 0);

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

  // Hàm gửi dữ liệu lên leaderboard
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
        }));

        const rankInfo = response.data 
          ? `\n\nHạng: ${response.data.rank} / ${response.data.totalPlayers} người chơi` 
          : '';
        alert(`Đã gửi thành công!\n${response.message}${rankInfo}`);
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

  // Hàm cập nhật tên người chơi
  const handlePlayerNameChange = (name: string) => {
    setGameState((prev) => ({
      ...prev,
      playerName: name,
    }));
  };

  const currentScenario = scenarios[currentScenarioIndex];
  const result =
    selectedChoiceIndex !== null
      ? currentScenario.choices[selectedChoiceIndex]
      : null;
  const performance = getPerformanceLevel(stats);

  // --- 5. RENDER COMPONENTS ---

  // New render function using images
  const renderStatImage = (statKey: keyof PlayerStats, value: number) => {
    const imagePath = getStatImagePath(statKey, value);
    const displayName = getStatDisplayName(statKey);
    const color = getStatColor(value); // Keep color for score text

    return (
      <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
        <div className="text-sm font-bold text-gray-700 mb-1">
          {displayName}
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner">
          <img
            src={imagePath}
            alt={`${displayName} Level ${value}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`text-sm mt-1 font-semibold ${color}`}>
          {value} / {MAX_STAT}
        </div>
      </div>
    );
  };

  const renderImpact = (impact: PlayerStats) => (
    <div className="mt-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 shadow-inner border border-gray-200">
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(impact).map(([key, value]) => (
          <div
            key={key}
            className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 cursor-default
              ${
                value > 0
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                  : value < 0
                  ? "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200"
                  : "bg-white border border-gray-200"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold
                ${value > 0 ? "bg-green-200 text-green-800" : value < 0 ? "bg-red-200 text-red-800" : "bg-gray-200 text-gray-600"}
              `}>
                {getStatDisplayName(key as keyof PlayerStats).charAt(0)}
              </span>
              <span className="font-semibold text-sm text-gray-700">
                {getStatDisplayName(key as keyof PlayerStats)}
              </span>
            </div>
            <span
              className={`font-bold text-lg ${
                value > 0
                  ? "text-green-600"
                  : value < 0
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {value > 0 ? `+${value}` : value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGameScreen = () => {
    if (gameFinished) {
      const totalScore = stats.CT + stats.KT + stats.CB + stats.NG;
      
      return (
        <div className="text-center p-8 bg-white rounded-xl shadow-2xl">
          <Trophy className={`w-20 h-20 mx-auto mb-4 ${performance.color}`} />
          <h2 className={`text-3xl font-extrabold mb-2 ${performance.color}`}>
            {performance.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {performance.description}
          </p>

          {/* Stats Display */}
          <div className="grid grid-cols-4 gap-4 text-left mb-6">
            {renderStatImage("CT", stats.CT)}
            {renderStatImage("KT", stats.KT)}
            {renderStatImage("CB", stats.CB)}
            {renderStatImage("NG", stats.NG)}
          </div>

          {/* Total Score */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Tổng điểm</p>
            <p className="text-4xl font-extrabold text-blue-600">{totalScore}</p>
            <p className="text-xs text-gray-500 mt-1">Số vòng hoàn thành: {currentRound - 1}/16</p>
          </div>

          {/* Leaderboard Section */}
          {!leaderboardSubmitted ? (
            <div className="mb-6 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2" />
                Gửi kết quả lên Bảng xếp hạng
              </h3>
              
              {/* Input tên người chơi */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên của bạn (tùy chọn)
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => handlePlayerNameChange(e.target.value)}
                  placeholder="Nhập tên hoặc để trống..."
                  maxLength={30}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              {/* Nút gửi */}
              <button
                onClick={handleSubmitLeaderboard}
                disabled={leaderboardStatus === 'sending'}
                className={`w-full flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-lg transition duration-300 shadow-lg
                  ${leaderboardStatus === 'sending' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                  }
                `}
              >
                {leaderboardStatus === 'sending' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Gửi lên Bảng xếp hạng
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-3">
                Dữ liệu sẽ được gửi lên server để so sánh với người chơi khác
              </p>
            </div>
          ) : (
            <div className="mb-6 p-6 bg-green-50 border-2 border-green-300 rounded-lg">
              <div className="flex items-center justify-center text-green-700 mb-2">
                <CheckCircle className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-bold">Đã gửi thành công!</h3>
              </div>
              <p className="text-sm text-green-600">
                Kết quả của bạn đã được lưu vào bảng xếp hạng
              </p>
              <button
                onClick={() => setGameState(prev => ({ ...prev, showLeaderboardModal: true }))}
                className="mt-4 w-full px-4 py-2 text-base font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Xem Bảng xếp hạng
              </button>
            </div>
          )}

          {/* Nút chơi lại */}
          <button
            onClick={handleStartGame}
            className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" /> Chơi Lại
          </button>
        </div>
      );
    }

    if (!currentScenario)
      return (
        <div className="text-center text-xl p-10">Đang tải tình huống...</div>
      );

    return (
      <div className="flex flex-col h-full">
        {/* Header - Progress & Stats */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200 rounded-t-xl shadow-sm">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-gray-800">
                Năm {currentYear} - Quý {currentQuarter}
              </h3>
              <div className="text-base font-semibold text-blue-700 bg-white px-4 py-1.5 rounded-full shadow-sm">
                Vòng {currentRound} / {TOTAL_ROUNDS}
              </div>
            </div>
            {/* Linear Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentRound / TOTAL_ROUNDS) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Stats Cards with hover effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {renderStatImage("CT", stats.CT)}
            {renderStatImage("KT", stats.KT)}
            {renderStatImage("CB", stats.CB)}
            {renderStatImage("NG", stats.NG)}
          </div>
        </div>

        {/* Scenario Content */}
        <div className="p-6 flex-grow overflow-y-auto">
          {/* Category Badge & Title */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-md">
                {getIcon(currentScenario.category)}
              </div>
              <div>
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 rounded-full mb-2">
                  {currentScenario.category} • Tình huống {currentScenario.id}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                  {currentScenario.title}
                </h1>
              </div>
            </div>
          </div>
          
          {/* Description Box */}
          <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg shadow-md">
            <p className="text-lg text-gray-800 leading-relaxed">
              {currentScenario.description}
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-4 mb-6">
            {currentScenario.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoiceSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-5 border-2 rounded-xl transition-all duration-200 transform
                  ${
                    selectedChoiceIndex === index
                      ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg scale-[1.02] ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md hover:scale-[1.01]"
                  }
                  ${
                    showResult && selectedChoiceIndex !== index
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }
                  ${!showResult ? "cursor-pointer" : ""}
                `}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
                    ${selectedChoiceIndex === index 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-800 leading-relaxed font-medium flex-1">
                    {choice.text}
                  </span>
                  {selectedChoiceIndex === index && (
                    <CheckCircle className="flex-shrink-0 w-6 h-6 text-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end">
            {!showResult && (
              <button
                onClick={handleSubmitChoice}
                disabled={selectedChoiceIndex === null}
                className={`group flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg
                  ${
                    selectedChoiceIndex !== null
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl hover:scale-105 active:scale-95"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                <Send className="w-6 h-6" />
                Ra Quyết Định 
                <ArrowRight className={`w-6 h-6 transition-transform ${selectedChoiceIndex !== null ? 'group-hover:translate-x-1' : ''}`} />
                {selectedChoiceIndex !== null && (
                  <span className="text-xs font-normal opacity-75">(Enter)</span>
                )}
              </button>
            )}
          </div>

          {/* Result Display */}
          {showResult && result && (
            <div className="mt-6 p-6 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-400 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-blue-200">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Kết Quả Quyết Định
                </h3>
              </div>
              
              <div className="mb-5 p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                <p className="text-gray-600 text-sm mb-1">Bạn đã chọn:</p>
                <p className="text-gray-900 font-bold text-lg">"{result.text}"</p>
              </div>
              
              {/* Explanation Section */}
              {result.explanation && (
                <div className="mb-4 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
                  <p className="text-base font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">💡</span> Giải thích:
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              )}
              
              {/* Historical Example Section */}
              {(result as any).historicalExample && (
                <div className="mb-4 p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-lg shadow-sm">
                  <p className="text-base font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">📚</span> Ví dụ lịch sử:
                  </p>
                  <p className="text-gray-700 leading-relaxed italic">
                    {(result as any).historicalExample}
                  </p>
                </div>
              )}
              
              <div className="mb-3">
                <p className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Ảnh hưởng đến Quốc gia:
                </p>
              </div>
              {renderImpact(result.impact)}
              
              <button
                onClick={handleNextScenario}
                className="group mt-8 flex items-center gap-3 ml-auto px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                Tiếp Tục 
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- 6. MAIN RENDER ---

  return (
    <div
  className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/images/BackgroundGame.png')" }}
>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden min-h-[600px] mt-20">
        {showIntro ? (
          <GameIntro onStart={handleStartGame} />
        ) : currentRound === 0 ? (
          <div className="text-center p-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Trò Chơi Lãnh Đạo Quốc Gia
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Bạn sẽ lãnh đạo đất nước trong 4 năm (16 quý) và đối mặt với các
              tình huống chính trị, kinh tế, xã hội và ngoại giao.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-blue-100 rounded-lg">
                <h3 className="font-bold text-blue-800">Mục tiêu</h3>
                <p className="text-sm text-blue-700">
                  Duy trì 4 chỉ số trên 0 và đạt điểm trung bình cao nhất sau 16
                  vòng.
                </p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg">
                <h3 className="font-bold text-green-800">Chỉ số</h3>
                <ul className="text-sm text-green-700 list-disc list-inside text-left">
                  <li>CT: Ổn định Chính trị</li>
                  <li>KT: Tăng trưởng Kinh tế</li>
                  <li>CB: Công bằng Xã hội</li>
                  <li>NG: Ngoại giao</li>
                </ul>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              className="flex items-center justify-center mx-auto px-8 py-4 text-xl font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 shadow-xl"
            >
              Bắt Đầu Lãnh Đạo <ArrowRight className="w-6 h-6 ml-2" />
            </button>
          </div>
        ) : (
          renderGameScreen()
        )}
      </div>
      
      {/* Leaderboard Modal */}
      <LeaderboardModal 
        isOpen={showLeaderboardModal} 
        onClose={() => setGameState(prev => ({ ...prev, showLeaderboardModal: false }))} 
      />
    </div>
  );
}

export default DecisionGame;
