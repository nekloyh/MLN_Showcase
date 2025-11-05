// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

// Import các trang
import GameGuide from "./components/GameGuide";
import HeroSection from "./components/HeroSection";
import MiniGame from "./components/MiniGame";
import AiDisclosurePage from "./pages/AiDisclosurePage";
import GalleryPage from "./pages/GalleryPagePage";
import PresentationPage from "./pages/PresentationPage";
import TimelinePage from "./pages/TimelinePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HeroSection />} />
          <Route path="/guide" element={<GameGuide />} />
          <Route path="game" element={<MiniGame />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="gallery" element={<GalleryPage />} />

          <Route path="presentations" element={<PresentationPage />} />
          <Route path="ai-disclosure" element={<AiDisclosurePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
