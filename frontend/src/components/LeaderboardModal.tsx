// components/LeaderboardModal.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from './ui/modal';

interface LeaderboardEntry {
  rank: number;
  playerName: string;
  totalScore: number;
}

interface LeaderboardAPIResponse {
  success: boolean;
  message?: string;
  data: LeaderboardEntry[];
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<LeaderboardAPIResponse>(`${API_URL}/api/leaderboard/top`);
        if (response.data.success) {
          setLeaderboardData(response.data.data);
        } else {
          setError(response.data.message || 'Lỗi tải dữ liệu');
        }
      } catch (err) {
        console.error(err);
        setError('Không thể kết nối đến server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bảng Xếp Hạng">
      <div className="space-y-4">
        <p className="text-center text-gray-600 mb-4">Top 10 người chơi xuất sắc nhất</p>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-marx-red"></div>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-6 text-red-600 bg-red-50 rounded-lg p-4">
            <strong>Lỗi:</strong> {error}
          </div>
        )}

        {!isLoading && !error && leaderboardData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Chưa có người chơi nào
          </div>
        )}

        {!isLoading && !error && leaderboardData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-marx-red to-marx-red-hover text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold">Hạng</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Tên</th>
                  <th className="px-6 py-4 text-right text-sm font-bold">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, i) => (
                  <tr
                    key={entry.rank}
                    className={`border-b border-gray-200 transition-all hover:bg-lenin-yellow-light/20 ${
                      i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                          entry.rank === 1 ? 'bg-lenin-yellow text-marx-red' :
                          entry.rank === 2 ? 'bg-gray-400' :
                          entry.rank === 3 ? 'bg-orange-600' :
                          'bg-gray-300 text-gray-700'
                        }`}
                      >
                        {entry.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {entry.playerName}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xl font-bold text-marx-red">
                        {entry.totalScore.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center text-xs text-gray-500 mt-6">
          Dữ liệu cập nhật theo thời gian thực
        </div>
      </div>
    </Modal>
  );
}