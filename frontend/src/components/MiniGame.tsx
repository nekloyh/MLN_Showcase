import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  TrendingUp,
  HeartHandshake,
  Globe,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  Trophy,
  Send,
  CheckCircle,
} from "lucide-react";
import { Scenario, getRandomScenarios } from "../content/situations"; // Import Scenario interface and data function
import { submitToLeaderboard, LeaderboardSubmission } from "../services/leaderboardService";

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
  playerName: string; // Tên người chơi
  gameStartTime: number; // Thời gian bắt đầu (timestamp)
  gameEndTime: number | null; // Thời gian kết thúc (timestamp)
  leaderboardSubmitted: boolean; // Đã gửi leaderboard chưa
  leaderboardStatus: 'idle' | 'sending' | 'success' | 'error'; // Trạng thái gửi
}

// --- 2. CONSTANTS ---

const MAX_STAT = 100; // Resetting MAX_STAT to 100 as per the initial refactoring, assuming the user wants a wider range.
const MIN_STAT = 0;
const INITIAL_STATS: PlayerStats = {
  CT: 50,
  KT: 50,
  CB: 50,
  NG: 50,
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
  return `/assets/images/stats/${prefix}_${level}.png`;
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
  if (value >= 150) return "text-green-500";
  if (value >= 100) return "text-green-400";
  if (value >= 50) return "text-yellow-500";
  return "text-red-500";
};

const getPerformanceLevel = (stats: PlayerStats) => {
  const avg = (stats.CT + stats.KT + stats.CB + stats.NG) / 4;
  if (avg >= 150)
    return {
      title: "Thiên Tài Lãnh Đạo",
      description:
        "Đất nước thịnh vượng, dân giàu nước mạnh, uy tín quốc tế cao.",
      color: "text-green-600",
    };
  if (avg >= 100)
    return {
      title: "Lãnh Đạo Xuất Sắc",
      description: "Đất nước phát triển ổn định, vượt qua mọi thử thách.",
      color: "text-blue-600",
    };
  if (avg >= 50)
    return {
      title: "Lãnh Đạo Trung Bình",
      description: "Đất nước duy trì được sự ổn định, cần cải thiện nhiều mặt.",
      color: "text-yellow-600",
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

    // Lấy tên người chơi (có thể prompt hoặc dùng default)
    const name = playerName.trim() || "Người chơi ẩn danh";

    // Tính tổng điểm
    const totalScore = stats.CT + stats.KT + stats.CB + stats.NG;

    // Chuẩn bị dữ liệu gửi
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
      gameRounds: currentRound - 1, // Số vòng thực tế đã chơi
      openAnswers: [], // Sẽ thêm ở Phase 3
    };

    // Cập nhật trạng thái đang gửi
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

        // Hiển thị thông báo thành công
        alert(`✅ ${response.message}\n\n${response.data ? `Hạng: ${response.data.rank} / ${response.data.totalPlayers} người chơi` : ''}`);
      } else {
        throw new Error(response.message || 'Gửi thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi gửi leaderboard:', error);
      setGameState((prev) => ({
        ...prev,
        leaderboardStatus: 'error',
      }));
      alert('❌ Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại!');
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
    <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      {Object.entries(impact).map(([key, value]) => (
        <div
          key={key}
          className={`flex items-center justify-between p-1 rounded-md ${
            value > 0
              ? "bg-green-100"
              : value < 0
              ? "bg-red-100"
              : "bg-gray-100"
          }`}
        >
          <span className="font-semibold text-sm">{key}</span>
          <span
            className={`font-bold text-sm ${
              value > 0
                ? "text-green-600"
                : value < 0
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {value > 0 ? `+${value}` : value}
          </span>
        </div>
      ))}
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
                💡 Dữ liệu sẽ được gửi lên server để so sánh với người chơi khác
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
        <div className="p-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-800">
              Năm {currentYear} - Quý {currentQuarter}
            </h3>
            <div className="text-lg font-semibold text-blue-600">
              Vòng {currentRound} / {TOTAL_ROUNDS}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {renderStatImage("CT", stats.CT)}
            {renderStatImage("KT", stats.KT)}
            {renderStatImage("CB", stats.CB)}
            {renderStatImage("NG", stats.NG)}
          </div>
        </div>

        {/* Scenario Content */}
        <div className="p-6 flex-grow overflow-y-auto">
          <div className="flex items-center mb-4">
            {getIcon(currentScenario.category)}
            <div className="ml-4">
              <p className="text-sm font-semibold text-gray-500">
                {currentScenario.category} - Tình huống {currentScenario.id}
              </p>
              <h1 className="text-2xl font-extrabold text-gray-900">
                {currentScenario.title}
              </h1>
            </div>
          </div>
          <p className="text-lg text-gray-700 mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg shadow-sm">
            {currentScenario.description}
          </p>

          {/* Choices */}
          <div className="space-y-3">
            {currentScenario.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoiceSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 border-2 rounded-lg transition duration-200
                  ${
                    selectedChoiceIndex === index
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }
                  ${
                    showResult && selectedChoiceIndex !== index
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                `}
              >
                <span className="font-semibold text-gray-800">
                  Lựa chọn {String.fromCharCode(65 + index)}:
                </span>{" "}
                {choice.text}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            {!showResult && (
              <button
                onClick={handleSubmitChoice}
                disabled={selectedChoiceIndex === null}
                className={`flex items-center px-6 py-3 text-lg font-semibold text-white rounded-lg transition duration-300 shadow-md
                  ${
                    selectedChoiceIndex !== null
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Ra Quyết Định <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>

          {/* Result Display */}
          {showResult && result && (
            <div className="mt-8 p-6 bg-white border-t-4 border-blue-500 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" /> Kết Quả Quyết Định
              </h3>
              <p className="text-gray-700 mb-4">
                Bạn đã chọn:{" "}
                <span className="font-semibold">"{result.text}"</span>
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Ảnh hưởng đến Quốc gia:
              </p>
              {renderImpact(result.impact)}
              <button
                onClick={handleNextScenario}
                className="mt-6 flex items-center ml-auto px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                Tiếp Tục <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- 6. MAIN RENDER ---

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden min-h-[600px]">
        {currentRound === 0 ? (
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
    </div>
  );
}

export default DecisionGame;
