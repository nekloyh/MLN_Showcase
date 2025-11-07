import { Shield, TrendingUp, HeartHandshake, Globe } from "lucide-react";

// ============================================
// INTERFACE DEFINITIONS
// ============================================

// Định nghĩa chi tiết cho một lựa chọn với hệ thống giải thích
export interface Choice {
  text: string;
  impact: {
    CT: number; // Ổn định Chính trị
    KT: number; // Tăng trưởng Kinh tế
    CB: number; // Công bằng Xã hội
    NG: number; // Ngoại giao
  };
  explanation: string; // Giải thích tại sao có impact này
  historicalExample?: string; // Ví dụ lịch sử tham khảo (tùy chọn)
}

// Định nghĩa cấu trúc cho một Tình huống (Scenario)
export interface Scenario {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  category: "CT" | "KT" | "CB" | "NG"; // Chính trị, Kinh tế, Công bằng, Ngoại giao
  choices: Choice[];
}

// ============================================
// KHO DỮ LIỆU 32 TÌNH HUỐNG
// (ĐÃ ĐIỀU CHỈNH VÀ BỔ SUNG HỆ THỐNG GIẢI THÍCH)
// ============================================

export const allSituations: Scenario[] = [
  // ============================================
  // KINH TẾ (KT) - 8 tình huống
  // ============================================
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
        impact: { CT: 5, KT: -8, CB: 8, NG: 0 },
        explanation:
          "Trợ cấp giúp bảo vệ người tiêu dùng và doanh nghiệp (+8 CB, +5 CT do hành động kịp thời), nhưng tạo gánh nặng ngân sách và có thể gây méo mó thị trường (-8 KT).",
      },
      {
        text: "Đàm phán khẩn cấp với các quốc gia láng giềng tìm nguồn thay thế.",
        impact: { CT: 5, KT: -3, CB: 0, NG: 12 },
        explanation:
          "Giải pháp ngoại giao thông minh, tăng quan hệ song phương (+12 NG) và thể hiện khả năng giải quyết khủng hoảng (+5 CT). Tác động kinh tế tiêu cực nhỏ do chi phí đàm phán và giá cao hơn (-3 KT).",
        historicalExample:
          "Tương tự châu Âu tìm nguồn khí đốt thay thế sau khủng hoảng năng lượng 2022.",
      },
      {
        text: 'Kêu gọi người dân "thắt lưng buộc bụng" và ưu tiên sản xuất nội địa.',
        impact: { CT: 12, KT: -10, CB: -8, NG: 0 },
        explanation:
          "Chính sách tự cường kích thích tinh thần dân tộc (+12 CT), nhưng giảm mức sống do thiếu hàng hóa (-8 CB) và năng suất thấp hơn do thiếu nguyên liệu nhập khẩu (-10 KT).",
        historicalExample:
          "Tương tự chính sách 'tự lực cánh sinh' của Triều Tiên (Juche).",
      },
      {
        text: "Không can thiệp, để thị trường tự điều chỉnh.",
        impact: { CT: -15, KT: -12, CB: -10, NG: 0 },
        explanation:
          "Trong ngắn hạn, thị trường sẽ gặp khó khăn (-12 KT), người dân chịu thiệt (-10 CB), và chính phủ bị chỉ trích là thụ động (-15 CT). Tuy nhiên, đây không phải là thảm họa hoàn toàn như -20 vì thị trường có khả năng tự điều chỉnh một phần.",
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
        impact: { CT: 8, KT: -12, CB: -8, NG: 0 },
        explanation:
          "Công cụ kinh tế chính thống, thể hiện quyết tâm kiềm chế lạm phát (+8 CT). Tuy nhiên, lãi suất cao làm giảm đầu tư và tiêu dùng (-12 KT), khiến vay vốn đắt hơn, ảnh hưởng người nghèo và doanh nghiệp nhỏ (-8 CB).",
        historicalExample:
          "Chính sách của Fed Mỹ dưới thời Paul Volcker (1979-1987) đã dập tắt lạm phát nhưng gây suy thoái.",
      },
      {
        text: "Áp giá trần cho các mặt hàng thiết yếu như lương thực, xăng dầu.",
        impact: { CT: 10, KT: -8, CB: 8, NG: 0 },
        explanation:
          "Biện pháp phổ biến ở các nước đang phát triển. Bảo vệ người tiêu dùng ngay lập tức (+8 CB) và được dân chúng ủng hộ (+10 CT). Nhưng có thể gây thiếu hụt nguồn cung, chợ đen, và giảm động lực sản xuất (-8 KT).",
        historicalExample:
          "Việt Nam áp giá trần xăng dầu giai đoạn 2021-2022, Venezuela với nhiều mặt hàng.",
      },
      {
        text: "Phát hành gói trợ cấp tiền mặt cho toàn dân để đối phó với giá cả.",
        impact: { CT: 8, KT: -18, CB: 12, NG: 0 },
        explanation:
          "Giúp người dân ngay lập tức (+12 CB) và được hoan nghênh (+8 CT). Tuy nhiên, đây là giải pháp 'đổ xăng vào lửa' - tiền mặt nhiều hơn sẽ đẩy lạm phát tăng thêm, tạo vòng luẩn quẩn (-18 KT).",
        historicalExample:
          "Các gói kích thích COVID-19 được cho là đã góp phần vào lạm phát toàn cầu 2021-2022.",
      },
      {
        text: 'Đổ lỗi cho các "đầu nậu tích trữ" và tiến hành các cuộc thanh tra trên toàn quốc.',
        impact: { CT: -8, KT: -3, CB: -5, NG: -3 },
        explanation:
          "Tìm 'vật tế thần' thay vì giải quyết nguyên nhân gốc rễ. Mất uy tín quốc tế (-3 NG) và niềm tin công chúng lâu dài (-8 CT). Tuy nhiên, có thể ngăn chặn đầu cơ ngắn hạn nên KT chỉ -3. Gây lo lắng cho doanh nghiệp (-5 CB).",
        historicalExample:
          "Zimbabwe dưới thời Mugabe, Venezuela dưới thời Maduro đã dùng cách này nhưng thất bại.",
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
        impact: { CT: -5, KT: 20, CB: -12, NG: 8 },
        explanation:
          "Tạo ra hàng nghìn việc làm và thu hút FDI lớn (+20 KT), tăng vị thế quốc tế (+8 NG). Nhưng bị dư luận trong nước chỉ trích về môi trường và 'bán rẻ chủ quyền' (-5 CT, -12 CB do ô nhiễm ảnh hưởng người dân).",
        historicalExample:
          "Trường hợp Formosa Hà Tĩnh tại Việt Nam đã gây tranh cãi lớn về môi trường.",
      },
      {
        text: "Từ chối thẳng thừng để bảo vệ môi trường và doanh nghiệp trong nước.",
        impact: { CT: 8, KT: -8, CB: 8, NG: -5 },
        explanation:
          "Thể hiện chủ quyền và bảo vệ môi trường (+8 CT, +8 CB). Tuy nhiên, mất cơ hội phát triển kinh tế (-8 KT) và có thể bị coi là 'không thân thiện với đầu tư' (-5 NG).",
      },
      {
        text: "Đàm phán lại: Chấp nhận ưu đãi thuế nhưng yêu cầu cam kết môi trường và chuyển giao công nghệ.",
        impact: { CT: 10, KT: 15, CB: 5, NG: 8 },
        explanation:
          "Giải pháp cân bằng nhất. Vẫn thu hút đầu tư lớn (+15 KT), xây dựng năng lực công nghệ (+8 NG), đảm bảo tiêu chuẩn môi trường (+5 CB), và được dư luận ủng hộ do đàm phán khôn ngoan (+10 CT).",
        historicalExample:
          "Mô hình Singapore và Ireland trong thu hút FDI công nghệ cao.",
      },
      {
        text: "Đưa ra đấu thầu công khai, mời các tập đoàn khác cùng tham gia.",
        impact: { CT: 5, KT: 10, CB: 5, NG: 0 },
        explanation:
          "Minh bạch và cạnh tranh (+5 CT, +5 CB). Có thể thu hút nhiều nhà đầu tư và điều kiện tốt hơn (+10 KT), nhưng mất thời gian và có rủi ro không có ai đầu thầu nếu điều kiện không hấp dẫn.",
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
        impact: { CT: -15, KT: 5, CB: -10, NG: -5 },
        explanation:
          "Khôi phục giao thông nhanh chóng (+5 KT ngắn hạn), nhưng gây phẫn nộ công chúng (-15 CT), vi phạm quyền lao động (-10 CB) và hình ảnh quốc tế xấu (-5 NG).",
        historicalExample:
          "Reagan sa thải nhân viên kiểm soát không lưu 1981 - hiệu quả nhưng gây tranh cãi.",
      },
      {
        text: "Chấp nhận giảm 50% thuế nhiên liệu.",
        impact: { CT: 10, KT: -10, CB: 5, NG: 0 },
        explanation:
          "Giải quyết nhanh khủng hoảng (+10 CT), công nhân hài lòng (+5 CB). Nhưng mất nguồn thu lớn và tạo tiền lệ xấu cho các ngành khác (-10 KT).",
      },
      {
        text: "Đàm phán, hứa hẹn tăng lương tối thiểu và lộ trình giảm thuế.",
        impact: { CT: 5, KT: -5, CB: 10, NG: 0 },
        explanation:
          "Giải pháp cân bằng, tôn trọng quyền lao động (+10 CB) và duy trì ổn định (+5 CT). Chi phí tài chính vừa phải (-5 KT) và tránh tiền lệ nguy hiểm.",
        historicalExample:
          "Mô hình đàm phán tam giác (chính phủ-công đoàn-doanh nghiệp) ở Bắc Âu.",
      },
      {
        text: "Đổ lỗi cho phe đối lập và yêu cầu họ quay lại làm việc.",
        impact: { CT: -10, KT: -5, CB: -5, NG: 0 },
        explanation:
          "Chính trị hóa vấn đề lao động, không giải quyết được gốc rễ. Mất uy tín (-10 CT), đình công kéo dài (-5 KT), công nhân thất vọng (-5 CB).",
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
        explanation:
          "Tạo nguồn thu khổng lồ và vị thế chiến lược (đất hiếm quan trọng cho công nghệ cao, +25 KT). Nhưng gây phá môi trường (-15 CB), di dời cộng đồng địa phương, và bị chỉ trích là 'phát triển bất chấp' (-10 CT).",
        historicalExample:
          "Trung Quốc thống trị 80% thị trường đất hiếm nhưng gánh chi phí môi trường khổng lồ.",
      },
      {
        text: "Tuyên bố đây là khu bảo tồn quốc gia, cấm mọi hoạt động khai thác.",
        impact: { CT: 5, KT: -5, CB: 15, NG: 0 },
        explanation:
          "Bảo vệ môi trường và quyền cộng đồng bản địa (+15 CB), được nhóm môi trường ủng hộ (+5 CT). Tuy nhiên, bỏ lỡ cơ hội kinh tế lớn (-5 KT).",
      },
      {
        text: "Cho phép khai thác có kiểm soát với công nghệ hiện đại và quỹ phúc lợi cho người dân địa phương.",
        impact: { CT: 5, KT: 15, CB: 5, NG: 0 },
        explanation:
          "Cân bằng giữa phát triển kinh tế (+15 KT) và trách nhiệm xã hội (+5 CB). Công nghệ sạch và quỹ phúc lợi giúp giảm thiểu tác động tiêu cực (+5 CT).",
        historicalExample:
          "Mô hình khai thác có trách nhiệm của Canada và Australia.",
      },
      {
        text: "Kêu gọi vốn đầu tư nước ngoài để khai thác, chấp nhận chia sẻ lợi nhuận lớn.",
        impact: { CT: -5, KT: 20, CB: -10, NG: 10 },
        explanation:
          "Có công nghệ và vốn nhanh (+20 KT), tăng quan hệ quốc tế (+10 NG). Nhưng bị chỉ trích 'bán tài nguyên quốc gia' (-5 CT) và chia sẻ lợi nhuận nhiều, người dân địa phương ít hưởng lợi (-10 CB).",
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
        impact: { CT: 12, KT: -10, CB: 8, NG: 0 },
        explanation:
          "Chính sách chủ động ngăn chặn bong bóng, bảo vệ hệ thống tài chính (+12 CT). Giảm đầu cơ, giúp người trẻ mua nhà dễ hơn (+8 CB). Tuy nhiên, làm chậm thị trường BĐS ngắn hạn (-10 KT).",
        historicalExample:
          "Singapore, Hàn Quốc đã dùng công cụ này hiệu quả để kiểm soát giá nhà.",
      },
      {
        text: "Không can thiệp, tin rằng thị trường sẽ tự điều chỉnh một cách tự nhiên.",
        impact: { CT: -12, KT: -15, CB: -15, NG: 0 },
        explanation:
          "Rủi ro cao nhưng không phải thảm họa tuyệt đối như -30. Một số thị trường có thể 'hạ cánh mềm'. Tuy nhiên, nếu bong bóng vỡ sẽ gây khủng hoảng tài chính (-15 KT), nhiều người mất tiền (-15 CB), và chính phủ bị đổ lỗi (-12 CT).",
        historicalExample:
          "Khủng hoảng Subprime Mỹ 2008 là ví dụ điển hình khi không can thiệp kịp thời.",
      },
      {
        text: "Đẩy mạnh xây dựng nhà ở xã hội để hạ nhiệt giá nhà.",
        impact: { CT: 8, KT: -8, CB: 18, NG: 0 },
        explanation:
          "Tăng cung nhà ở giá rẻ, giải quyết vấn đề căn bản (+18 CB). Thể hiện cam kết về nhà ở cho người thu nhập thấp (+8 CT). Tuy nhiên, cần ngân sách lớn và thời gian thực hiện (-8 KT).",
        historicalExample:
          "Chương trình HDB của Singapore - mô hình thành công nhất thế giới.",
      },
      {
        text: "Trấn an dư luận và tuyên bố rằng thị trường bất động sản vẫn đang phát triển lành mạnh.",
        impact: { CT: -18, KT: 3, CB: -12, NG: -5 },
        explanation:
          "Có thể duy trì niềm tin ngắn hạn (+3 KT), nhưng khi bong bóng vỡ, uy tín chính phủ sụp đổ hoàn toàn (-18 CT). Người dân cảm thấy bị lừa dối (-12 CB), và cộng đồng quốc tế đánh giá thiếu minh bạch (-5 NG).",
        historicalExample:
          "Chính phủ Nhật Bản trước khủng hoảng BĐS thập niên 1990.",
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
        explanation:
          "Giải quyết ngay khủng hoảng lương thực, bảo vệ người dân (+10 CB, +5 CT). Nhưng tiêu tốn dự trữ ngoại hối (-10 KT) và tăng phụ thuộc nhập khẩu (-5 NG).",
      },
      {
        text: "Bơm tiền hỗ trợ trực tiếp cho nông dân và các hợp tác xã.",
        impact: { CT: 5, KT: -8, CB: 5, NG: 0 },
        explanation:
          "Giúp nông dân phục hồi và chuẩn bị cho vụ sau (+5 CB, +5 CT). Chi phí ngân sách đáng kể (-8 KT) nhưng là đầu tư dài hạn.",
      },
      {
        text: "Ban hành lệnh cấm xuất khẩu gạo để đảm bảo nguồn cung trong nước.",
        impact: { CT: 10, KT: -5, CB: 5, NG: -10 },
        explanation:
          "Ưu tiên người dân trong nước (+10 CT, +5 CB). Mất thu xuất khẩu (-5 KT) và làm xấu uy tín quốc tế, ảnh hưởng các đối tác thương mại (-10 NG).",
        historicalExample:
          "Ấn Độ, Việt Nam đều đã cấm xuất khẩu gạo trong khủng hoảng lương thực 2008.",
      },
      {
        text: "Đầu tư dài hạn vào hệ thống thủy lợi và giống cây trồng chống chịu biến đổi khí hậu.",
        impact: { CT: 5, KT: -15, CB: 5, NG: 0 },
        explanation:
          "Giải pháp căn cơ nhất nhưng cần thời gian. Chi phí ban đầu rất cao (-15 KT), nhưng tạo khả năng chống chịu lâu dài (+5 CB, +5 CT vì tầm nhìn chiến lược).",
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
        explanation:
          "Phản ứng nhanh (+10 CT), giảm thiểu gián đoạn kinh tế. Nhưng chỉ định thầu dễ tham nhũng (-5 CB), chi phí cao hơn bình thường (-15 KT).",
      },
      {
        text: "Làm phà và cầu phao tạm thời trong khi tiến hành đấu thầu công khai để xây cầu mới.",
        impact: { CT: -5, KT: -5, CB: 5, NG: 0 },
        explanation:
          "Minh bạch và tiết kiệm (+5 CB). Tuy nhiên, giải pháp tạm thời làm chậm lưu thông (-5 KT), người dân bất tiện trong thời gian dài (-5 CT).",
      },
      {
        text: "Kêu gọi khu vực tư nhân đầu tư xây cầu mới theo hình thức BOT (Xây dựng-Vận hành-Chuyển giao).",
        impact: { CT: 5, KT: 5, CB: -5, NG: 0 },
        explanation:
          "Tiết kiệm ngân sách (+5 KT), có cầu nhanh (+5 CT). Nhưng phí qua cầu cao, ảnh hưởng người dân và doanh nghiệp nhỏ (-5 CB).",
        historicalExample: "Nhiều dự án giao thông BOT ở Việt Nam, Thái Lan.",
      },
      {
        text: "Huy động lực lượng quân đội để xây dựng cầu dã chiến trong thời gian ngắn nhất.",
        impact: { CT: 15, KT: -10, CB: 0, NG: 0 },
        explanation:
          "Thể hiện quyết đoán và hiệu quả của bộ máy nhà nước (+15 CT). Quân đội làm nhanh nhưng chất lượng có thể không bằng chuyên nghiệp (-10 KT cho chi phí dài hạn).",
      },
    ],
  },

  // ============================================
  // CHÍNH TRỊ (CT) - 7 tình huống
  // ============================================
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
        explanation:
          "Hành động quyết đoán chống tham nhũng tăng niềm tin công chúng mạnh mẽ (+15 CT). Thể hiện cam kết pháp trị và không bảo vệ người thân (+5 CB). Tác động kinh tế ngắn hạn không đáng kể.",
        historicalExample:
          "Chiến dịch chống tham nhũng ở Singapore thập niên 1960 dưới thời Lý Quang Diệu đã xây dựng nền tảng cho quốc gia sạch nhất châu Á.",
      },
      {
        text: "Bác bỏ cáo buộc, cho rằng đây là âm mưu của phe đối lập và yêu cầu báo chí ngừng đưa tin.",
        impact: { CT: -20, KT: 0, CB: -10, NG: -5 },
        explanation:
          "Hành động này phá hủy uy tín nghiêm trọng (-20 CT). Công chúng cảm thấy bị che đậy và quyền tự do báo chí bị xâm phạm (-10 CB). Cộng đồng quốc tế lo ngại về độc tài (-5 NG).",
        historicalExample:
          "Nhiều chế độ độc tài đã dùng cách này và cuối cùng mất quyền lực.",
      },
      {
        text: 'Bí mật điều chuyển Bộ trưởng sang một vị trí ít quan trọng hơn để "hạ cánh an toàn".',
        impact: { CT: -10, KT: 0, CB: -5, NG: 0 },
        explanation:
          "Cố gắng che đậy nhưng thông tin rò rỉ sẽ gây mất lòng tin (-10 CT). Dư luận cảm thấy công lý không được thực thi (-5 CB). Là giải pháp 'ôn hòa' nên không phá hủy hoàn toàn như lựa chọn 2.",
      },
      {
        text: "Thành lập một ủy ban điều tra độc lập bao gồm cả đại diện phe đối lập.",
        impact: { CT: 10, KT: 0, CB: 10, NG: 0 },
        explanation:
          "Thể hiện cam kết minh bạch và công bằng (+10 CT, +10 CB). Bao gồm đối lập cho thấy không sợ sự thật. Đây là giải pháp dân chủ và được quốc tế hoan nghênh.",
        historicalExample:
          "Ủy ban điều tra độc lập ở Nam Phi sau apartheid (Truth and Reconciliation Commission).",
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
        impact: { CT: 10, KT: -10, CB: -20, NG: -15 },
        explanation:
          "Trong ngắn hạn, hành động cứng rắn thu được sự ủng hộ từ phe dân tộc chủ nghĩa và những người ủng hộ thống nhất (+10 CT ngắn hạn). Tuy nhiên, đây là vi phạm nghiêm trọng nhân quyền (-20 CB), gây thiệt hại kinh tế (-10 KT), và bị cộng đồng quốc tế lên án mạnh (-15 NG).",
        historicalExample:
          "Tây Ban Nha với Catalonia 2017, Thổ Nhĩ Kỳ với người Kurd - hành động cứng rắn tăng ủng hộ ngắn hạn nhưng tạo vết thương lâu dài.",
      },
      {
        text: "Mời lãnh đạo phong trào đối thoại, hứa hẹn trao thêm quyền tự trị và chia sẻ lợi ích kinh tế.",
        impact: { CT: 15, KT: -3, CB: 10, NG: 10 },
        explanation:
          "Giải pháp hòa bình và dân chủ nhất, tăng uy tín chính phủ (+15 CT). Tôn trọng quyền tự quyết (+10 CB), được quốc tế hoan nghênh (+10 NG). Chi phí tự trị có thể giảm kiểm soát trung ương một phần (-3 KT).",
        historicalExample:
          "Canada với Quebec, UK với Scotland - mô hình liên bang và tự trị thành công.",
      },
      {
        text: "Tổ chức một cuộc trưng cầu dân ý về việc ly khai tại tỉnh đó.",
        impact: { CT: -5, KT: -8, CB: 8, NG: -5 },
        explanation:
          "Tôn trọng dân chủ (+8 CB), nhưng rủi ro cao: nếu kết quả là ly khai, quốc gia mất lãnh thổ (-8 KT, -5 CT). Quốc tế lo ngại về tiền lệ (-5 NG).",
        historicalExample:
          "Brexit 2016, trưng cầu dân ý Scotland 2014 - rủi ro không kiểm soát được kết quả.",
      },
      {
        text: "Phớt lờ các yêu sách, đồng thời tăng cường tuyên truyền về sự thống nhất quốc gia.",
        impact: { CT: -15, KT: 0, CB: -10, NG: -5 },
        explanation:
          "Không giải quyết gốc rễ, phong trào sẽ leo thang (-15 CT). Người dân tỉnh cảm thấy bị phớt lờ (-10 CB). Cộng đồng quốc tế lo ngại về khả năng bạo lực (-5 NG).",
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
        impact: { CT: 5, KT: -8, CB: -18, NG: -8 },
        explanation:
          "Ngăn chặn tin giả lây lan nhanh (+5 CT ngắn hạn). Nhưng vi phạm tự do ngôn luận nghiêm trọng (-18 CB), ảnh hưởng kinh tế số (-8 KT), và bị cộng đồng quốc tế chỉ trích (-8 NG).",
        historicalExample:
          "Myanmar đóng Internet 2021, Iran trong biểu tình 2022 - bị lên án mạnh về nhân quyền.",
      },
      {
        text: "Tổ chức họp báo hàng ngày, công bố dữ liệu minh bạch và hợp tác với các nền tảng để gỡ bỏ tin giả.",
        impact: { CT: 15, KT: 0, CB: 10, NG: 5 },
        explanation:
          "Giải pháp tốt nhất. Minh bạch xây dựng lòng tin (+15 CT). Tôn trọng tự do ngôn luận nhưng vẫn chống tin giả (+10 CB). Hợp tác với Big Tech được quốc tế đánh giá cao (+5 NG).",
        historicalExample:
          "New Zealand, Đài Loan trong COVID-19 - họp báo hàng ngày, fact-checking hiệu quả.",
      },
      {
        text: "Tung ra một chiến dịch tuyên truyền của riêng chính phủ để phản bác lại.",
        impact: { CT: -8, KT: -3, CB: -10, NG: -3 },
        explanation:
          "Tạo ra 'chiến tranh thông tin', mất uy tín khi dùng propaganda (-8 CT). Tốn kém ngân sách (-3 KT), công chúng nghi ngờ cả hai bên (-10 CB).",
      },
      {
        text: 'Thành lập lực lượng "không gian mạng" để chủ động tấn công các nguồn phát tán tin giả.',
        impact: { CT: 3, KT: -5, CB: -15, NG: -8 },
        explanation:
          "Có hiệu quả ngắn hạn (+3 CT), nhưng gây lo ngại về giám sát và kiểm duyệt (-15 CB). Chi phí công nghệ cao (-5 KT). Quốc tế lo ngại về 'cyber warfare' (-8 NG).",
        historicalExample:
          "Trung Quốc với '50 Cent Army' - hiệu quả nhưng gây tranh cãi về tự do.",
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
        explanation:
          "Hành động quyết đoán xây dựng pháp trị (+15 CT, +10 CB). Hệ thống tư pháp công bằng thu hút đầu tư (+10 KT, +5 NG).",
        historicalExample:
          "Singapore, Rwanda sau 1994 - cải cách tư pháp triệt để tạo nền tảng phát triển.",
      },
      {
        text: "Hứa hẹn sẽ xem xét và thành lập một ủy ban nghiên cứu trong vài năm tới.",
        impact: { CT: -5, KT: -5, CB: -5, NG: -5 },
        explanation:
          "Giải pháp trì hoãn, không giải quyết vấn đề. Mất lòng tin mọi bên (-5 tất cả các chỉ số).",
      },
      {
        text: "Tăng lương cho các thẩm phán và công tố viên để chống tham nhũng.",
        impact: { CT: 5, KT: -5, CB: 5, NG: 0 },
        explanation:
          "Giải quyết một phần nguyên nhân (lương thấp dẫn đến tham nhũng, +5 CT, +5 CB). Chi phí ngân sách (-5 KT). Nhưng không giải quyết các thẩm phán đã tham nhũng.",
        historicalExample:
          "Mô hình tăng lương công chức ở Singapore để chống tham nhũng.",
      },
      {
        text: "Bác bỏ các cáo buộc và tuyên bố hệ thống tư pháp vẫn hoạt động tốt.",
        impact: { CT: -15, KT: -10, CB: -10, NG: -5 },
        explanation:
          "Phủ nhận vấn đề nghiêm trọng, mất hoàn toàn lòng tin công chúng (-15 CT, -10 CB). Nhà đầu tư lo ngại về môi trường pháp lý (-10 KT, -5 NG).",
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
        explanation:
          "Che giấu thông tin khiến người dân không thể tự bảo vệ mình (-5 CB). Khi sự thật lộ ra, uy tín sụp đổ (-10 CT).",
      },
      {
        text: "Công khai xin lỗi, cảnh báo người dân và đưa ra các biện pháp khắc phục, hỗ trợ.",
        impact: { CT: 5, KT: 0, CB: 5, NG: 0 },
        explanation:
          "Minh bạch và trách nhiệm, tuy gây sốc ban đầu nhưng xây dựng lòng tin dài hạn (+5 CT). Giúp người dân tự bảo vệ (+5 CB).",
        historicalExample:
          "Target, Equifax Mỹ công khai rò rỉ dữ liệu và đưa ra giải pháp bồi thường.",
      },
      {
        text: "Đổ lỗi cho một thế lực thù địch nước ngoài đứng sau vụ tấn công.",
        impact: { CT: 0, KT: 0, CB: 0, NG: -5 },
        explanation:
          "Đánh lạc hướng, không giải quyết vấn đề an ninh mạng. Quốc tế nghi ngờ và có thể gây căng thẳng ngoại giao (-5 NG).",
      },
      {
        text: "Yêu cầu tất cả công dân phải đổi mật khẩu và các thông tin xác thực ngay lập tức.",
        impact: { CT: -5, KT: -5, CB: -5, NG: 0 },
        explanation:
          "Gây bất tiện lớn cho hàng triệu người (-5 CB), hệ thống quá tải (-5 KT), và không giải quyết trách nhiệm của chính phủ (-5 CT).",
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
        explanation:
          "Bác bỏ ý chí dân chủ, gây phẫn nộ (-15 CT). Công chúng cảm thấy không được lắng nghe (-5 CB).",
      },
      {
        text: "Đồng ý thành lập Ủy ban soạn thảo Hiến pháp mới, bao gồm nhiều thành phần xã hội.",
        impact: { CT: 10, KT: 0, CB: 5, NG: 0 },
        explanation:
          "Thể hiện tinh thần dân chủ và sẵn sàng cải cách (+10 CT). Tôn trọng tiếng nói nhân dân (+5 CB).",
        historicalExample:
          "Iceland 2011 - soạn thảo Hiến pháp crowdsourcing từ công dân.",
      },
      {
        text: "Đề xuất một cuộc trưng cầu dân ý về việc có nên sửa đổi Hiến pháp hay không.",
        impact: { CT: 5, KT: 0, CB: 5, NG: 0 },
        explanation:
          "Giao quyền quyết định cho nhân dân (+5 CB, +5 CT). Kết quả sẽ có tính chính danh cao.",
      },
      {
        text: "Giải tán quốc hội và kêu gọi một cuộc bầu cử sớm.",
        impact: { CT: -20, KT: -10, CB: -10, NG: -5 },
        explanation:
          "Hành động độc đoán, phá vỡ trật tự hiến định (-20 CT). Gây bất ổn chính trị và kinh tế (-10 KT, -10 CB), quốc tế lo ngại (-5 NG).",
        historicalExample:
          "Các cuộc đảo chính hợp hiến ở Thái Lan - gây bất ổn lâu dài.",
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
        explanation:
          "Chiến dịch hợp lý, tăng nhận thức về thành tựu (+5 CT). Chi phí tuyên truyền (-5 KT).",
      },
      {
        text: "Ban hành một gói cắt giảm thuế phổ thông để lấy lòng cử tri.",
        impact: { CT: 5, KT: -10, CB: 5, NG: 0 },
        explanation:
          "Phổ biến trong chính trị ('vote buying'), tăng ủng hộ ngắn hạn (+5 CT, +5 CB). Nhưng giảm nguồn thu lớn (-10 KT) và có thể bị chỉ trích là dân túy.",
      },
      {
        text: "Tấn công mạnh mẽ vào các bê bối của phe đối lập.",
        impact: { CT: 0, KT: 0, CB: -5, NG: 0 },
        explanation:
          "Chiến dịch tiêu cực (negative campaign) có thể hiệu quả ngắn hạn nhưng gây phản cảm cho cử tri (-5 CB).",
      },
      {
        text: "Tập trung vào việc điều hành đất nước, để kết quả tự nói lên.",
        impact: { CT: 0, KT: 0, CB: 0, NG: 0 },
        explanation:
          "Chiến lược trung lập. Nếu thành tích tốt sẽ thắng, nếu kém sẽ thua. Không có tác động đặc biệt nào.",
      },
    ],
  },

  // ============================================
  // CÔNG BẰNG XÃ HỘI (CB) - 7 tình huống
  // ============================================
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
        explanation:
          "Đáp ứng phần lớn yêu sách (+10 CB, +5 CT do giải quyết khủng hoảng). Chi phí ngân sách lớn (-10 KT).",
        historicalExample:
          "Chile sau biểu tình sinh viên 2011 đã cải cách giáo dục đại học.",
      },
      {
        text: "Cho rằng đây là yêu sách vô lý, chờ họ tự giải tán.",
        impact: { CT: -5, KT: 0, CB: -10, NG: 0 },
        explanation:
          "Không giải quyết vấn đề, phong trào có thể leo thang (-5 CT). Sinh viên và gia đình thất vọng (-10 CB).",
      },
      {
        text: "Sử dụng lực lượng an ninh để giải tán biểu tình và lập lại trật tự.",
        impact: { CT: -15, KT: 0, CB: -15, NG: -5 },
        explanation:
          "Bạo lực với sinh viên gây phẫn nộ lớn (-15 CT, -15 CB). Hình ảnh quốc tế xấu (-5 NG).",
        historicalExample:
          "Sự kiện Thiên An Môn 1989 Trung Quốc - hậu quả nghiêm trọng về uy tín.",
      },
      {
        text: "Đề xuất một lộ trình miễn giảm học phí dài hạn, gắn với kết quả học tập.",
        impact: { CT: 5, KT: -5, CB: 5, NG: 0 },
        explanation:
          "Cân bằng giữa công bằng (miễn giảm cho người nghèo, +5 CB) và trách nhiệm (gắn với thành tích). Chi phí vừa phải (-5 KT).",
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
        impact: { CT: -3, KT: -8, CB: 18, NG: 5 },
        explanation:
          "Giảm bất bình đẳng hiệu quả (+18 CB), được quốc tế đánh giá cao về công bằng (+5 NG). Giới giàu phản đối (-3 CT), có thể làm chậm đầu tư ngắn hạn (-8 KT).",
        historicalExample:
          "Pháp, Bắc Âu có thuế lũy tiến cao - xã hội công bằng hơn.",
      },
      {
        text: 'Giảm thuế cho doanh nghiệp, hy vọng lợi ích sẽ "nhỏ giọt" xuống người nghèo.',
        impact: { CT: -12, KT: 8, CB: -18, NG: 0 },
        explanation:
          "Lý thuyết 'trickle-down economics' gây tranh cãi. Tăng lợi nhuận doanh nghiệp (+8 KT), nhưng thực tế bất bình đẳng tăng (-18 CB). Dư luận phản đối mạnh (-12 CT).",
        historicalExample:
          "Reaganomics Mỹ thập niên 1980 - tranh cãi về hiệu quả với người nghèo.",
      },
      {
        text: "Tăng cường các chương trình phúc lợi xã hội, y tế và giáo dục miễn phí.",
        impact: { CT: 8, KT: -12, CB: 20, NG: 3 },
        explanation:
          "Giải pháp nhà nước phúc lợi (welfare state), giảm bất bình đẳng mạnh nhất (+20 CB). Được quốc tế ủng hộ (+3 NG), người dân hài lòng (+8 CT). Chi phí ngân sách rất lớn (-12 KT).",
        historicalExample:
          "Mô hình Bắc Âu (Thụy Điển, Na Uy, Đan Mạch) - xã hội bình đẳng nhất thế giới.",
      },
      {
        text: "Kêu gọi giới nhà giàu tự nguyện làm từ thiện nhiều hơn.",
        impact: { CT: -5, KT: 0, CB: -3, NG: -3 },
        explanation:
          "Không có cơ chế bắt buộc, hiệu quả thấp (-3 CB). Mất uy tín do thiếu hành động thực chất (-5 CT, -3 NG).",
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
        explanation:
          "Phản ứng nhanh, bảo vệ ngư dân và môi trường (+10 CB, +5 CT). Chi phí khẩn cấp lớn (-10 KT). Tranh chấp pháp lý với công ty nước ngoài có thể căng thẳng ngoại giao (-5 NG).",
      },
      {
        text: "Cố gắng che giấu quy mô thảm họa để cứu ngành du lịch trong ngắn hạn.",
        impact: { CT: -15, KT: -5, CB: -20, NG: 0 },
        explanation:
          "Khi sự thật bại lộ, uy tín sụp đổ hoàn toàn (-15 CT). Ngư dân và dân địa phương bị bỏ rơi (-20 CB). Du lịch vẫn bị ảnh hưởng khi thông tin lan ra (-5 KT).",
        historicalExample:
          "Chernobyl 1986 - che giấu ban đầu làm hậu quả tệ hơn.",
      },
      {
        text: "Huy động quân đội và tình nguyện viên tham gia dọn dẹp sự cố.",
        impact: { CT: 10, KT: -5, CB: 5, NG: 0 },
        explanation:
          "Hành động quyết đoán và đoàn kết (+10 CT), giúp đỡ cộng đồng (+5 CB). Chi phí huy động và tác động kinh tế ngắn hạn (-5 KT).",
      },
      {
        text: "Kiện công ty tàu dầu ra tòa án quốc tế.",
        impact: { CT: 0, KT: -5, CB: 5, NG: 5 },
        explanation:
          "Tìm kiếm công lý quốc tế (+5 NG, +5 CB). Nhưng mất thời gian, trong khi thiệt hại vẫn tiếp diễn (-5 KT).",
        historicalExample:
          "Vụ Exxon Valdez 1989 - kiện tụng kéo dài hàng thập kỷ.",
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
        explanation:
          "Cải cách từng bước, tăng đa nguyên thông tin (+10 CB, +5 NG). Phe bảo thủ phản đối do lo ngại mất kiểm soát (-10 CT).",
      },
      {
        text: "Siết chặt hơn nữa kiểm duyệt, coi đây là hành vi thù địch.",
        impact: { CT: 5, KT: 0, CB: -10, NG: -10 },
        explanation:
          "Phe cứng rắn ủng hộ (+5 CT ngắn hạn), nhưng vi phạm tự do báo chí (-10 CB) và bị quốc tế lên án (-10 NG).",
        historicalExample:
          "Nhiều chế độ độc tài đã dùng cách này và cuối cùng bị cô lập.",
      },
      {
        text: "Giữ nguyên hiện trạng nhưng hứa sẽ tăng cường đối thoại với báo chí.",
        impact: { CT: 0, KT: 0, CB: -5, NG: -5 },
        explanation:
          "Không giải quyết vấn đề, lời hứa suông. Nhà báo thất vọng (-5 CB, -5 NG).",
      },
      {
        text: "Tổ chức một hội nghị về tự do báo chí để thảo luận công khai.",
        impact: { CT: 5, KT: 0, CB: 5, NG: 5 },
        explanation:
          "Mở đối thoại, thể hiện thiện chí (+5 tất cả chỉ số liên quan). Đây là bước đầu tích cực.",
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
        impact: { CT: 8, KT: -18, CB: 20, NG: 0 },
        explanation:
          "Giải pháp căn bản nhất, bảo vệ quyền chăm sóc sức khỏe (+20 CB). Thể hiện cam kết (+8 CT). Chi phí rất lớn và mất nhiều năm (-18 KT).",
        historicalExample:
          "Bệnh viện dã chiến COVID-19 Trung Quốc - xây nhanh nhưng tốn kém.",
      },
      {
        text: "Kêu gọi tư nhân đầu tư vào y tế, giảm gánh nặng cho nhà nước.",
        impact: { CT: -3, KT: 10, CB: -12, NG: 5 },
        explanation:
          "Giải pháp thị trường, tăng năng lực y tế (+10 KT, +5 NG do thu hút FDI). Nhưng y tế tư nhân đắt đỏ, người nghèo khó tiếp cận (-12 CB). Dư luận có thể chỉ trích 'tư nhân hóa' y tế (-3 CT).",
        historicalExample: "Mô hình Mỹ - hiệu quả nhưng bất công.",
      },
      {
        text: "Tăng cường hệ thống bảo hiểm y tế toàn dân và y tế dự phòng.",
        impact: { CT: 10, KT: -10, CB: 18, NG: 5 },
        explanation:
          "Giải pháp cân bằng, bảo vệ sức khỏe toàn dân (+18 CB), được quốc tế đánh giá cao (+5 NG). Thể hiện chính sách xã hội tiến bộ (+10 CT). Chi phí đáng kể (-10 KT).",
        historicalExample:
          "NHS Anh, Medicare Australia - mô hình bảo hiểm y tế toàn dân.",
      },
      {
        text: "Tăng lương và đãi ngộ cho các y bác sĩ để giữ chân nhân tài.",
        impact: { CT: 8, KT: -10, CB: 12, NG: 0 },
        explanation:
          "Giải quyết vấn đề 'chảy máu chất xám' y tế, tăng chất lượng dịch vụ (+12 CB, +8 CT). Chi phí lương cao (-10 KT).",
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
        explanation:
          "Bảo vệ di sản văn hóa (+10 CB, +5 CT từ phe bảo tồn). Mất cơ hội phát triển kinh tế (-10 KT).",
      },
      {
        text: "Di dời ngôi đền đến một địa điểm khác để xây dựng TTTM.",
        impact: { CT: -5, KT: 10, CB: -10, NG: 0 },
        explanation:
          "Ưu tiên kinh tế (+10 KT), nhưng bị chỉ trích 'phá hoại văn hóa' (-10 CB, -5 CT).",
        historicalExample:
          "Abu Simbel Ai Cập di dời do đập Aswan - thành công nhưng tranh cãi.",
      },
      {
        text: "Tìm cách quy hoạch lại dự án để TTTM và ngôi đền cùng tồn tại hài hòa.",
        impact: { CT: 5, KT: 5, CB: 5, NG: 0 },
        explanation:
          "Giải pháp sáng tạo, cân bằng phát triển và bảo tồn (+5 tất cả). Có thể tạo điểm đến du lịch độc đáo.",
        historicalExample:
          "Nhiều dự án ở Nhật Bản kết hợp chùa cổ với kiến trúc hiện đại.",
      },
      {
        text: "Tổ chức một cuộc bỏ phiếu công khai tại địa phương để người dân quyết định.",
        impact: { CT: 10, KT: 0, CB: 0, NG: 0 },
        explanation:
          "Dân chủ trực tiếp, giao quyền cho cộng đồng địa phương (+10 CT). Kết quả có tính chính danh cao.",
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
        explanation:
          "Thúc đẩy bình đẳng giới mạnh mẽ (+15 CB), được quốc tế hoan nghênh (+5 NG). Một số phe bảo thủ phản đối nhưng xu hướng toàn cầu ủng hộ (+5 CT).",
        historicalExample:
          "Rwanda, Thụy Điển có tỷ lệ nữ trong quốc hội cao nhất thế giới nhờ quota.",
      },
      {
        text: "Từ chối quota, thay vào đó tăng ngân sách cho các chương trình giáo dục về bình đẳng giới.",
        impact: { CT: -5, KT: -5, CB: 5, NG: 0 },
        explanation:
          "Giải pháp dài hạn nhưng chậm (+5 CB). Các nhóm vận động thất vọng (-5 CT). Chi phí giáo dục (-5 KT).",
      },
      {
        text: "Cho rằng năng lực mới là quan trọng, không phải giới tính, và giữ nguyên hiện trạng.",
        impact: { CT: 0, KT: 0, CB: -10, NG: -5 },
        explanation:
          "Lập luận dựa trên meritocracy, nhưng bỏ qua rào cản cấu trúc. Các nhóm quyền phụ nữ phản đối (-10 CB, -5 NG).",
      },
      {
        text: "Đặt mục tiêu 30% nhưng không bắt buộc bằng luật, chỉ khuyến khích.",
        impact: { CT: 0, KT: 0, CB: 5, NG: 0 },
        explanation:
          "Giải pháp ôn hòa, thể hiện thiện chí (+5 CB) nhưng hiệu quả thấp nếu không có cơ chế bắt buộc.",
      },
    ],
  },

  // ============================================
  // NGOẠI GIAO (NG) - 8 tình huống
  // ============================================
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
        impact: { CT: -15, KT: 10, CB: -5, NG: 20 },
        explanation:
          "Nhận được viện trợ quân sự và kinh tế lớn (+20 NG, +10 KT). Nhưng bị chỉ trích 'mất chủ quyền' (-15 CT), dư luận lo ngại an ninh (-5 CB).",
        historicalExample:
          "Philippines cho Mỹ thuê căn cứ quân sự - tranh cãi về chủ quyền.",
      },
      {
        text: "Từ chối thẳng thừng, giữ vững chính sách quốc phòng độc lập, trung lập.",
        impact: { CT: 15, KT: -5, CB: 5, NG: -15 },
        explanation:
          "Thể hiện chủ quyền mạnh mẽ (+15 CT, +5 CB). Mất viện trợ và có thể bị áp lực (-15 NG, -5 KT).",
        historicalExample: "Thụy Sĩ, Áo trung lập - tôn trọng quốc tế.",
      },
      {
        text: "Đề nghị một thỏa thuận hợp tác an ninh phi quân sự thay thế, như chống khủng bố.",
        impact: { CT: 10, KT: 0, CB: 3, NG: 10 },
        explanation:
          "Giải pháp cân bằng, hợp tác nhưng không mất chủ quyền (+10 CT, +10 NG, +3 CB).",
      },
      {
        text: 'Trì hoãn quyết định, nói rằng cần thêm thời gian để "nghiên cứu".',
        impact: { CT: -3, KT: 0, CB: 0, NG: -8 },
        explanation: "Thiếu quyết đoán, mất uy tín cả hai phía (-3 CT, -8 NG).",
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
        explanation:
          "Mất thị trường phe B (-10 KT), căng thẳng ngoại giao (-10 NG). Phe A có thể không đền bù đủ.",
      },
      {
        text: "Cố gắng duy trì chính sách trung lập, kêu gọi đối thoại qua WTO.",
        impact: { CT: 5, KT: -5, CB: 0, NG: 5 },
        explanation:
          "Thể hiện độc lập và nguyên tắc (+5 CT, +5 NG). Vẫn chịu ảnh hưởng kinh tế do thị trường toàn cầu giảm (-5 KT).",
        historicalExample: "Singapore trong chiến tranh thương mại Mỹ-Trung.",
      },
      {
        text: "Bí mật tìm cách hưởng lợi từ cuộc chiến bằng cách trở thành trung gian thương mại.",
        impact: { CT: -5, KT: 10, CB: 0, NG: -5 },
        explanation:
          "Cơ hội kinh tế ngắn hạn (+10 KT). Nhưng nếu lộ ra sẽ mất uy tín (-5 CT, -5 NG).",
      },
      {
        text: "Đa dạng hóa thị trường, tìm kiếm các đối tác thương mại mới để giảm phụ thuộc.",
        impact: { CT: 5, KT: 5, CB: 0, NG: 0 },
        explanation:
          "Chiến lược dài hạn tốt, tăng khả năng chống chịu (+5 CT, +5 KT).",
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
        explanation:
          "Thể hiện quyết tâm bảo vệ lãnh thổ (+10 CT). Rủi ro chiến tranh cao, ảnh hưởng kinh tế (-5 KT), và bị quốc tế chỉ trích là leo thang (-15 NG).",
      },
      {
        text: "Đơn phương rút quân khỏi khu vực để thể hiện thiện chí, giảm căng thẳng.",
        impact: { CT: -15, KT: 0, CB: 0, NG: 5 },
        explanation:
          "Giảm căng thẳng (+5 NG), nhưng bị coi là yếu đuối, mất uy tín trong nước (-15 CT).",
      },
      {
        text: "Thiết lập đường dây nóng với lãnh đạo nước láng giềng và kêu gọi đàm phán ngay lập tức.",
        impact: { CT: 5, KT: 0, CB: 0, NG: 10 },
        explanation:
          "Giải pháp ngoại giao tốt nhất, ngăn chiến tranh (+10 NG), thể hiện trách nhiệm (+5 CT).",
        historicalExample:
          "Đường dây nóng Mỹ-Liên Xô trong Chiến tranh Lạnh ngăn ngừa nhiều xung đột.",
      },
      {
        text: "Đưa vấn đề ra Tòa án Công lý Quốc tế và Liên Hợp Quốc.",
        impact: { CT: 5, KT: 0, CB: 0, NG: 5 },
        explanation:
          "Tôn trọng luật pháp quốc tế (+5 NG, +5 CT), nhưng mất nhiều thời gian và kết quả không chắc chắn.",
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
        explanation:
          "Tăng vị thế quốc tế và hợp tác khu vực (+15 NG). Cơ hội thương mại mới (+5 KT). Thể hiện tầm nhìn chiến lược (+5 CT).",
        historicalExample: "ASEAN, BRICS - các liên minh thành công.",
      },
      {
        text: "Lịch sự từ chối, giữ vững chính sách trung lập, không liên kết.",
        impact: { CT: 0, KT: 0, CB: 0, NG: 0 },
        explanation:
          "Trung lập không ảnh hưởng gì. An toàn nhưng bỏ lỡ cơ hội.",
      },
      {
        text: 'Xin tham gia với tư cách là "quan sát viên" thay vì thành viên chính thức.',
        impact: { CT: 5, KT: 0, CB: 0, NG: 5 },
        explanation:
          "Thận trọng, theo dõi trước khi cam kết (+5 CT, +5 NG). Hưởng lợi ít hơn nhưng rủi ro thấp.",
      },
      {
        text: "Chỉ tham gia vào phần kinh tế của liên minh, từ chối các cam kết quân sự.",
        impact: { CT: 5, KT: 5, CB: 0, NG: 5 },
        explanation:
          "Cân bằng lợi ích kinh tế (+5 KT) và tránh rủi ro quân sự (+5 CT, +5 NG).",
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
        explanation:
          "Khôi phục thương mại (+10 KT, +10 NG). Cải thiện nhân quyền/môi trường (+5 CB). Nhưng bị chỉ trích là 'khuất phục áp lực' (-15 CT).",
      },
      {
        text: "Lên án lệnh cấm vận, tìm kiếm các thị trường mới thay thế.",
        impact: { CT: 10, KT: -15, CB: 0, NG: -10 },
        explanation:
          "Thể hiện tự chủ (+10 CT). Nhưng mất thị trường lớn (-15 KT), quan hệ quốc tế xấu đi (-10 NG).",
        historicalExample:
          "Triều Tiên, Iran đối phó cấm vận - khó khăn kinh tế lớn.",
      },
      {
        text: "Đàm phán một lộ trình cải cách từng phần để được dỡ bỏ cấm vận dần dần.",
        impact: { CT: 5, KT: 5, CB: 5, NG: 5 },
        explanation:
          "Giải pháp cân bằng nhất, thể hiện thiện chí nhưng không đầu hàng hoàn toàn (+5 tất cả).",
        historicalExample:
          "Thỏa thuận hạt nhân Iran 2015 (JCPOA) - đàm phán từng bước.",
      },
      {
        text: "Áp đặt lệnh cấm vận trả đũa lên hàng hóa của họ.",
        impact: { CT: 5, KT: -10, CB: 0, NG: -15 },
        explanation:
          "Thể hiện không khuất phục (+5 CT), nhưng làm tình hình tệ hơn (-10 KT), quan hệ quốc tế xấu đi nghiêm trọng (-15 NG).",
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
        impact: { CT: -15, KT: -12, CB: 15, NG: 20 },
        explanation:
          "Hành động nhân đạo cao cả (+15 CB, +20 NG). Nhưng gánh nặng kinh tế lớn (-12 KT), và có phản ứng chính trị từ dân địa phương (-15 CT).",
        historicalExample:
          "Đức tiếp nhận 1 triệu người tị nạn 2015 - được quốc tế ngợi ca nhưng gây tranh cãi nội bộ.",
      },
      {
        text: "Đóng chặt biên giới, ngăn chặn người tị nạn bằng mọi giá.",
        impact: { CT: 8, KT: 0, CB: -25, NG: -25 },
        explanation:
          "Phe dân tộc chủ nghĩa ủng hộ (+8 CT). Nhưng vi phạm nghiêm trọng nhân quyền (-25 CB), bị lên án quốc tế mạnh mẽ (-25 NG).",
        historicalExample:
          "Hungary đóng biên giới 2015 - bị EU lên án, kiện ra tòa.",
      },
      {
        text: "Chỉ chấp nhận phụ nữ, trẻ em và người già, từ chối nam giới trong độ tuổi chiến đấu.",
        impact: { CT: 0, KT: -8, CB: -8, NG: -10 },
        explanation:
          "Thực dụng nhưng phân biệt đối xử (-8 CB, -10 NG). Chi phí vẫn cao (-8 KT).",
      },
      {
        text: 'Thiết lập một "vùng đệm an toàn" ngay bên ngoài biên giới và cung cấp viện trợ nhân đạo tại đó.',
        impact: { CT: 10, KT: -5, CB: 8, NG: 12 },
        explanation:
          "Giải pháp Thổ Nhĩ Kỳ-Syria, cân bằng nhân đạo (+8 CB, +12 NG) và an ninh quốc gia (+10 CT). Chi phí vừa phải (-5 KT).",
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
        explanation:
          "Lãnh đạo toàn cầu về khí hậu (+20 NG, +5 CB). Nhưng chuyển đổi năng lượng tốn kém (-15 KT). Thể hiện tầm nhìn dài hạn (+5 CT).",
        historicalExample:
          "Costa Rica, Bhutan đạt carbon negative - được quốc tế tôn vinh.",
      },
      {
        text: "Từ chối, cho rằng các nước giàu phải chịu trách nhiệm.",
        impact: { CT: -5, KT: 5, CB: 0, NG: -15 },
        explanation:
          "Lập luận có cơ sở (historical emissions). Tiết kiệm chi phí chuyển đổi (+5 KT). Nhưng bị cô lập quốc tế (-15 NG, -5 CT).",
      },
      {
        text: "Cam kết có điều kiện, yêu cầu hỗ trợ tài chính và công nghệ từ các nước phát triển.",
        impact: { CT: 5, KT: 0, CB: 5, NG: 10 },
        explanation:
          "Giải pháp thực tế nhất, cân bằng trách nhiệm và năng lực (+10 NG, +5 CB, +5 CT).",
        historicalExample:
          "Ấn Độ, Việt Nam đàm phán hỗ trợ công nghệ xanh tại COP26.",
      },
      {
        text: "Tuyên bố sẽ đạt Net-Zero vào năm 2100, chậm hơn 50 năm.",
        impact: { CT: 0, KT: 5, CB: 0, NG: -5 },
        explanation:
          "Trì hoãn, không giải quyết vấn đề khí hậu. Bị cộng đồng quốc tế chỉ trích (-5 NG). Tiết kiệm chi phí ngắn hạn (+5 KT).",
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
        explanation:
          "Thể hiện trách nhiệm quốc tế và đoàn kết (+15 NG). Được dân trong nước ủng hộ (+5 CT). Chi phí lớn (-10 KT).",
      },
      {
        text: "Gửi thư chia buồn và 1 triệu USD tượng trưng.",
        impact: { CT: 0, KT: -1, CB: 0, NG: -5 },
        explanation:
          "Thiếu thiện chí, bị đồng minh thất vọng (-5 NG). Chi phí thấp (-1 KT).",
      },
      {
        text: "Chỉ gửi đội cứu hộ và vật tư y tế, không gửi tiền mặt.",
        impact: { CT: 5, KT: -5, CB: 5, NG: 10 },
        explanation:
          "Cân bằng giữa hỗ trợ thực chất (+10 NG, +5 CB) và tiết kiệm ngân sách (-5 KT). Thể hiện trách nhiệm (+5 CT).",
      },
      {
        text: "Yêu cầu họ phải trả lại sau khi phục hồi.",
        impact: { CT: -5, KT: 5, CB: -5, NG: -10 },
        explanation:
          "Biến viện trợ thành cho vay, mất ý nghĩa nhân đạo (-10 NG, -5 CB, -5 CT). Tiết kiệm ngân sách (+5 KT).",
      },
    ],
  },

  // ============================================
  // 2 TÌNH HUỐNG MỚI BỔ SUNG
  // ============================================
  {
    id: 31,
    title: "Khủng hoảng Năng lượng",
    description:
      "Giá dầu thế giới tăng gấp 3 lần. Nguồn cung điện không đủ, có nguy cơ cắt điện luân phiên trong mùa hè. Dân chúng phẫn nộ.",
    icon: TrendingUp,
    category: "KT",
    choices: [
      {
        text: "Đầu tư khẩn cấp vào năng lượng tái tạo (mặt trời, gió).",
        impact: { CT: 5, KT: -15, CB: 0, NG: 10 },
        explanation:
          "Chi phí ban đầu rất cao (-15 KT), nhưng là giải pháp bền vững dài hạn. Được cộng đồng quốc tế và nhà môi trường ủng hộ (+10 NG). Thể hiện tầm nhìn chiến lược (+5 CT).",
        historicalExample:
          "Đức Energiewende - chuyển đổi năng lượng tái tạo thành công.",
      },
      {
        text: "Xây nhà máy điện than mới để đảm bảo nguồn cung ngay.",
        impact: { CT: 10, KT: 5, CB: -5, NG: -15 },
        explanation:
          "Giải quyết nhanh khủng hoảng (+10 CT, +5 KT ngắn hạn). Nhưng gây ô nhiễm (-5 CB) và bị lên án quốc tế về khí hậu (-15 NG).",
        historicalExample:
          "Trung Quốc, Ấn Độ vẫn xây nhiều nhà máy than - bị phê phán tại COP.",
      },
      {
        text: "Ký hợp đồng dài hạn nhập khẩu khí đốt từ nước láng giềng.",
        impact: { CT: 5, KT: -5, CB: 0, NG: 10 },
        explanation:
          "Ổn định nguồn cung (+5 CT, +10 NG do tăng quan hệ song phương). Tăng phụ thuộc năng lượng và chi phí nhập khẩu cao (-5 KT).",
      },
      {
        text: "Kêu gọi tiết kiệm điện và tăng giá điện 30%.",
        impact: { CT: -10, KT: -5, CB: -15, NG: 0 },
        explanation:
          "Giảm nhu cầu ngắn hạn, nhưng gây phẫn nộ dân chúng (-10 CT, -15 CB). Ảnh hưởng sản xuất doanh nghiệp (-5 KT).",
      },
    ],
  },

  {
    id: 32,
    title: "Cách mạng Trí tuệ Nhân tạo",
    description:
      "AI và tự động hóa đe dọa thay thế 40% việc làm trong 10 năm tới. Công nhân và giới trẻ lo lắng về tương lai. Bạn sẽ làm gì?",
    icon: HeartHandshake,
    category: "CB",
    choices: [
      {
        text: "Đánh thuế robot/AI và dùng tiền đó cho 'Universal Basic Income' (UBI).",
        impact: { CT: -5, KT: -10, CB: 20, NG: 5 },
        explanation:
          "Giải pháp tiên phong, đảm bảo an sinh cho mọi người (+20 CB), được giới học thuật quốc tế quan tâm (+5 NG). Nhưng gây tranh cãi lớn (-5 CT), tốn kém ngân sách và có thể làm giảm động lực làm việc (-10 KT).",
        historicalExample:
          "Thí điểm UBI ở Phần Lan, Kenya - kết quả trái chiều.",
      },
      {
        text: "Đầu tư mạnh vào đào tạo lại lực lượng lao động (reskilling).",
        impact: { CT: 10, KT: 5, CB: 15, NG: 5 },
        explanation:
          "Cách tiếp cận chủ động, giúp người lao động thích nghi với kinh tế mới (+15 CB, +5 KT dài hạn). Thể hiện tầm nhìn (+10 CT), được quốc tế đánh giá cao (+5 NG).",
        historicalExample:
          "Singapore SkillsFuture - chương trình đào tạo lại thành công.",
      },
      {
        text: "Hạn chế triển khai AI trong một số ngành để bảo vệ việc làm.",
        impact: { CT: 5, KT: -15, CB: 10, NG: -10 },
        explanation:
          "Bảo vệ công nhân ngắn hạn (+10 CB, +5 CT). Nhưng làm chậm phát triển kinh tế và công nghệ (-15 KT), bị cộng đồng quốc tế coi là lạc hậu (-10 NG).",
        historicalExample:
          "Luddites thế kỷ 19 phá máy dệt - lịch sử cho thấy không hiệu quả.",
      },
      {
        text: "Không can thiệp, để thị trường lao động tự điều chỉnh.",
        impact: { CT: -15, KT: 10, CB: -20, NG: 0 },
        explanation:
          "Thúc đẩy đổi mới và năng suất (+10 KT), nhưng gây bất ổn xã hội nghiêm trọng khi hàng triệu người thất nghiệp (-20 CB). Chính phủ bị chỉ trích là vô trách nhiệm (-15 CT).",
      },
    ],
  },
];

// ============================================
// HÀM TIỆN ÍCH
// ============================================

// Hàm tiện ích để lấy ngẫu nhiên N tình huống không lặp lại
export const getRandomScenarios = (count: number): Scenario[] => {
  const shuffled = [...allSituations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Hàm lấy tình huống theo danh mục
export const getScenariosByCategory = (
  category: "CT" | "KT" | "CB" | "NG"
): Scenario[] => {
  return allSituations.filter((s) => s.category === category);
};

// Hàm tính tổng impact của một lựa chọn
export const getTotalImpact = (impact: Choice["impact"]): number => {
  return impact.CT + impact.KT + impact.CB + impact.NG;
};
