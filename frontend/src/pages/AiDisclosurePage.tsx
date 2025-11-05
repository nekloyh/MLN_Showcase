// the-diplomats-journey/src/pages/AiDisclosurePage.tsx
import { Bot } from 'lucide-react';
import { HeroHeader } from '../components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function AiDisclosurePage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-gradient-to-b from-white via-lenin-yellow-light to-white pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Công Bố Về Hợp Tác Cùng AI
              <span className="block text-marx-red">Minh Bạch & Sáng Tạo</span>
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Minh bạch trong quy trình sáng tạo và phát triển nền tảng học tập này.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-marx-red-light hover:border-marx-red transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-marx-red to-lenin-yellow rounded-full inline-block">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">
                  Hành Trình Sáng Tạo Cùng AI
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 mt-3">
                  AI là trợ thủ – Con người là trung tâm
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-10 px-8 pb-12 text-base leading-relaxed">
                {/* Triết Lý */}
                <section className="group">
                  <h2 className="text-2xl font-bold text-marx-red mb-3 group-hover:text-marx-red-hover transition-colors">
                    Triết Lý về AI trong Giáo Dục
                  </h2>
                  <p className="text-gray-700">
                    Nền tảng học tập <strong>"Kinh Tế Chính Trị Mác-Lênin"</strong> được xây dựng với sự hỗ trợ của trí tuệ nhân tạo nhằm tạo ra trải nghiệm giáo dục tương tác và sinh động. AI giúp xử lý nội dung, tổ chức kiến thức và cung cấp trải nghiệm học tập cá nhân hóa cho từng người học.
                  </p>
                </section>

                {/* Hình Ảnh & Nội Dung */}
                <section className="group">
                  <h2 className="text-2xl font-bold text-marx-red mb-3 group-hover:text-marx-red-hover transition-colors">
                    Nội Dung Được Tổ Chức Bởi AI
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Hình ảnh, sơ đồ và biểu đồ minh họa các khái niệm kinh tế được tạo ra và tối ưu bằng AI. Cách tiếp cận này cho phép nhóm em tạo ra một phong cách hình ảnh nhất quán, gợi cảm, phù hợp với bối cảnh lịch sử của trò chơi.
                  </p>
                  <ul className="space-y-3 text-gray-700 ml-5">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-lenin-yellow rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Công cụ sử dụng:</strong> Chủ yếu là <code className="bg-gray-100 px-2 py-1 rounded text-sm">Gemini</code> để tạo hình ảnh.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-lenin-yellow rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Quy trình:</strong> nhóm em đã tạo và tinh chỉnh các câu lệnh (prompt) để tạo ra những hình ảnh thể hiện được không khí, bối cảnh và các tình tiết của câu chuyện. Quá trình này đòi hỏi sự định hướng, lựa chọn và giám sát kỹ lưỡng từ nhóm em để đảm bảo tính chính xác về mặt lịch sử và chủ đề.
                      </div>
                    </li>
                  </ul>
                </section>

                {/* Thiết Kế & Code */}
                <section className="group">
                  <h2 className="text-2xl font-bold text-marx-red mb-3 group-hover:text-marx-red-hover transition-colors">
                    Thiết Kế & Phát Triển Được AI Hỗ Trợ
                  </h2>
                  <p className="text-gray-700 mb-4">
                    AI cũng đóng vai trò quan trọng như một cộng tác viên trong giai đoạn thiết kế và lập trình của dự án.
                  </p>
                  <ul className="space-y-3 text-gray-700 ml-5">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-lenin-yellow rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Thiết kế cấu trúc trang:</strong> Các trợ lý AI của Gemini đã giúp lên ý tưởng và cấu trúc bố cục cho một số trang, bao gồm trang dòng thời gian và trang trình bày. Quá trình này bao gồm việc tạo ra các ý tưởng về tổ chức thành phần và luồng người dùng, sau đó được đội ngũ của nhóm em hoàn thiện và triển khai.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-lenin-yellow rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900">Tạo và tái cấu trúc mã nguồn:</strong> Các trợ lý lập trình AI của Gemini được sử dụng để tạo mã nguồn mẫu, đề xuất cấu trúc thành phần, tái cấu trúc các hàm phức tạp và hỗ trợ gỡ lỗi. Điều này giúp đẩy nhanh chu kỳ phát triển và cho phép nhóm em tập trung hơn vào logic cốt lõi của trò chơi và trải nghiệm người dùng.
                      </div>
                    </li>
                  </ul>
                </section>

                {/* Giám Sát Con Người */}
                <section className="group bg-gradient-to-r from-marx-red/5 to-lenin-yellow/5 p-6 rounded-xl border border-marx-red/20">
                  <h2 className="text-2xl font-bold text-marx-red mb-3 group-hover:text-marx-red-hover transition-colors">
                    Sự Giám Sát của Nhóm Em
                  </h2>
                  <p className="text-gray-700 font-medium">
                    <strong className="text-marx-red">Cần lưu ý rằng:</strong> Tất cả nội dung do AI tạo ra — dù là hình ảnh hay mã nguồn — đều được nhóm em <strong>xem xét, chọn lọc và phê duyệt cuối cùng</strong>. Định hướng chiến lược, nội dung câu chuyện và việc triển khai cuối cùng đều do các nhà phát triển và thiết kế nhóm em thực hiện.
                  </p>
                  <p className="text-gray-700 mt-3 italic">
                    AI là <span className="text-lenin-yellow font-bold">trợ lý đắc lực</span>, không phải là sự thay thế cho óc sáng tạo và tư duy phản biện của con người.
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}