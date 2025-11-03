// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import { HeroHeader } from './header';

export default function Layout() {
  return (
    <div className="min-h-screen ">
      {/* Header luôn hiện ở trên cùng */}
      <HeroHeader />
      
      {/* Nội dung trang con sẽ được render ở đây */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}