import { useState, useEffect } from 'react';
import Modal from './ui/modal';
import axios from 'axios';

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
    if (isOpen) {
      const fetchLeaderboard = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get<LeaderboardAPIResponse>(`${API_URL}/api/leaderboard/top`);
          if (response.data.success) {
            // API trả về dữ liệu đã được định dạng, không cần map lại
            const data: LeaderboardEntry[] = response.data.data;
            setLeaderboardData(data);
          } else {
            setError(response.data.message || 'Lỗi không xác định khi tải bảng xếp hạng.');
          }
        } catch (err) {
          console.error('Fetch leaderboard error:', err);
          setError('Không thể kết nối đến máy chủ API.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchLeaderboard();
    }
  }, [isOpen]);

  const dataToDisplay = leaderboardData.length > 0 ? leaderboardData : [];
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bảng xếp hạng">
      <div className="space-y-4">
        {/* Mô tả */}
        <p className="text-gray-600 text-center mb-4">
          Top 10 người chơi xuất sắc nhất
        </p>

        {/* Bảng xếp hạng */}
        {isLoading && (
          <div className="text-center py-4 text-blue-600 font-semibold">
            Đang tải bảng xếp hạng...
          </div>
        )}

        {error && (
          <div className="text-center py-4 text-red-600 font-semibold">
            Lỗi: {error}
          </div>
        )}

        {!isLoading && !error && dataToDisplay.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Chưa có dữ liệu bảng xếp hạng.
          </div>
        )}

        {!isLoading && !error && dataToDisplay.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="px-6 py-3 text-left text-sm font-bold">Hạng</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Tên</th>
                  <th className="px-6 py-3 text-right text-sm font-bold">Điểm</th>
                </tr>
              </thead>
              <tbody>
              {dataToDisplay.map((entry, index) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-gray-200 transition-colors hover:bg-blue-50 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className={`font-bold text-lg ${
                      entry.rank === 1 ? 'text-yellow-500' :
                      entry.rank === 2 ? 'text-gray-400' :
                      entry.rank === 3 ? 'text-orange-600' :
                      'text-gray-700'
                    }`}>
                      {entry.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {entry.playerName}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-blue-600 text-lg">
                      {entry.totalScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Footer note */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Dữ liệu cập nhật theo thời gian thực</p>
        </div>
      </div>
    </Modal>
  );
}