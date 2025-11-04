import { Shield, TrendingUp, HeartHandshake, Globe } from "lucide-react";

// Định nghĩa cấu trúc cho một Tình huống (Scenario)
export interface Scenario {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  category: "CT" | "KT" | "CB" | "NG"; // Chính trị, Kinh tế, Công bằng, Ngoại giao
  choices: {
    text: string;
    impact: {
      CT: number; // Ổn định Chính trị
      KT: number; // Tăng trưởng Kinh tế
      CB: number; // Công bằng Xã hội
      NG: number; // Ngoại giao
    };
  }[];
}

// Kho dữ liệu 30 tình huống
export const allSituations: Scenario[] = [
  // --- KINH TẾ (KT) ---
  {
    id: 1,
    title: "Khủng hoảng Chuỗi cung ứng",
    description:
      "Một cuộc đình công toàn cầu đã làm tê liệt các cảng biển. Hàng hóa nhập khẩu thiết yếu bị mắc kẹt, các nhà máy bắt đầu thiếu nguyên liệu. Hành động của bạn là gì?",
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Trợ cấp cho các ngành bị ảnh hưởng để giữ giá.",
        impact: { CT: 5, KT: -10, CB: 5, NG: 0 },
      },
      {
        text: "Đàm phán khẩn cấp với các quốc gia láng giềng tìm nguồn thay thế.",
        impact: { CT: 0, KT: -5, CB: 0, NG: 10 },
      },
      {
        text: 'Kêu gọi người dân "thắt lưng buộc bụng" và ưu tiên sản xuất nội địa.',
        impact: { CT: 10, KT: -15, CB: -5, NG: 0 },
      },
      {
        text: "Không can thiệp, để thị trường tự điều chỉnh.",
        impact: { CT: -10, KT: -20, CB: -10, NG: 0 },
      },
    ],
  },
  {
    id: 2,
    title: "Lạm phát phi mã",
    description:
      "Giá cả tiêu dùng tăng vọt 20% trong quý. Người dân đang hoảng loạn. Ngân hàng trung ương yêu cầu một chỉ thị rõ ràng. Quyết sách của bạn là gì?",
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Tăng mạnh lãi suất cơ bản để thắt chặt tiền tệ.",
        impact: { CT: 5, KT: -10, CB: -5, NG: 0 },
      },
      {
        text: "Áp giá trần cho các mặt hàng thiết yếu như lương thực, xăng dầu.",
        impact: { CT: 10, KT: -5, CB: 5, NG: 0 },
      },
      {
        text: "Phát hành gói trợ cấp tiền mặt cho toàn dân để đối phó với giá cả.",
        impact: { CT: 5, KT: -15, CB: 10, NG: 0 },
      },
      {
        text: 'Đổ lỗi cho các "đầu nậu tích trữ" và tiến hành các cuộc thanh tra trên toàn quốc.',
        impact: { CT: -5, KT: -5, CB: 0, NG: 0 },
      },
    ],
  },
  {
    id: 3,
    title: "Đề nghị từ Tập đoàn Đa quốc gia",
    description:
      "Tập đoàn công nghệ khổng lồ 'Quantum Leap' muốn xây dựng nhà máy sản xuất chip tỷ đô. Họ yêu cầu ưu đãi thuế lớn và nới lỏng luật môi trường.",
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Chấp thuận mọi điều kiện để có được khoản đầu tư khổng lồ.",
        impact: { CT: 0, KT: 20, CB: -10, NG: 5 },
      },
      {
        text: "Từ chối thẳng thừng để bảo vệ môi trường và doanh nghiệp trong nước.",
        impact: { CT: 5, KT: -5, CB: 5, NG: 0 },
      },
      {
        text: "Đàm phán lại: Chấp nhận ưu đãi thuế nhưng yêu cầu cam kết môi trường và chuyển giao công nghệ.",
        impact: { CT: 5, KT: 15, CB: 0, NG: 5 },
      },
      {
        text: "Đưa ra đấu thầu công khai, mời các tập đoàn khác cùng tham gia.",
        impact: { CT: 0, KT: 10, CB: 0, NG: 0 },
      },
    ],
  },
  {
    id: 4,
    title: "Đình công Ngành vận tải",
    description:
      "Toàn bộ tài xế xe tải và công nhân đường sắt đình công, yêu cầu giảm thuế nhiên liệu và tăng lương. Giao thông tê liệt. Bạn sẽ giải quyết thế nào?",
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Sử dụng lực lượng an ninh để giải tán.",
        impact: { CT: -15, KT: 5, CB: -10, NG: 0 },
      },
      {
        text: "Chấp nhận giảm 50% thuế nhiên liệu.",
        impact: { CT: 10, KT: -10, CB: 5, NG: 0 },
      },
      {
        text: "Đàm phán, hứa hẹn tăng lương tối thiểu và lộ trình giảm thuế.",
        impact: { CT: 5, KT: -5, CB: 10, NG: 0 },
      },
      {
        text: "Đổ lỗi cho phe đối lập và yêu cầu họ quay lại làm việc.",
        impact: { CT: -10, KT: -5, CB: -5, NG: 0 },
      },
    ],
  },
  {
    id: 5,
    title: "Phát hiện Mỏ đất hiếm",
    description:
      "Các nhà địa chất vừa phát hiện một mỏ đất hiếm khổng lồ tại khu vực cao nguyên, nơi có nhiều dân tộc thiểu số sinh sống và là rừng đầu nguồn quan trọng.",
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Cấp phép cho tập đoàn nhà nước khai thác ngay lập tức để tăng trưởng kinh tế.",
        impact: { CT: -10, KT: 25, CB: -15, NG: 0 },
      },
      {
        text: "Tuyên bố đây là khu bảo tồn quốc gia, cấm mọi hoạt động khai thác.",
        impact: { CT: 5, KT: -5, CB: 15, NG: 0 },
      },
      {
        text: "Cho phép khai thác có kiểm soát với công nghệ hiện đại và quỹ phúc lợi cho người dân địa phương.",
        impact: { CT: 5, KT: 15, CB: 5, NG: 0 },
      },
      {
        text: "Kêu gọi vốn đầu tư nước ngoài để khai thác, chấp nhận chia sẻ lợi nhuận lớn.",
        impact: { CT: -5, KT: 20, CB: -10, NG: 10 },
      },
    ],
  },
  {
    id: 6,
    title: "Bong bóng Bất động sản",
    description:
      'Giá nhà tại các đô thị lớn tăng gấp 3 lần trong 2 năm, phần lớn do đầu cơ. Nguy cơ "bong bóng" vỡ là rất cao, đe dọa hệ thống ngân hàng.',
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Siết chặt tín dụng cho vay bất động sản và tăng thuế với bất động sản thứ hai.",
        impact: { CT: 10, KT: -15, CB: 5, NG: 0 },
      },
      {
        text: "Không can thiệp, tin rằng thị trường sẽ tự điều chỉnh một cách tự nhiên.",
        impact: { CT: -20, KT: -30, CB: -20, NG: 0 },
      },
      {
        text: "Đẩy mạnh xây dựng nhà ở xã hội để hạ nhiệt giá nhà.",
        impact: { CT: 5, KT: -10, CB: 15, NG: 0 },
      },
      {
        text: "Trấn an dư luận và tuyên bố rằng thị trường bất động sản vẫn đang phát triển lành mạnh.",
        impact: { CT: -15, KT: 5, CB: -10, NG: 0 },
      },
    ],
  },
  {
    id: 7,
    title: "Nông nghiệp Thất bát",
    description:
      "Một đợt hạn hán kéo dài khiến sản lượng lương thực sụt giảm nghiêm trọng. An ninh lương thực bị đe dọa, giá gạo tăng cao.",
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Dùng dự trữ ngoại hối để nhập khẩu khẩn cấp lương thực.",
        impact: { CT: 5, KT: -10, CB: 10, NG: -5 },
      },
      {
        text: "Bơm tiền hỗ trợ trực tiếp cho nông dân và các hợp tác xã.",
        impact: { CT: 5, KT: -8, CB: 5, NG: 0 },
      },
      {
        text: "Ban hành lệnh cấm xuất khẩu gạo để đảm bảo nguồn cung trong nước.",
        impact: { CT: 10, KT: -5, CB: 5, NG: -10 },
      },
      {
        text: "Đầu tư dài hạn vào hệ thống thủy lợi và giống cây trồng chống chịu biến đổi khí hậu.",
        impact: { CT: 5, KT: -15, CB: 5, NG: 0 },
      },
    ],
  },
  {
    id: 8,
    title: "Sập cầu Huyết mạch",
    description:
      "Cây cầu huyết mạch nối liền 2 trung tâm kinh tế lớn đã sụp đổ do cũ kỹ. Giao thông tắc nghẽn, chi phí logistics tăng vọt.",
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Dùng ngân sách khẩn cấp, xây lại cấp tốc trong 6 tháng bằng chỉ định thầu.",
        impact: { CT: 10, KT: -15, CB: -5, NG: 0 },
      },
      {
        text: "Làm phà và cầu phao tạm thời trong khi tiến hành đấu thầu công khai để xây cầu mới.",
        impact: { CT: -5, KT: -5, CB: 5, NG: 0 },
      },
      {
        text: "Kêu gọi khu vực tư nhân đầu tư xây cầu mới theo hình thức BOT (Xây dựng-Vận hành-Chuyển giao).",
        impact: { CT: 5, KT: 5, CB: -5, NG: 0 },
      },
      {
        text: "Huy động lực lượng quân đội để xây dựng cầu dã chiến trong thời gian ngắn nhất.",
        impact: { CT: 15, KT: -10, CB: 0, NG: 0 },
      },
    ],
  },

  // --- CHÍNH TRỊ (CT) ---
  {
    id: 9,
    title: "Bê bối Tham nhũng Cấp cao",
    description:
      "Báo chí phanh phui một vụ tham nhũng lớn liên quan đến Bộ trưởng Bộ Tài chính, người vốn là đồng minh thân cận của bạn.",
    icon: Shield,
    category: "CT",
    choices: [
      {
        text: "Cách chức và yêu cầu điều tra ngay lập tức, công khai trước công chúng.",
        impact: { CT: 15, KT: 0, CB: 5, NG: 0 },
      },
      {
        text: "Bác bỏ cáo buộc, cho rằng đây là âm mưu của phe đối lập và yêu cầu báo chí ngừng đưa tin.",
        impact: { CT: -20, KT: 0, CB: -10, NG: -5 },
      },
      {
        text: 'Bí mật điều chuyển Bộ trưởng sang một vị trí ít quan trọng hơn để "hạ cánh an toàn".',
        impact: { CT: -10, KT: 0, CB: -5, NG: 0 },
      },
      {
        text: "Thành lập một ủy ban điều tra độc lập bao gồm cả đại diện phe đối lập.",
        impact: { CT: 10, KT: 0, CB: 10, NG: 0 },
      },
    ],
  },
  {
    id: 10,
    title: "Phong trào Ly khai",
    description:
      "Một tỉnh ở xa xôi, giàu tài nguyên, đang dấy lên phong trào đòi ly khai. Các cuộc biểu tình ôn hòa đang có nguy cơ biến thành bạo lực.",
    icon: Shield,
    category: "CT",
    choices: [
      {
        text: "Ban bố tình trạng khẩn cấp, đưa quân đội vào để lập lại trật tự.",
        impact: { CT: -25, KT: -10, CB: -15, NG: -10 },
      },
      {
        text: "Mời lãnh đạo phong trào đối thoại, hứa hẹn trao thêm quyền tự trị và chia sẻ lợi ích kinh tế.",
        impact: { CT: 10, KT: -5, CB: 5, NG: 0 },
      },
      {
        text: "Tổ chức một cuộc trưng cầu dân ý về việc ly khai tại tỉnh đó.",
        impact: { CT: 5, KT: -5, CB: 5, NG: 0 },
      },
      {
        text: "Phớt lờ các yêu sách, đồng thời tăng cường tuyên truyền về sự thống nhất quốc gia.",
        impact: { CT: -10, KT: 0, CB: -5, NG: 0 },
      },
    ],
  },
  {
    id: 11,
    title: "Khủng hoảng Tin giả (Fake News)",
    description:
      "Một chiến dịch tin giả quy mô lớn đang lan truyền trên mạng xã hội, cáo buộc chính phủ che giấu dịch bệnh và kích động bạo lực. Lòng tin sụt giảm nghiêm trọng.",
    icon: Shield,
    category: "CT",
    choices: [
      {
        text: "Đóng cửa tạm thời các mạng xã hội và truy tố những người lan truyền tin tức sai sự thật.",
        impact: { CT: 10, KT: -5, CB: -15, NG: -5 },
      },
      {
        text: "Tổ chức họp báo hàng ngày, công bố dữ liệu minh bạch và hợp tác với các nền tảng để gỡ bỏ tin giả.",
        impact: { CT: 10, KT: 0, CB: 5, NG: 0 },
      },
      {
        text: "Tung ra một chiến dịch tuyên truyền của riêng chính phủ để phản bác lại.",
        impact: { CT: -5, KT: 0, CB: -5, NG: 0 },
      },
      {
        text: 'Thành lập lực lượng "không gian mạng" để chủ động tấn công các nguồn phát tán tin giả.',
        impact: { CT: 5, KT: -5, CB: -10, NG: -5 },
      },
    ],
  },
  {
    id: 12,
    title: "Yêu cầu Cải cách Tư pháp",
    description:
      "Tòa án tối cao bị cáo buộc tham nhũng và ra các phán quyết bất công. Người dân và các nhà đầu tư nước ngoài đòi hỏi một cuộc cải cách tư pháp toàn diện.",
    icon: Shield,
    category: "CT",
    choices: [
      {
        text: "Thành lập ủy ban độc lập để cải tổ, sa thải các thẩm phán tham nhũng.",
        impact: { CT: 15, KT: 10, CB: 10, NG: 5 },
      },
      {
        text: "Hứa hẹn sẽ xem xét và thành lập một ủy ban nghiên cứu trong vài năm tới.",
        impact: { CT: -5, KT: -5, CB: -5, NG: -5 },
      },
      {
        text: "Tăng lương cho các thẩm phán và công tố viên để chống tham nhũng.",
        impact: { CT: 5, KT: -5, CB: 5, NG: 0 },
      },
      {
        text: "Bác bỏ các cáo buộc và tuyên bố hệ thống tư pháp vẫn hoạt động tốt.",
        impact: { CT: -15, KT: -10, CB: -10, NG: -5 },
      },
    ],
  },
  {
    id: 13,
    title: "Rò rỉ Dữ liệu Công dân",
    description:
      "Hệ thống dữ liệu Căn cước công dân quốc gia đã bị hack. Toàn bộ thông tin cá nhân của hàng triệu người bị rao bán trên 'dark web'. Xã hội hoang mang.",
    icon: Shield,
    category: "CT",
    choices: [
      {
        text: "Bí mật vá lỗ hổng và truy lùng hacker, tránh gây hoang mang dư luận.",
        impact: { CT: -10, KT: 0, CB: -5, NG: 0 },
      },
      {
        text: "Công khai xin lỗi, cảnh báo người dân và đưa ra các biện pháp khắc phục, hỗ trợ.",
        impact: { CT: 5, KT: 0, CB: 5, NG: 0 },
      },
      {
        text: "Đổ lỗi cho một thế lực thù địch nước ngoài đứng sau vụ tấn công.",
        impact: { CT: 0, KT: 0, CB: 0, NG: -5 },
      },
      {
        text: "Yêu cầu tất cả công dân phải đổi mật khẩu và các thông tin xác thực ngay lập tức.",
        impact: { CT: -5, KT: -5, CB: -5, NG: 0 },
      },
    ],
  },
  {
    id: 14,
    title: "Yêu cầu Sửa đổi Hiến pháp",
    description:
      "Phe đối lập và các nhà hoạt động xã hội đang tập hợp đủ chữ ký, yêu cầu sửa đổi Hiến pháp để tăng cường quyền lực cho quốc hội và hạn chế quyền hành pháp của bạn.",
    icon: Shield,
    category: "CT",
    choices: [
      {
        text: "Tuyên bố Hiến pháp hiện tại là hoàn hảo và bác bỏ yêu cầu.",
        impact: { CT: -15, KT: 0, CB: -5, NG: 0 },
      },
      {
        text: "Đồng ý thành lập Ủy ban soạn thảo Hiến pháp mới, bao gồm nhiều thành phần xã hội.",
        impact: { CT: 10, KT: 0, CB: 5, NG: 0 },
      },
      {
        text: "Đề xuất một cuộc trưng cầu dân ý về việc có nên sửa đổi Hiến pháp hay không.",
        impact: { CT: 5, KT: 0, CB: 5, NG: 0 },
      },
      {
        text: "Giải tán quốc hội và kêu gọi một cuộc bầu cử sớm.",
        impact: { CT: -20, KT: -10, CB: -10, NG: -5 },
      },
    ],
  },
  {
    id: 15,
    title: "Bầu cử Giữa nhiệm kỳ",
    description:
      "Đã 2 năm trôi qua. Một cuộc bầu cử giữa nhiệm kỳ đang đến gần. Tỷ lệ ủng hộ của bạn sẽ quyết định đảng của bạn có giữ được đa số tại quốc hội hay không.",
    icon: Shield,
    category: "CT",
    choices: [
      {
        text: "Đẩy mạnh các chiến dịch quảng bá thành tựu của chính phủ.",
        impact: { CT: 5, KT: -5, CB: 0, NG: 0 },
      },
      {
        text: "Ban hành một gói cắt giảm thuế phổ thông để lấy lòng cử tri.",
        impact: { CT: 5, KT: -10, CB: 5, NG: 0 },
      },
      {
        text: "Tấn công mạnh mẽ vào các bê bối của phe đối lập.",
        impact: { CT: 0, KT: 0, CB: -5, NG: 0 },
      },
      {
        text: "Tập trung vào việc điều hành đất nước, để kết quả tự nói lên.",
        impact: { CT: 0, KT: 0, CB: 0, NG: 0 },
      },
    ],
  },

  // --- CÔNG BẰNG XÃ HỘI (CB) ---
  {
    id: 16,
    title: "Biểu tình của Sinh viên",
    description:
      "Hàng ngàn sinh viên biểu tình phản đối việc tăng học phí đại học và yêu cầu 'miễn phí giáo dục'. Họ đã chiếm giữ khuôn viên trường đại học lớn nhất.",
    icon: HeartHandshake,
    category: "CB",
    choices: [
      {
        text: "Gặp gỡ sinh viên, hứa sẽ giảm 50% học phí và tăng học bổng.",
        impact: { CT: 5, KT: -10, CB: 10, NG: 0 },
      },
      {
        text: "Cho rằng đây là yêu sách vô lý, chờ họ tự giải tán.",
        impact: { CT: -5, KT: 0, CB: -10, NG: 0 },
      },
      {
        text: "Sử dụng lực lượng an ninh để giải tán biểu tình và lập lại trật tự.",
        impact: { CT: -15, KT: 0, CB: -15, NG: -5 },
      },
      {
        text: "Đề xuất một lộ trình miễn giảm học phí dài hạn, gắn với kết quả học tập.",
        impact: { CT: 5, KT: -5, CB: 5, NG: 0 },
      },
    ],
  },
  {
    id: 17,
    title: "Chênh lệch Giàu nghèo Gia tăng",
    description:
      "Báo cáo mới nhất cho thấy 1% dân số giàu nhất đang nắm giữ 60% tài sản quốc gia. Sự bất bình đẳng đang ở mức báo động.",
    icon: HeartHandshake,
    category: "CB",
    choices: [
      {
        text: "Ban hành chính sách thuế tài sản và thuế thu nhập lũy tiến mới.",
        impact: { CT: -5, KT: -10, CB: 15, NG: 0 },
      },
      {
        text: 'Giảm thuế cho doanh nghiệp, hy vọng lợi ích sẽ "nhỏ giọt" xuống người nghèo.',
        impact: { CT: -10, KT: 5, CB: -15, NG: 0 },
      },
      {
        text: "Tăng cường các chương trình phúc lợi xã hội, y tế và giáo dục miễn phí.",
        impact: { CT: 5, KT: -15, CB: 15, NG: 0 },
      },
      {
        text: "Kêu gọi giới nhà giàu tự nguyện làm từ thiện nhiều hơn.",
        impact: { CT: 0, KT: 0, CB: -5, NG: 0 },
      },
    ],
  },
  {
    id: 18,
    title: "Thảm họa Môi trường Biển",
    description:
      "Một tàu chở dầu gặp nạn, làm tràn hàng ngàn tấn dầu ra vùng biển du lịch trọng điểm. Hệ sinh thái bị hủy hoại, ngư dân và ngành du lịch điêu đứng.",
    icon: HeartHandshake,
    category: "CB",
    choices: [
      {
        text: "Yêu cầu công ty tàu dầu bồi thường, dùng ngân sách khắc phục ngay.",
        impact: { CT: 5, KT: -10, CB: 10, NG: -5 },
      },
      {
        text: "Cố gắng che giấu quy mô thảm họa để cứu ngành du lịch trong ngắn hạn.",
        impact: { CT: -15, KT: -5, CB: -20, NG: 0 },
      },
      {
        text: "Huy động quân đội và tình nguyện viên tham gia dọn dẹp sự cố.",
        impact: { CT: 10, KT: -5, CB: 5, NG: 0 },
      },
      {
        text: "Kiện công ty tàu dầu ra tòa án quốc tế.",
        impact: { CT: 0, KT: -5, CB: 5, NG: 5 },
      },
    ],
  },
  {
    id: 19,
    title: "Yêu cầu Tự do Báo chí",
    description:
      "Các nhà báo trong nước và quốc tế đồng loạt lên tiếng, yêu cầu chính phủ nới lỏng kiểm duyệt và cho phép báo chí tư nhân hoạt động.",
    icon: HeartHandshake,
    category: "CB",
    choices: [
      {
        text: "Cho phép thành lập một vài tờ báo tư nhân có điều kiện.",
        impact: { CT: -10, KT: 0, CB: 10, NG: 5 },
      },
      {
        text: "Siết chặt hơn nữa kiểm duyệt, coi đây là hành vi thù địch.",
        impact: { CT: 5, KT: 0, CB: -10, NG: -10 },
      },
      {
        text: "Giữ nguyên hiện trạng nhưng hứa sẽ tăng cường đối thoại với báo chí.",
        impact: { CT: 0, KT: 0, CB: -5, NG: -5 },
      },
      {
        text: "Tổ chức một hội nghị về tự do báo chí để thảo luận công khai.",
        impact: { CT: 5, KT: 0, CB: 5, NG: 5 },
      },
    ],
  },
  {
    id: 20,
    title: "Hệ thống Y tế Công quá tải",
    description:
      "Các bệnh viện công đang quá tải nghiêm trọng. Người dân phải chờ đợi hàng tháng để được phẫu thuật. Tỷ lệ tử vong do các bệnh thông thường đang tăng lên.",
    icon: HeartHandshake,
    category: "CB",
    choices: [
      {
        text: "Chi ngân sách lớn để xây thêm 10 bệnh viện công mới.",
        impact: { CT: 5, KT: -15, CB: 15, NG: 0 },
      },
      {
        text: "Kêu gọi tư nhân đầu tư vào y tế, giảm gánh nặng cho nhà nước.",
        impact: { CT: 0, KT: 5, CB: -10, NG: 0 },
      },
      {
        text: "Tăng cường hệ thống bảo hiểm y tế toàn dân và y tế dự phòng.",
        impact: { CT: 5, KT: -10, CB: 10, NG: 0 },
      },
      {
        text: "Tăng lương và đãi ngộ cho các y bác sĩ để giữ chân nhân tài.",
        impact: { CT: 5, KT: -8, CB: 8, NG: 0 },
      },
    ],
  },
  {
    id: 21,
    title: "Tranh cãi về Di sản Văn hóa",
    description:
      "Một ngôi đền cổ 500 tuổi đang cản trở dự án xây dựng một trung tâm thương mại hiện đại. Phe bảo tồn và phe phát triển đang tranh cãi gay gắt.",
    icon: HeartHandshake,
    category: "CB",
    choices: [
      {
        text: "Hủy dự án TTTM, công nhận đền là di sản quốc gia.",
        impact: { CT: 5, KT: -10, CB: 10, NG: 0 },
      },
      {
        text: "Di dời ngôi đền đến một địa điểm khác để xây dựng TTTM.",
        impact: { CT: -5, KT: 10, CB: -10, NG: 0 },
      },
      {
        text: "Tìm cách quy hoạch lại dự án để TTTM và ngôi đền cùng tồn tại hài hòa.",
        impact: { CT: 5, KT: 5, CB: 5, NG: 0 },
      },
      {
        text: "Tổ chức một cuộc bỏ phiếu công khai tại địa phương để người dân quyết định.",
        impact: { CT: 10, KT: 0, CB: 0, NG: 0 },
      },
    ],
  },
  {
    id: 22,
    title: "Yêu cầu Bình đẳng giới",
    description:
      "Các nhóm hoạt động vì quyền phụ nữ đang yêu cầu chính phủ ban hành luật đảm bảo 30% số ghế trong quốc hội và các vị trí lãnh đạo doanh nghiệp phải là nữ.",
    icon: HeartHandshake,
    category: "CB",
    choices: [
      {
        text: 'Đồng ý ban hành luật "quota" 30% cho các vị trí trong quốc hội.',
        impact: { CT: 5, KT: 0, CB: 15, NG: 5 },
      },
      {
        text: "Từ chối quota, thay vào đó tăng ngân sách cho các chương trình giáo dục về bình đẳng giới.",
        impact: { CT: -5, KT: -5, CB: 5, NG: 0 },
      },
      {
        text: "Cho rằng năng lực mới là quan trọng, không phải giới tính, và giữ nguyên hiện trạng.",
        impact: { CT: 0, KT: 0, CB: -10, NG: -5 },
      },
      {
        text: "Đặt mục tiêu 30% nhưng không bắt buộc bằng luật, chỉ khuyến khích.",
        impact: { CT: 0, KT: 0, CB: 5, NG: 0 },
      },
    ],
  },

  // --- NGOẠI GIAO (NG) ---
  {
    id: 23,
    title: "Yêu cầu Căn cứ Quân sự",
    description:
      "Nước láng giềng (và là một cường quốc) đề nghị xây dựng một căn cứ quân sự chung gần biên giới để 'tăng cường an ninh khu vực'.",
    icon: Globe,
    category: "NG",
    choices: [
      {
        text: "Chấp thuận ngay lập tức để củng cố liên minh.",
        impact: { CT: -10, KT: 5, CB: 0, NG: 15 },
      },
      {
        text: "Từ chối thẳng thừng, giữ vững chính sách quốc phòng độc lập, trung lập.",
        impact: { CT: 10, KT: 0, CB: 0, NG: -20 },
      },
      {
        text: "Đề nghị một thỏa thuận hợp tác an ninh phi quân sự thay thế, như chống khủng bố.",
        impact: { CT: 5, KT: 0, CB: 0, NG: 5 },
      },
      {
        text: 'Trì hoãn quyết định, nói rằng cần thêm thời gian để "nghiên cứu".',
        impact: { CT: 0, KT: 0, CB: 0, NG: -5 },
      },
    ],
  },
  {
    id: 24,
    title: "Chiến tranh Thương mại",
    description:
      'Hai cường quốc lớn nhất thế giới (cũng là 2 đối tác thương mại lớn nhất của bạn) bắt đầu một cuộc chiến tranh thương mại, yêu cầu bạn phải "chọn phe".',
    icon: Globe,
    category: "NG",
    choices: [
      {
        text: "Ngả về phe A, áp thuế lên hàng hóa của phe B.",
        impact: { CT: 0, KT: -10, CB: 0, NG: -10 },
      },
      {
        text: "Cố gắng duy trì chính sách trung lập, kêu gọi đối thoại qua WTO.",
        impact: { CT: 5, KT: -5, CB: 0, NG: 5 },
      },
      {
        text: "Bí mật tìm cách hưởng lợi từ cuộc chiến bằng cách trở thành trung gian thương mại.",
        impact: { CT: -5, KT: 10, CB: 0, NG: -5 },
      },
      {
        text: "Đa dạng hóa thị trường, tìm kiếm các đối tác thương mại mới để giảm phụ thuộc.",
        impact: { CT: 5, KT: 5, CB: 0, NG: 0 },
      },
    ],
  },
  {
    id: 25,
    title: "Tranh chấp Biên giới",
    description:
      "Một cuộc đụng độ nhỏ vừa xảy ra tại khu vực biên giới đang tranh chấp. Cả hai bên đều có binh lính bị thương. Không khí vô cùng căng thẳng.",
    icon: Globe,
    category: "NG",
    choices: [
      {
        text: "Tăng cường lực lượng quân sự tới biên giới, sẵn sàng đáp trả.",
        impact: { CT: 10, KT: -5, CB: 0, NG: -15 },
      },
      {
        text: "Đơn phương rút quân khỏi khu vực để thể hiện thiện chí, giảm căng thẳng.",
        impact: { CT: -15, KT: 0, CB: 0, NG: 5 },
      },
      {
        text: "Thiết lập đường dây nóng với lãnh đạo nước láng giềng và kêu gọi đàm phán ngay lập tức.",
        impact: { CT: 5, KT: 0, CB: 0, NG: 10 },
      },
      {
        text: "Đưa vấn đề ra Tòa án Công lý Quốc tế và Liên Hợp Quốc.",
        impact: { CT: 5, KT: 0, CB: 0, NG: 5 },
      },
    ],
  },
  {
    id: 26,
    title: "Lời mời tham gia Liên minh Mới",
    description:
      "Một khối các quốc gia đang phát triển mời bạn tham gia một 'Liên minh Kinh tế - Quân sự' mới, nhằm đối trọng với các cường quốc hiện hữu.",
    icon: Globe,
    category: "NG",
    choices: [
      {
        text: "Ký hiệp ước, trở thành thành viên sáng lập của liên minh mới.",
        impact: { CT: 5, KT: 5, CB: 0, NG: 15 },
      },
      {
        text: "Lịch sự từ chối, giữ vững chính sách trung lập, không liên kết.",
        impact: { CT: 0, KT: 0, CB: 0, NG: 0 },
      },
      {
        text: 'Xin tham gia với tư cách là "quan sát viên" thay vì thành viên chính thức.',
        impact: { CT: 5, KT: 0, CB: 0, NG: 5 },
      },
      {
        text: "Chỉ tham gia vào phần kinh tế của liên minh, từ chối các cam kết quân sự.",
        impact: { CT: 5, KT: 5, CB: 0, NG: 5 },
      },
    ],
  },
  {
    id: 27,
    title: "Đối mặt với Cấm vận Quốc tế",
    description:
      "Do các chính sách về môi trường (hoặc nhân quyền) của bạn, một khối các quốc gia phương Tây vừa ban hành lệnh cấm vận lên các mặt hàng xuất khẩu chủ lực.",
    icon: Globe,
    category: "NG",
    choices: [
      {
        text: "Thay đổi chính sách để được gỡ bỏ cấm vận.",
        impact: { CT: -15, KT: 10, CB: 5, NG: 10 },
      },
      {
        text: "Lên án lệnh cấm vận, tìm kiếm các thị trường mới thay thế.",
        impact: { CT: 10, KT: -15, CB: 0, NG: -10 },
      },
      {
        text: "Đàm phán một lộ trình cải cách từng phần để được dỡ bỏ cấm vận dần dần.",
        impact: { CT: 5, KT: 5, CB: 5, NG: 5 },
      },
      {
        text: "Áp đặt lệnh cấm vận trả đũa lên hàng hóa của họ.",
        impact: { CT: 5, KT: -10, CB: 0, NG: -15 },
      },
    ],
  },
  {
    id: 28,
    title: "Khủng hoảng Người tị nạn",
    description:
      "Một cuộc nội chiến ở nước láng giềng khiến hàng trăm ngàn người tị nạn tràn qua biên giới của bạn. Họ cần thức ăn và chỗ ở ngay lập tức.",
    icon: Globe,
    category: "NG",
    choices: [
      {
        text: "Mở cửa biên giới, lập các trại tị nạn và kêu gọi quốc tế hỗ trợ.",
        impact: { CT: -10, KT: -15, CB: 10, NG: 15 },
      },
      {
        text: "Đóng chặt biên giới, ngăn chặn người tị nạn bằng mọi giá.",
        impact: { CT: 5, KT: 0, CB: -20, NG: -20 },
      },
      {
        text: "Chỉ chấp nhận phụ nữ, trẻ em và người già, từ chối nam giới trong độ tuổi chiến đấu.",
        impact: { CT: -5, KT: -10, CB: 0, NG: 0 },
      },
      {
        text: 'Thiết lập một "vùng đệm an toàn" ngay bên ngoài biên giới và cung cấp viện trợ nhân đạo tại đó.',
        impact: { CT: 5, KT: -5, CB: 5, NG: 5 },
      },
    ],
  },
  {
    id: 29,
    title: "Hội nghị Thượng đỉnh về Khí hậu",
    description:
      "Hội nghị Khí hậu Toàn cầu yêu cầu quốc gia của bạn cam kết 'Net-Zero vào năm 2050', đồng nghĩa với việc phải đóng cửa nhiều nhà máy than và thay đổi nền kinh tế.",
    icon: Globe,
    category: "NG",
    choices: [
      {
        text: "Ký cam kết, bất chấp chi phí kinh tế.",
        impact: { CT: 5, KT: -15, CB: 5, NG: 20 },
      },
      {
        text: "Từ chối, cho rằng các nước giàu phải chịu trách nhiệm.",
        impact: { CT: -5, KT: 5, CB: 0, NG: -15 },
      },
      {
        text: "Cam kết có điều kiện, yêu cầu hỗ trợ tài chính và công nghệ từ các nước phát triển.",
        impact: { CT: 5, KT: 0, CB: 5, NG: 10 },
      },
      {
        text: "Tuyên bố sẽ đạt Net-Zero vào năm 2100, chậm hơn 50 năm.",
        impact: { CT: 0, KT: 5, CB: 0, NG: -5 },
      },
    ],
  },
  {
    id: 30,
    title: "Yêu cầu Viện trợ Nhân đạo",
    description:
      "Một quốc gia đồng minh vừa trải qua một trận động đất kinh hoàng. Họ đang khẩn thiết yêu cầu quốc gia của bạn gửi 'viện trợ nhân đạo' (tiền, hàng hóa, và đội cứu hộ).",
    icon: Globe,
    category: "NG",
    choices: [
      {
        text: "Gửi gói viện trợ 100 triệu USD và đội cứu hộ tinh nhuệ.",
        impact: { CT: 5, KT: -10, CB: 0, NG: 15 },
      },
      {
        text: "Gửi thư chia buồn và 1 triệu USD tượng trưng.",
        impact: { CT: 0, KT: -1, CB: 0, NG: -5 },
      },
      {
        text: "Chỉ gửi đội cứu hộ và vật tư y tế, không gửi tiền mặt.",
        impact: { CT: 5, KT: -5, CB: 5, NG: 10 },
      },
      {
        text: "Yêu cầu họ phải trả lại sau khi phục hồi.",
        impact: { CT: -5, KT: 5, CB: -5, NG: -10 },
      },
    ],
  },
];

// Hàm tiện ích để lấy ngẫu nhiên 16 tình huống không lặp lại
export const getRandomScenarios = (count: number): Scenario[] => {
  const shuffled = [...allSituations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
