// src/pages/GalleryPage.tsx
import { HeroHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ExternalLink, Play } from 'lucide-react';

export default function GalleryPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen pt-20 bg-gradient-to-b from-white via-lenin-yellow-light/30 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold text-marx-red drop-shadow-lg mb-4">
              Bảo Tàng Meme
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Khám phá bộ sưu tập meme Mác - Lênin qua <strong>Spatial.io 3D Gallery</strong>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>MLN_Gallery</strong> bởi <strong>ChuKhiBuon</strong> • 4 views • No description yet
            </p>
          </div>

          {/* Embed Container */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-marx-red-light">
              {/* Spatial.io Embed */}
              <iframe
                src="https://www.spatial.io/s/MLN_Gallery-690b0e78910cc87644c36544?share=508439207661164965"
                title="MLN Gallery - Bảo Tàng Meme Mác Lênin"
                width="100%"
                height="800"
                allowFullScreen
                className="w-full h-[800px] md:h-[900px] border-0"
                loading="lazy"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button
                variant="outline"
                size="lg"
                className="border-marx-red text-marx-red hover:bg-marx-red/5"
                asChild
              >
                <a
                  href="https://www.spatial.io/s/MLN_Gallery-690b0e78910cc87644?share=508439207661164965"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Mở Trang Mới
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-marx-red hover:bg-marx-red-hover text-white"
                onClick={() => {
                  // Tự động chạy Spatial (nếu có API, hoặc reload iframe)
                  const iframe = document.querySelector('iframe');
                  if (iframe) {
                    iframe.src = iframe.src; // Reload để trigger play nếu cần
                  }
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Chạy Gallery
              </Button>
            </div>

            {/* Info */}
            <div className="bg-lenin-yellow/10 border-2 border-lenin-yellow rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold text-marx-red mb-4">Thông Tin Gallery</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Tiêu đề:</strong> MLN_Gallery</li>
                <li><strong>Tác giả:</strong> ChuKhiBuon</li>
                <li><strong>Lượt xem:</strong> 4 views</li>
                <li><strong>Mô tả:</strong> No description yet</li>
                <li><strong>Ngày phát hành:</strong> -</li>
                <li><strong>Tags:</strong> No tags yet</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4 italic">
                Gallery 3D tương tác – Khám phá meme qua không gian ảo. Tự động chạy khi tải trang!
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}