// Leaderboard Service - Chuẩn bị kết nối Backend

export interface LeaderboardSubmission {
  playerName: string;
  scores: {
    politics: number;  // CT - Chính trị
    economy: number;   // KT - Kinh tế
    society: number;   // CB - Xã hội
    diplomacy: number; // NG - Ngoại giao
  };
  totalScore: number;
  completedAt: string; // ISO timestamp
  gameRounds: number; // Số vòng đã chơi
  openAnswers?: string[]; // Sẽ thêm ở Phase 3
}

export interface LeaderboardResponse {
  success: boolean;
  message: string;
  data?: {
    rank: number;
    totalPlayers: number;
  };
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const LEADERBOARD_ENDPOINT = '/api/leaderboard/submit';

/**
 * Gửi dữ liệu leaderboard lên server
 * @param submission - Dữ liệu người chơi cần gửi
 * @returns Promise với response từ server
 */
export async function submitToLeaderboard(
  submission: LeaderboardSubmission
): Promise<LeaderboardResponse> {
  try {
    console.log('[LEADERBOARD] Đang gửi dữ liệu:', submission);

    const response = await fetch(`${API_BASE_URL}${LEADERBOARD_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: LeaderboardResponse = await response.json();
    console.log('[LEADERBOARD] Gửi thành công:', data);
    
    return data;
  } catch (error) {
    console.error('[LEADERBOARD] Lỗi khi gửi:', error);
    
    console.log('[LEADERBOARD] Sử dụng mock response (backend chưa có)');
    return {
      success: true,
      message: 'Đã gửi thành công! (Mock - Backend chưa kết nối)',
      data: {
        rank: Math.floor(Math.random() * 100) + 1,
        totalPlayers: Math.floor(Math.random() * 500) + 100,
      },
    };
  }
}

/**
 * Lấy danh sách bảng xếp hạng (sẽ implement sau)
 */
export async function getLeaderboard(limit: number = 10) {
  try {
    console.log('[LEADERBOARD] Đang tải bảng xếp hạng...');
    
    const response = await fetch(`${API_BASE_URL}/api/leaderboard?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[LEADERBOARD] Tải thành công:', data);
    
    return data;
  } catch (error) {
    console.error('[LEADERBOARD] Lỗi khi tải:', error);
    
    console.log('[LEADERBOARD] Sử dụng mock data');
    return {
      success: true,
      data: [],
    };
  }
}
