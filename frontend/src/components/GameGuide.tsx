// src/pages/GameGuide.tsx
import { AlertCircle, ArrowRight, Globe, HeartHandshake, Shield, TrendingUp, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameGuide() {
  return (
    <>
      <main
        className="min-h-screen pt-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/BackgroundGame.png')" }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Tiêu đề */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
                Hướng Dẫn Chơi
                <span className="block text-lenin-yellow text-4xl md:text-5xl mt-2">
                  Trò Chơi Lãnh Đạo Quốc Gia
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Học cách lãnh đạo đất nước qua 16 quyết định định mệnh trong 4
                năm
              </p>
            </div>

            {/* Card chính */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-marx-red-light">
              {/* 1. Giới thiệu */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-marx-red mb-6 flex items-center">
                  <Trophy className="w-10 h-10 mr-3 text-lenin-yellow" />
                  Mục Tiêu Của Trò Chơi
                </h2>
                <div className="bg-gradient-to-r from-lenin-yellow/20 to-marx-red/20 p-6 rounded-xl border-l-4 border-lenin-yellow">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Bạn sẽ lãnh đạo đất nước trong{" "}
                    <strong>4 năm (16 quý)</strong>. Mỗi quý, bạn đối mặt với
                    một tình huống thực tế về{" "}
                    <strong>chính trị, kinh tế, xã hội hoặc ngoại giao</strong>.
                  </p>
                  <p className="text-lg text-gray-800 mt-4 font-semibold">
                    Nhiệm vụ: Giữ tất cả chỉ số{" "}
                    <span className="text-marx-red">trên 0</span> và đạt{" "}
                    <span className="text-green-600">
                      điểm trung bình cao nhất
                    </span>
                    !
                  </p>
                </div>
              </section>

              {/* 2. 4 Chỉ số */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-marx-red mb-6">
                  4 Chỉ Số Quốc Gia
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      key: "CT",
                      name: "Ổn định Chính trị",
                      icon: Shield,
                      color: "text-blue-600",
                      desc: "Duy trì trật tự, tránh đảo chính, biểu tình.",
                    },
                    {
                      key: "KT",
                      name: "Tăng trưởng Kinh tế",
                      icon: TrendingUp,
                      color: "text-green-600",
                      desc: "Phát triển GDP, việc làm, đầu tư.",
                    },
                    {
                      key: "CB",
                      name: "Công bằng Xã hội",
                      icon: HeartHandshake,
                      color: "text-red-600",
                      desc: "Giảm bất bình đẳng, chăm lo dân sinh.",
                    },
                    {
                      key: "NG",
                      name: "Ngoại giao",
                      icon: Globe,
                      color: "text-yellow-600",
                      desc: "Quan hệ quốc tế, uy tín toàn cầu.",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.key}
                      className="flex items-start p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
                    >
                      <stat.icon
                        className={`w-12 h-12 ${stat.color} mr-4 flex-shrink-0`}
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {stat.name}
                        </h3>
                        <p className="text-gray-600 mt-1">{stat.desc}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">
                            Mức độ:
                          </span>
                          <div className="flex gap-1">
                            {[0, 25, 50, 75, 100].map((level) => {
                              let colorClass = "";
                              switch (level) {
                                case 0:
                                  colorClass = "border-red-500 bg-red-100";
                                  break;
                                case 25:
                                  colorClass =
                                    "border-yellow-500 bg-yellow-100";
                                  break;
                                case 50:
                                  colorClass = "border-blue-500 bg-blue-100";
                                  break;
                                case 75:
                                  colorClass = "border-green-500 bg-green-100";
                                  break;
                                case 100:
                                  colorClass = "border-green-700 bg-green-200";
                                  break;
                                default:
                                  colorClass = "border-gray-300 bg-gray-100";
                              }
                              return (
                                <div
                                  key={level}
                                  className={`w-6 h-6 rounded-full border-2 ${colorClass}`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Cách chơi */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-marx-red mb-6 flex items-center">
                  <AlertCircle className="w-10 h-10 mr-3 text-orange-500" />
                  Cách Chơi
                </h2>
                <div className="space-y-6 text-lg text-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-marx-red text-white flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <p>
                      <strong>Đọc tình huống</strong> → Hiểu bối cảnh và vấn đề
                      cần giải quyết.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-marx-red text-white flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <p>
                      <strong>Chọn 1 trong 4 lựa chọn</strong> → Mỗi lựa chọn
                      ảnh hưởng khác nhau đến 4 chỉ số.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-marx-red text-white flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <p>
                      <strong>Xem kết quả</strong> → Biết chỉ số tăng/giảm bao
                      nhiêu.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-marx-red text-white flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <p>
                      <strong>Tiếp tục 16 vòng</strong> → Cố gắng đạt điểm cao
                      nhất!
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Mẹo chơi */}
              <section className="mb-12 p-6 bg-lenin-yellow/10 border-2 border-lenin-yellow rounded-xl">
                <h3 className="text-2xl font-bold text-marx-red mb-4">
                  Mẹo Hay
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-marx-red mt-2 flex-shrink-0"></div>
                    <span>
                      Không có lựa chọn nào "hoàn hảo" – luôn có đánh đổi.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-marx-red mt-2 flex-shrink-0"></div>
                    <span>
                      Nếu <strong>bất kỳ chỉ số nào = 0</strong> → bạn thua
                      ngay!
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-marx-red mt-2 flex-shrink-0"></div>
                    <span>
                      Điểm trung bình càng cao → hạng càng cao trên bảng xếp
                      hạng!
                    </span>
                  </li>
                </ul>
              </section>

              {/* Nút bắt đầu */}
              <div className="text-center">
                <Link
                  to="/game"
                  className="inline-flex items-center px-10 py-5 text-2xl font-bold text-white bg-marx-red hover:bg-marx-red-hover rounded-xl shadow-xl transition-all hover:shadow-2xl"
                >
                  Bắt Đầu Lãnh Đạo
                  <ArrowRight className="w-8 h-8 ml-3" />
                </Link>
                <p className="mt-6 text-sm text-gray-500">
                  Sau khi chơi xong, bạn có thể gửi điểm lên{" "}
                  <strong>Bảng Xếp Hạng</strong> từ menu
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}