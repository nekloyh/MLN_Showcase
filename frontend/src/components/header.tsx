// components/HeroHeader.tsx
import { Menu, X } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import LeaderboardModal from './LeaderboardModal';
import { Logo } from './logo';

// Custom NavLink
type NavLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick, ...props }) => {
  if (!href) {
    return (
      <a onClick={onClick} className={className} style={{ cursor: 'pointer' }} {...props}>
        {children}
      </a>
    );
  }

  if (href.startsWith('#') || href.startsWith('/#')) {
    return <a href={href} onClick={onClick} className={className} {...props}>{children}</a>;
  }

  return <Link to={href} onClick={onClick} className={className} {...props}>{children}</Link>;
};

// Menu items – CẬP NHẬT: "Bảo Tàng Meme" + "Bảng xếp hạng"
const menuItems = [
  { name: 'Trò chơi Mô phỏng', href: '/' },
  { name: 'Dòng Thời Gian', href: '/timeline' },
  { name: 'Nội Dung Chi Tiết', href: '/presentations' },
  { name: 'Bảo Tàng Meme', href: '/gallery' }, // Đổi tên + link
  { name: 'Công Bố AI', href: '/ai-disclosure' },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = React.useState(false);

  const openLeaderboard = (e: React.MouseEvent) => {
    e.preventDefault();
    setLeaderboardOpen(true);
    setMenuState(false);
  };

  const closeMobileMenu = () => setMenuState(false);

  return (
    <header>
      <nav
        data-state={menuState ? 'active' : ''}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-marx-red-light shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between py-4 lg:py-5">

            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" aria-label="home" className="flex items-center group">
                <Logo className="mr-3 w-10 h-10 text-marx-red group-hover:text-marx-red-hover transition-colors" />
                <div className="hidden sm:block">
                  <div className="font-bold text-lg text-gray-900">Marx Me If You Can </div>
                  <div className="text-xs font-medium text-lenin-yellow">Học Mác vui như coi meme</div>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? 'Close Menu' : 'Open Menu'}
              className="relative z-20 block cursor-pointer p-2.5 lg:hidden"
            >
              <Menu className={`size-6 text-marx-red transition-all ${menuState ? 'rotate-180 scale-0 opacity-0' : ''}`} />
              <X className={`absolute inset-0 m-auto size-6 text-marx-red transition-all ${menuState ? '' : '-rotate-180 scale-0 opacity-0'}`} />
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:block ml-auto">
              <ul className="flex gap-8 text-sm font-semibold">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      href={item.href ?? undefined}
                      onClick={item.href === null ? openLeaderboard : undefined}
                      className="text-gray-700 hover:text-marx-red block duration-150 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-marx-red after:transition-all hover:after:w-full pb-1"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu */}
            <div
              className={`absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-3xl border border-marx-red-light p-6 shadow-2xl lg:hidden transition-all duration-300 ${
                menuState ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'
              }`}
            >
              <ul className="space-y-6 text-base font-semibold">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      href={item.href ?? undefined}
                      onClick={item.href === null ? openLeaderboard : closeMobileMenu}
                      className="block text-gray-800 hover:text-marx-red transition-colors"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal Leaderboard */}
      <LeaderboardModal isOpen={leaderboardOpen} onClose={() => setLeaderboardOpen(false)} />
    </header>
  );
};