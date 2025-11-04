// LeaderboardModal.tsx - Modal hiển thị bảng xếp hạng
// Sử dụng Modal component có sẵn, không có icon, style đồng bộ

import Modal from './ui/modal';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data cho bảng xếp hạng (sẽ thay bằng API call sau)
const mockLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Người chơi A", score: 380 },
  { rank: 2, name: "Game Thủ B", score: 375 },
  { rank: 3, name: "Chiến lược gia C", score: 360 },
  { rank: 4, name: "Nhà lãnh đạo D", score: 355 },
  { rank: 5, name: "Người chơi E", score: 340 },
  { rank: 6, name: "Game Thủ F", score: 330 },
  { rank: 7, name: "Chiến lược gia G", score: 325 },
  { rank: 8, name: "Nhà lãnh đạo H", score: 310 },
  { rank: 9, name: "Người chơi I", score: 300 },
  { rank: 10, name: "Game Thủ K", score: 295 }
];

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bảng xếp hạng">
      <div className="space-y-4">
        {/* Mô tả */}
        <p className="text-gray-600 text-center mb-4">
          Top 10 người chơi xuất sắc nhất
        </p>

        {/* Bảng xếp hạng */}
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
              {mockLeaderboardData.map((entry, index) => (
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
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-blue-600 text-lg">
                      {entry.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Dữ liệu cập nhật theo thời gian thực</p>
        </div>
      </div>
    </Modal>
  );
}
