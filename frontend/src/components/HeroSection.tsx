// src/components/HeroSection.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroHeader } from './header';
import LeaderboardModal from './LeaderboardModal';
import { Button } from './ui/button';

export default function HeroSection() {
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-lenin-yellow-light/20 to-white">
          <div className="w-full max-w-6xl mx-auto px-6 py-16">
            <div className="flex flex-col items-center text-center space-y-10">
              <div className="max-w-4xl">
                <h1 className="text-5xl font-extrabold md:text-6xl xl:text-7xl text-balance leading-tight text-gray-900">
                  Kinh tế Chính trị — <span className="block text-marx-red">Giá trị & Giá trị Thặng dư</span>
                </h1>
                <p className="mt-8 text-lg md:text-xl text-pretty max-w-3xl mx-auto text-gray-700 leading-relaxed">
                  Tổng hợp các học thuyết cốt lõi của <strong>Kinh tế chính trị Mác - Lênin</strong>: từ khái niệm hàng hóa, giá trị đến học thuyết giá trị thặng dư và vai trò của thị trường trong phân phối của cải xã hội.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  {/* Nút chính: Vào hướng dẫn */}
                  <Button
                    asChild
                    size="lg"
                    className="px-8 py-6 text-lg font-bold bg-marx-red hover:bg-marx-red-hover text-white rounded-xl shadow-xl transition-all hover:shadow-2xl"
                  >
                    <Link to="/guide">
                      Bắt Đầu Hành Trình
                    </Link>
                  </Button>

                  {/* Nút phụ: Mở modal */}
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg font-medium border-2 border-marx-red-light text-marx-red hover:bg-marx-red/5 rounded-xl transition-all"
                    onClick={() => setLeaderboardOpen(true)}
                  >
                    Xem Bảng Xếp Hạng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LeaderboardModal isOpen={leaderboardOpen} onClose={() => setLeaderboardOpen(false)} />
    </>
  );
}