import { useState } from 'react';
import { Store, TrendingUp, TrendingDown, DollarSign, Users, Package, ShoppingCart, AlertCircle, Sparkles, Trophy, RotateCcw, ArrowRight, Coins } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  situation: string;
  icon: 'store' | 'trending' | 'users' | 'package';
  choices: {
    text: string;
    consequence: string;
    isCorrect: boolean;
    theory: string;
    impact: {
      money: number;
      reputation: number;
      knowledge: number;
    };
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Quản Lý Cửa Hàng Trà Sữa',
    description: 'Bạn là chủ một quán trà sữa nhỏ gần trường đại học',
    situation: 'Giá nguyên liệu tăng 20%, nhưng nhiều sinh viên phàn nàn giá đắt. Bạn sẽ làm gì?',
    icon: 'store',
    choices: [
      {
        text: 'Tăng giá bán 20% để bù chi phí',
        consequence: 'Mất 40% khách hàng do giá quá cao, doanh thu giảm mạnh',
        isCorrect: false,
        theory: 'Vi phạm quy luật cung cầu: giá tăng đột ngột làm cầu giảm mạnh',
        impact: { money: -30, reputation: -20, knowledge: 10 }
      },
      {
        text: 'Giữ nguyên giá, chịu lỗ tạm thời',
        consequence: 'Lỗ nặng, không thể duy trì lâu dài, phải đóng cửa sau 2 tháng',
        isCorrect: false,
        theory: 'Không bền vững: giá trị hàng hóa phải đủ bù chi phí sản xuất',
        impact: { money: -40, reputation: 10, knowledge: 10 }
      },
      {
        text: 'Tăng giá 10%, cải thiện chất lượng, giảm size nhỏ',
        consequence: 'Khách hàng chấp nhận, doanh thu ổn định, uy tín tăng',
        isCorrect: true,
        theory: 'Áp dụng đúng quy luật giá trị: tăng giá trị sử dụng và điều chỉnh giá hợp lý',
        impact: { money: 30, reputation: 20, knowledge: 30 }
      },
      {
        text: 'Giảm giá để cạnh tranh, thu hút khách',
        consequence: 'Thu hút khách nhưng lỗ nặng, chất lượng giảm, mất uy tín',
        isCorrect: false,
        theory: 'Cạnh tranh không lành mạnh: giảm giá dưới giá trị thực',
        impact: { money: -20, reputation: -15, knowledge: 5 }
      }
    ]
  },
  {
    id: 2,
    title: 'Kinh Doanh Online',
    description: 'Bạn mở shop quần áo online trên sàn thương mại điện tử',
    situation: 'Mùa sale lớn sắp tới, nhiều shop đua nhau giảm giá sâu. Chiến lược của bạn?',
    icon: 'trending',
    choices: [
      {
        text: 'Giảm giá 70% tất cả sản phẩm',
        consequence: 'Bán được nhiều nhưng lỗ nặng, không có lợi nhuận',
        isCorrect: false,
        theory: 'Phá giá trị hàng hóa, không đảm bảo giá trị thặng dư',
        impact: { money: -25, reputation: 5, knowledge: 10 }
      },
      {
        text: 'Không giảm giá, giữ giá trị thương hiệu',
        consequence: 'Mất khách vào đối thủ, doanh số giảm 60%',
        isCorrect: false,
        theory: 'Bỏ qua quy luật cạnh tranh và cung cầu thị trường',
        impact: { money: -30, reputation: -10, knowledge: 10 }
      },
      {
        text: 'Giảm 30% hàng tồn, combo sản phẩm mới',
        consequence: 'Tối ưu lợi nhuận, vừa cạnh tranh vừa duy trì giá trị',
        isCorrect: true,
        theory: 'Cân bằng quy luật giá trị và cạnh tranh, tối đa hóa giá trị thặng dư',
        impact: { money: 35, reputation: 25, knowledge: 35 }
      },
      {
        text: 'Tăng giá vì "chất lượng cao"',
        consequence: 'Không ai mua, shop bị đánh giá 1 sao, mất uy tín',
        isCorrect: false,
        theory: 'Vi phạm nghiêm trọng quy luật cung cầu và thị trường',
        impact: { money: -35, reputation: -30, knowledge: 5 }
      }
    ]
  },
  {
    id: 3,
    title: 'Công Nhân Và Tiền Lương',
    description: 'Bạn là quản lý nhà máy sản xuất giày dép',
    situation: 'Công ty muốn tăng sản lượng 50%. Công nhân yêu cầu tăng lương 40%. Giải pháp?',
    icon: 'users',
    choices: [
      {
        text: 'Từ chối tăng lương, ép tăng giờ làm',
        consequence: 'Công nhân đình công, sản xuất ngừng trệ, mất hợp đồng lớn',
        isCorrect: false,
        theory: 'Tăng giá trị thặng dư tuyệt đối không bền vững, vi phạm quyền lao động',
        impact: { money: -50, reputation: -40, knowledge: 15 }
      },
      {
        text: 'Tăng lương 40% theo yêu cầu',
        consequence: 'Chi phí tăng quá cao, công ty thua lỗ, phải cắt giảm nhân sự',
        isCorrect: false,
        theory: 'Không cân đối giữa tư bản khả biến và giá trị thặng dư',
        impact: { money: -30, reputation: 10, knowledge: 15 }
      },
      {
        text: 'Đầu tư máy móc hiện đại, tăng lương 20%, thưởng theo năng suất',
        consequence: 'Năng suất tăng, công nhân hài lòng, lợi nhuận tăng 35%',
        isCorrect: true,
        theory: 'Tăng giá trị thặng dư tương đối: nâng cao năng suất lao động',
        impact: { money: 40, reputation: 35, knowledge: 40 }
      },
      {
        text: 'Thuê thêm công nhân, giữ nguyên lương',
        consequence: 'Chi phí tăng, năng suất thấp, chất lượng giảm',
        isCorrect: false,
        theory: 'Không hiệu quả: tăng tư bản nhưng không tối ưu giá trị',
        impact: { money: -15, reputation: -10, knowledge: 10 }
      }
    ]
  },
  {
    id: 4,
    title: 'Thị Trường Cà Phê',
    description: 'Bạn kinh doanh chuỗi quán cà phê',
    situation: 'Giá cà phê tăng gấp đôi do mất mùa. Đồng thời, quán mới mở nhiều, cạnh tranh gay gắt.',
    icon: 'package',
    choices: [
      {
        text: 'Tăng giá gấp đôi theo giá nguyên liệu',
        consequence: '70% khách bỏ đi, doanh thu sụt giảm nghiêm trọng',
        isCorrect: false,
        theory: 'Không hiểu quy luật cung cầu: khách hàng có giới hạn khả năng chi trả',
        impact: { money: -40, reputation: -30, knowledge: 10 }
      },
      {
        text: 'Giữ nguyên giá, cắt giảm chất lượng',
        consequence: 'Khách phát hiện, đánh giá xấu, mất uy tín lâu dài',
        isCorrect: false,
        theory: 'Phá vỡ giá trị sử dụng của hàng hóa',
        impact: { money: -25, reputation: -40, knowledge: 5 }
      },
      {
        text: 'Tăng giá 30%, đa dạng menu, tối ưu chi phí',
        consequence: 'Khách chấp nhận giá mới, doanh thu tăng nhờ sản phẩm mới',
        isCorrect: true,
        theory: 'Cân bằng quy luật giá trị và đa dạng hóa hàng hóa',
        impact: { money: 35, reputation: 25, knowledge: 35 }
      },
      {
        text: 'Đóng cửa đợi giá cà phê giảm',
        consequence: 'Mất khách hàng vào đối thủ, khó lấy lại thị trường',
        isCorrect: false,
        theory: 'Không thích ứng với biến động thị trường',
        impact: { money: -50, reputation: -35, knowledge: 5 }
      }
    ]
  },
  {
    id: 5,
    title: 'Khởi Nghiệp Startup',
    description: 'Bạn có ý tưởng app giao đồ ăn cho sinh viên',
    situation: 'Cần 500 triệu để phát triển. Có 3 nhà đầu tư muốn góp vốn với điều kiện khác nhau.',
    icon: 'trending',
    choices: [
      {
        text: 'Nhận 500 triệu, nhường 80% cổ phần',
        consequence: 'Mất quyền kiểm soát, bị đẩy ra khỏi công ty sau 1 năm',
        isCorrect: false,
        theory: 'Phân phối giá trị thặng dư không hợp lý, mất quyền sở hữu tư liệu sản xuất',
        impact: { money: -20, reputation: -25, knowledge: 15 }
      },
      {
        text: 'Từ chối tất cả, tự vay ngân hàng lãi cao',
        consequence: 'Áp lực nợ nán, phá sản sau 6 tháng',
        isCorrect: false,
        theory: 'Không hiểu vai trò của tư bản trong sản xuất',
        impact: { money: -45, reputation: -20, knowledge: 10 }
      },
      {
        text: 'Nhận 500 triệu, nhường 40% cổ phần, giữ quyền điều hành',
        consequence: 'Cân bằng lợi ích, phát triển tốt, lợi nhuận chia đều',
        isCorrect: true,
        theory: 'Phân phối hợp lý giữa tư bản và lao động, đảm bảo cả hai bên cùng có lợi',
        impact: { money: 45, reputation: 40, knowledge: 45 }
      },
      {
        text: 'Làm miễn phí, kêu gọi tình nguyện viên',
        consequence: 'Không bền vững, thiếu chuyên nghiệp, dự án đổ vỡ',
        isCorrect: false,
        theory: 'Không tuân theo quy luật kinh tế hàng hóa và giá trị lao động',
        impact: { money: -30, reputation: -15, knowledge: 5 }
      }
    ]
  }
];

function MiniGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    money: 100,
    reputation: 100,
    knowledge: 0
  });
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'store': return <Store className="w-12 h-12" />;
      case 'trending': return <TrendingUp className="w-12 h-12" />;
      case 'users': return <Users className="w-12 h-12" />;
      case 'package': return <Package className="w-12 h-12" />;
      default: return <Store className="w-12 h-12" />;
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setPlayerStats({ money: 100, reputation: 100, knowledge: 0 });
    setCurrentScenario(0);
    setCompletedScenarios([]);
    setGameFinished(false);
  };

  const handleChoiceSelect = (index: number) => {
    if (showResult) return;
    setSelectedChoice(index);
  };

  const handleSubmitChoice = () => {
    if (selectedChoice === null) return;

    const choice = scenarios[currentScenario].choices[selectedChoice];
    setPlayerStats(prev => ({
      money: Math.max(0, Math.min(200, prev.money + choice.impact.money)),
      reputation: Math.max(0, Math.min(200, prev.reputation + choice.impact.reputation)),
      knowledge: prev.knowledge + choice.impact.knowledge
    }));

    setShowResult(true);
  };

  const handleNextScenario = () => {
    setCompletedScenarios([...completedScenarios, currentScenario]);

    if (playerStats.money <= 0 || playerStats.reputation <= 0) {
      setGameFinished(true);
      return;
    }

    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
    }
  };

  const getPerformanceLevel = () => {
    const avgScore = (playerStats.money + playerStats.reputation + playerStats.knowledge) / 3;
    if (avgScore >= 140) return { level: 'Chuyên Gia Kinh Tế', color: 'text-yellow-600', emoji: '🏆' };
    if (avgScore >= 100) return { level: 'Doanh Nhân Thông Minh', color: 'text-green-600', emoji: '🌟' };
    if (avgScore >= 60) return { level: 'Học Viên Tiềm Năng', color: 'text-blue-600', emoji: '📈' };
    return { level: 'Cần Học Hỏi Thêm', color: 'text-orange-600', emoji: '📚' };
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 text-white">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Sparkles className="w-16 h-16" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-center mb-4">
              Mô Phỏng Kinh Tế Thực Tế
            </h2>
            <p className="text-center text-blue-100 text-lg mb-8">
              Trải nghiệm các tình huống kinh doanh thực tế và áp dụng lý thuyết Mác - Lênin
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                <DollarSign className="w-10 h-10 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Quản Lý Tài Chính</h3>
                <p className="text-sm text-blue-100">Cân bằng chi phí và lợi nhuận</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                <Users className="w-10 h-10 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Uy Tín Thương Hiệu</h3>
                <p className="text-sm text-blue-100">Giữ vững niềm tin khách hàng</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                <TrendingUp className="w-10 h-10 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Kiến Thức Lý Thuyết</h3>
                <p className="text-sm text-blue-100">Áp dụng quy luật kinh tế</p>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <h3 className="font-bold text-xl mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                Cách Chơi
              </h3>
              <ul className="space-y-2 text-blue-50">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Đọc kỹ tình huống kinh doanh được đưa ra</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Chọn quyết định kinh tế phù hợp nhất</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Xem kết quả và học hỏi từ lý thuyết kinh tế</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>Duy trì tài chính và uy tín để hoàn thành game</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartGame}
              className="w-full bg-white text-blue-700 py-4 rounded-xl font-bold text-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Bắt Đầu Trải Nghiệm</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    const performance = getPerformanceLevel();
    const survived = playerStats.money > 0 && playerStats.reputation > 0;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className={`p-8 text-white ${survived ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-orange-600 to-red-600'}`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{survived ? performance.emoji : '💔'}</div>
              <h2 className="text-3xl font-bold mb-2">
                {survived ? 'Xuất Sắc!' : 'Kết Thúc!'}
              </h2>
              <p className={`text-xl ${performance.color} bg-white px-6 py-2 rounded-full inline-block font-bold`}>
                {performance.level}
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <Coins className="w-8 h-8 text-green-600" />
                  <span className="text-3xl font-bold text-green-600">{playerStats.money}</span>
                </div>
                <p className="text-gray-600 font-semibold">Tài Chính</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(playerStats.money / 200) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">{playerStats.reputation}</span>
                </div>
                <p className="text-gray-600 font-semibold">Uy Tín</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(playerStats.reputation / 200) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                <div className="flex items-center justify-between mb-3">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <span className="text-3xl font-bold text-yellow-600">{playerStats.knowledge}</span>
                </div>
                <p className="text-gray-600 font-semibold">Kiến Thức</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((playerStats.knowledge / 200) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3">Đánh Giá Chi Tiết</h3>
              <div className="space-y-2 text-gray-700">
                <p>✅ Hoàn thành: {completedScenarios.length + 1}/{scenarios.length} tình huống</p>
                <p>💰 Tài chính: {playerStats.money > 100 ? 'Tăng trưởng tốt' : playerStats.money > 50 ? 'Ổn định' : 'Cần cải thiện'}</p>
                <p>⭐ Uy tín: {playerStats.reputation > 100 ? 'Xuất sắc' : playerStats.reputation > 50 ? 'Tốt' : 'Cần xây dựng lại'}</p>
                <p>📚 Kiến thức: {playerStats.knowledge >= 150 ? 'Chuyên gia' : playerStats.knowledge >= 100 ? 'Giỏi' : 'Đang học hỏi'}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-6 border-l-4 border-red-500">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Bài Học Rút Ra</h3>
              <p className="text-gray-700 leading-relaxed">
                {survived
                  ? 'Bạn đã áp dụng tốt các quy luật kinh tế Mác - Lênin vào thực tế: cân bằng giữa giá trị và giá trị sử dụng, hiểu rõ quy luật cung cầu, và biết cách tối ưu hóa giá trị thặng dư một cách bền vững.'
                  : 'Hãy học lại lý thuyết về quy luật giá trị, cơ chế thị trường, và mối quan hệ giữa tư bản với lao động. Kinh doanh cần cân bằng giữa lợi nhuận và trách nhiệm xã hội.'
                }
              </p>
            </div>

            <button
              onClick={handleStartGame}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Chơi Lại</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scenario = scenarios[currentScenario];
  const choice = selectedChoice !== null ? scenario.choices[selectedChoice] : null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Coins className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tài Chính</p>
              <div className="flex items-center space-x-2">
                <p className="text-lg font-bold text-gray-800">{playerStats.money}</p>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${playerStats.money > 100 ? 'bg-green-500' : playerStats.money > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${(playerStats.money / 200) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Uy Tín</p>
              <div className="flex items-center space-x-2">
                <p className="text-lg font-bold text-gray-800">{playerStats.reputation}</p>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${playerStats.reputation > 100 ? 'bg-blue-500' : playerStats.reputation > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${(playerStats.reputation / 200) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Kiến Thức</p>
              <p className="text-lg font-bold text-gray-800">{playerStats.knowledge}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                {getIcon(scenario.icon)}
              </div>
              <div>
                <p className="text-sm text-blue-100">Tình Huống {currentScenario + 1}/{scenarios.length}</p>
                <h2 className="text-2xl font-bold">{scenario.title}</h2>
              </div>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-200" />
          </div>
          <div className="bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border-l-4 border-blue-500">
            <p className="text-gray-600 mb-3 italic">{scenario.description}</p>
            <p className="text-gray-800 font-semibold text-lg">{scenario.situation}</p>
          </div>

          <h3 className="font-bold text-lg text-gray-800 mb-4">Lựa Chọn Của Bạn:</h3>

          <div className="space-y-3 mb-6">
            {scenario.choices.map((option, index) => {
              let buttonClass = 'border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-1';

              if (showResult && choice) {
                if (option.isCorrect) {
                  buttonClass = 'border-2 border-green-500 bg-green-50 shadow-lg';
                } else if (index === selectedChoice && !option.isCorrect) {
                  buttonClass = 'border-2 border-red-500 bg-red-50';
                } else {
                  buttonClass = 'border-2 border-gray-200 bg-gray-50 opacity-60';
                }
              } else if (selectedChoice === index) {
                buttonClass = 'border-2 border-blue-600 bg-blue-50 shadow-md';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleChoiceSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-200 ${buttonClass} ${
                    showResult ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <span className="bg-gray-200 text-gray-700 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium text-gray-800">{option.text}</span>
                    </div>
                    {showResult && option.isCorrect && (
                      <div className="flex items-center space-x-1 text-green-600 ml-3">
                        <span className="text-sm font-semibold">Đúng!</span>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    )}
                    {showResult && index === selectedChoice && !option.isCorrect && (
                      <div className="flex items-center space-x-1 text-red-600 ml-3">
                        <span className="text-sm font-semibold">Sai</span>
                        <TrendingDown className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && choice && (
            <div className={`rounded-xl p-6 mb-6 border-l-4 ${choice.isCorrect ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">Kết Quả:</h4>
                  <p className="text-gray-700 leading-relaxed">{choice.consequence}</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                    Lý Thuyết Kinh Tế:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{choice.theory}</p>
                </div>

                <div className="flex items-center justify-around bg-white rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Tài Chính</p>
                    <p className={`text-2xl font-bold ${choice.impact.money > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {choice.impact.money > 0 ? '+' : ''}{choice.impact.money}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Uy Tín</p>
                    <p className={`text-2xl font-bold ${choice.impact.reputation > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {choice.impact.reputation > 0 ? '+' : ''}{choice.impact.reputation}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Kiến Thức</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      +{choice.impact.knowledge}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setGameStarted(false);
                setGameFinished(false);
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Bắt Đầu Lại</span>
            </button>

            {!showResult ? (
              <button
                onClick={handleSubmitChoice}
                disabled={selectedChoice === null}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  selectedChoice === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg transform hover:scale-105'
                }`}
              >
                Xác Nhận Lựa Chọn
              </button>
            ) : (
              <button
                onClick={handleNextScenario}
                className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg transform hover:scale-105 flex items-center space-x-2"
              >
                <span>{currentScenario < scenarios.length - 1 ? 'Tình Huống Tiếp Theo' : 'Xem Kết Quả'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniGame;
