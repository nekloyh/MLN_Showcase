import {
  AlertCircle,
  RotateCcw,
  Send,
  Trophy,
  CheckCircle,
} from "lucide-react";
import {
  PlayerStats,
  getPerformanceLevel,
  getStatDisplayName,
  getStatImagePath,
} from "../../hooks/useGame";
import { Button } from "../ui/button";

interface GameResultsProps {
  stats: PlayerStats;
  playerName: string;
  leaderboardSubmitted: boolean;
  leaderboardStatus: "idle" | "sending" | "success" | "error";
  handlePlayerNameChange: (name: string) => void;
  handleSubmitLeaderboard: () => void;
  handleShowLeaderboardModal: (show: boolean) => void;
  handleRestartGame: () => void;
}

const GameResults = ({
  stats,
  playerName,
  leaderboardSubmitted,
  leaderboardStatus,
  handlePlayerNameChange,
  handleSubmitLeaderboard,
  handleShowLeaderboardModal,
  handleRestartGame,
}: GameResultsProps) => {
  const performance = getPerformanceLevel(stats);
  const totalScore = stats.CT + stats.KT + stats.CB + stats.NG;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-yellow-400">
        KẾT THÚC TRÒ CHƠI
      </h2>

      {/* Performance Summary */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${performance.color}`} />
        <h3 className={`text-2xl font-bold ${performance.color}`}>
          {performance.title}
        </h3>
        <p className="text-gray-300 mt-2">{performance.description}</p>
        <p className="text-xl font-bold text-white mt-4">
          Tổng điểm: {totalScore}
        </p>
      </div>

      {/* Final Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.keys(stats) as Array<keyof PlayerStats>).map((key) => (
          <div
            key={key}
            className="bg-gray-800/50 p-4 rounded-lg shadow-lg text-center"
          >
            <img
              src={getStatImagePath(key, stats[key])}
              alt={`Ảnh minh họa chỉ số ${getStatDisplayName(key)}`}
              className="w-16 h-16 mx-auto mb-2"
            />
            <div className="text-sm font-bold text-gray-400">
              {getStatDisplayName(key)}
            </div>
            <div className="text-xl font-bold text-white">{stats[key]}</div>
          </div>
        ))}
      </div>

      {/* Leaderboard Submission */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl space-y-4">
        <h3 className="text-xl font-bold text-yellow-400">
          Gửi điểm lên Bảng xếp hạng
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Nhập tên của bạn (tối đa 50 ký tự)"
            value={playerName}
            onChange={(e) =>
              handlePlayerNameChange(e.target.value.slice(0, 50))
            }
            className="flex-grow p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            disabled={leaderboardSubmitted || leaderboardStatus === "sending"}
          />
          <Button
            onClick={handleSubmitLeaderboard}
            disabled={leaderboardSubmitted || leaderboardStatus === "sending"}
            className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"
          >
            {leaderboardStatus === "sending" ? (
              "Đang gửi..."
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Gửi điểm
              </>
            )}
          </Button>
        </div>
        {leaderboardStatus === "success" && (
          <div className="text-green-400 font-medium flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Điểm đã được gửi thành công!
            <Button
              variant="link"
              className="ml-2 text-yellow-400 hover:text-yellow-300"
              onClick={() => handleShowLeaderboardModal(true)}
            >
              Xem Bảng xếp hạng
            </Button>
          </div>
        )}
        {leaderboardStatus === "error" && (
          <div className="text-red-400 font-medium flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Gửi điểm thất bại. Vui lòng thử lại.
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-center">
        <Button
          onClick={handleRestartGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Chơi lại
        </Button>
      </div>
    </div>
  );
};

export default GameResults;
