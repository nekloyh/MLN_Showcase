// GameIntro.tsx - Màn hình hướng dẫn chơi
// Hiển thị trước khi người chơi bắt đầu game
// Style đồng bộ với màn hình kết quả, không sử dụng icon

interface GameIntroProps {
  onStart: () => void;
}

export default function GameIntro({ onStart }: GameIntroProps) {
  return (
    <div className="text-center p-8 bg-white rounded-xl shadow-2xl">
      {/* Tiêu đề */}
      <h2 className="text-3xl font-extrabold mb-6 text-blue-600">
        Hướng Dẫn Chơi
      </h2>

      {/* Nội dung chính */}
      <div className="text-left mb-8 space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <p className="text-lg text-gray-800 font-semibold mb-2">
            Về Trò Chơi
          </p>
          <p className="text-gray-700">
            Bạn sẽ trả lời các câu hỏi về quản lý quốc gia và đưa ra quyết định
            quan trọng ảnh hưởng đến tương lai đất nước.
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
          <p className="text-lg text-gray-800 font-semibold mb-2">
            4 chỉ số quan trọng
          </p>
          <ul className="text-gray-700 space-y-1">
            <li><span className="font-semibold">Chính trị:</span> Ổn định và quản lý nhà nước</li>
            <li><span className="font-semibold">Kinh tế:</span> Tăng trưởng và phát triển</li>
            <li><span className="font-semibold">Xã hội:</span> Công bằng và phúc lợi</li>
            <li><span className="font-semibold">Ngoại giao:</span> Quan hệ quốc tế</li>
          </ul>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
          <p className="text-lg text-gray-800 font-semibold mb-2">
            Hình thức câu hỏi
          </p>
          <p className="text-gray-700">
            Có câu trắc nghiệm và câu tự luận. Với câu tự luận, AI sẽ chấm điểm
            dựa trên câu trả lời của bạn.
          </p>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <p className="text-lg text-gray-800 font-semibold mb-2">
            Bảng xếp hạng
          </p>
          <p className="text-gray-700">
            Kết quả của bạn sẽ được gửi lên bảng xếp hạng để so sánh với người
            chơi khác trên toàn hệ thống.
          </p>
        </div>
      </div>

      {/* Nút bắt đầu - Style giống nút "Tiếp tục" trong game */}
      <button
        onClick={onStart}
        className="flex items-center justify-center mx-auto px-8 py-4 text-xl font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 shadow-xl"
      >
        Bắt đầu chơi
      </button>

      <p className="text-sm text-gray-500 mt-4">
        Chúc bạn may mắn và có những quyết định sáng suốt!
      </p>
    </div>
  );
}
