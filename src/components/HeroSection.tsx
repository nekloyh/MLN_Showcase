// src/components/HeroSection.tsx
import { Link } from 'react-router-dom';
import { HeroHeader } from './header';
import { Button } from './ui/button';

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="max-w-4xl">
                <h1 className="text-5xl font-medium md:text-6xl xl:text-7xl text-balance">
                  Kinh tế Chính trị — Lý luận về Giá trị và Giá trị Thặng dư
                </h1>
                <p className="mt-8 text-lg text-pretty max-w-2xl mx-auto">
                  Tổng hợp các học thuyết cốt lõi của Kinh tế chính trị Mác - Lênin: từ khái niệm hàng hóa, giá trị đến học thuyết giá trị thặng dư và vai trò của thị trường trong phân phối của cải xã hội.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild  className="px-5 text-base">
                    <Link to="/game">
                      <span className="text-nowrap">Bắt đầu hành trình</span>
                    </Link>
                  </Button>
                  
                  <Button asChild size="lg" variant="outline" className="px-5 text-base">
                    <Link to="/leaderboard">
                      <span className="text-nowrap">Xem bảng xếp hạng</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          {/* You can add content for the "Learn About HCM" section here */}
        </section>
      </main>
    </>
  );
}