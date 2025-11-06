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
              Bảo tàng Meme
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Khám phá bộ sưu tập meme Mác - Lênin qua{" "}
              <strong>Spatial.io 3D Gallery</strong>
            </p>
          </div>

          {/* Embed Container */}
          <div className="w-full px-0 mb-12">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-marx-red-light">
              {/* Spatial.io Embed */}
              <iframe
                src="https://www.spatial.io/s/MLN_Gallery-690b0e78910cc87644c36544?share=508439207661164965"
                title="MLN Gallery - Bảo tàng Meme Mác Lênin"
                width="100%"
                height="1000"
                allowFullScreen
                className="w-full h-[1000px] md:h-[900px] border-0"
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
                  Mở trang mới
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-marx-red hover:bg-marx-red-hover text-white"
                onClick={() => {
                  // Tự động chạy Spatial (nếu có API, hoặc reload iframe)
                  const iframe = document.querySelector("iframe");
                  if (iframe) {
                    iframe.src = iframe.src; // Reload để trigger play nếu cần
                  }
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Chạy Gallery
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}