// pages/PresentationPage.tsx
import reportContent from "@/content/report.md?raw";
import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Modal from "../components/ui/modal";

interface ChapterSection {
  id: number;
  title: string;
  content: string;
}

const PresentationPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<ChapterSection | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const chapterSections: ChapterSection[] = useMemo(() => {
    const sections: ChapterSection[] = [];
    const lines = reportContent.split("\n");
    let currentTitle = "";
    let currentContent: string[] = [];
    let sectionId = 1;

    lines.forEach((line) => {
      if (line.startsWith("### ")) {
        if (currentTitle) {
          sections.push({
            id: sectionId++,
            title: currentTitle,
            content: currentContent.join("\n"),
          });
        }
        currentTitle = line.replace("### ", "").trim();
        currentContent = [];
      } else if (currentTitle) {
        currentContent.push(line);
      }
    });

    if (currentTitle) {
      sections.push({
        id: sectionId,
        title: currentTitle,
        content: currentContent.join("\n"),
      });
    }
    return sections;
  }, []);

  const inspirationalQuotes = [
    "Giá trị của hàng hóa được quyết định bởi thời gian lao động xã hội cần thiết để sản xuất ra nó. - Karl Marx",
    "Giá trị thặng dư là phần giá trị mới do công nhân tạo ra nhưng bị nhà tư bản chiếm đoạt không công. - Karl Marx",
    "Lịch sử của mọi xã hội cho đến nay là lịch sử của đấu tranh giai cấp. - Marx & Engels",
    "Tích lũy của cải ở một cực là tích lũy nghèo khó ở cực đối diện. - Karl Marx",
    "Chủ nghĩa đế quốc là giai đoạn cao nhất và cuối cùng của chủ nghĩa tư bản. - Lenin",
  ];

  const economicsOverview = {
    keyThemes: [
      "Hàng hóa có hai thuộc tính: giá trị sử dụng và giá trị",
      "Lao động tạo ra hàng hóa có tính hai mặt: lao động cụ thể và lao động trừu tượng",
      "Tiền tệ là hàng hóa đặc biệt làm vật ngang giá chung",
      "Giá trị thặng dư là nguồn gốc của lợi nhuận tư bản",
      "Tích lũy tư bản dẫn đến tập trung hóa và khủng hoảng chu kỳ",
    ],
    coreTheories: [
      "Thuyết giá trị lao động - cơ sở của kinh tế chính trị Mác",
      "Học thuyết giá trị thặng dư - vũ khí lý luận vạch trần bóc lột",
      "Quy luật giá trị điều tiết sản xuất hàng hóa",
      "Mâu thuẫn cơ bản của CNTB: sản xuất xã hội hóa vs chiếm hữu tư nhân",
      "Quy luật tích lũy tư bản và khủng hoảng kinh tế",
    ],
    application: [
      "Phân tích chế độ tư bản chủ nghĩa hiện đại",
      "Hiểu bản chất của bóc lột trong quan hệ lao động",
      "Giải thích nguồn gốc bất bình đẳng xã hội",
      "Dự báo xu hướng phát triển của kinh tế thị trường",
      "Cơ sở lý luận cho xây dựng chủ nghĩa xã hội",
    ],
    timeline: [
      { year: "1867", note: "Karl Marx xuất bản Tập I 'Tư Bản'" },
      { year: "1885-1894", note: "Engels hoàn thành Tập II, III 'Tư Bản'" },
      { year: "1916", note: "Lenin phát triển lý luận về chủ nghĩa đế quốc" },
      {
        year: "Hiện nay",
        note: "Kinh tế chính trị Mác-Lênin vẫn là công cụ sắc bén",
      },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-section-index") || "0",
              10
            );
            setVisibleSections((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".section-card")
      .forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [chapterSections]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [inspirationalQuotes.length]);

  const openModal = (section: ChapterSection) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSection(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Kinh tế Chính trị
            <span className="block text-marx-red mt-2">Mác - Lênin</span>
          </h1>
          <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
            Khám phá học thuyết cốt lõi về <strong>hàng hóa</strong>,{" "}
            <strong>giá trị</strong>, <strong>giá trị thặng dư</strong> và vai
            trò của thị trường trong phân phối của cải xã hội.
          </p>

          {/* Key Themes */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {economicsOverview.keyThemes.map((theme, i) => (
              <span
                key={i}
                className="px-5 py-2 bg-marx-red-light text-marx-red rounded-full text-sm font-semibold border border-marx-red-light shadow-sm"
              >
                {theme}
              </span>
            ))}
          </div>

          {/* Quote */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-marx-red-light to-lenin-yellow-light p-8 rounded-2xl border border-marx-red-light shadow-lg">
            <p className="text-xl md:text-2xl font-medium text-marx-red italic text-center">
              "{inspirationalQuotes[currentQuoteIndex].split(" - ")[0]}"
            </p>
            <p className="text-right text-sm text-lenin-yellow-dark mt-4 font-medium">
              —{" "}
              {inspirationalQuotes[currentQuoteIndex].split(" - ")[1] ||
                "Karl Marx"}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-gradient-to-b from-lenin-yellow-light to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Các Lý Thuyết Cốt Lõi
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Core Theories */}
            <div className="bg-white p-8 rounded-2xl shadow-card border border-marx-red-light">
              <div className="w-14 h-14 bg-marx-red text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Lý Thuyết Nền Tảng
              </h3>
              <ul className="space-y-3 text-gray-700">
                {economicsOverview.coreTheories.map((t, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-marx-red mr-2">•</span>
                    <span className="text-sm leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div className="bg-white p-8 rounded-2xl shadow-card border border-lenin-yellow-light">
              <div className="w-14 h-14 bg-lenin-yellow text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ứng Dụng Thực Tiễn
              </h3>
              <ul className="space-y-3 text-gray-700">
                {economicsOverview.application.map((a, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-lenin-yellow-dark mr-2">•</span>
                    <span className="text-sm leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-white p-8 rounded-2xl shadow-card border border-marx-red-light">
              <div className="w-14 h-14 bg-marx-red text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Dòng Thời Gian
              </h3>
              <div className="space-y-4 text-sm">
                {economicsOverview.timeline.map((item, i) => (
                  <div key={i} className="flex items-start">
                    <span className="font-bold text-marx-red mr-2">
                      {item.year}:
                    </span>
                    <span className="text-gray-700">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
            Các Chương Học Chi Tiết
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Khám phá từng khái niệm một cách có hệ thống từ cơ bản đến nâng cao
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapterSections.map((section, index) => (
              <div
                key={section.id}
                data-section-index={index}
                onClick={() => openModal(section)}
                className={`section-card group bg-white rounded-2xl shadow-card border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:border-marx-red-light hover:-translate-y-1 ${
                  visibleSections.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-marx-red">
                    {String(section.id).padStart(2, "0")}
                  </span>
                  <div className="w-12 h-12 bg-gradient-to-br from-marx-red to-lenin-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-marx-red transition-colors">
                  {section.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {section.content
                    .replace(/[#*>]/g, "")
                    .substring(0, 130)
                    .trim()}
                  ...
                </p>

                <button className="text-marx-red hover:text-marx-red-hover font-semibold text-sm flex items-center transition-colors">
                  Xem chi tiết
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedSection?.title || ""}
      >
        {selectedSection && (
          <div className="prose prose-lg max-w-none text-gray-800">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {selectedSection.content}
            </ReactMarkdown>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PresentationPage;
