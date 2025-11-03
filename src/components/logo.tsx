import { cn } from "../lib/utils";

type LogoProps = { className?: string; uniColor?: boolean };

// Friendly chibi-style SVG showing two simple characters and a book.
export const Logo = ({ className }: LogoProps) => {
    return (
        <div className={cn('flex items-center space-x-3', className)}>
            <span aria-hidden>
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-11 w-11 rounded-full"
                >
                    <rect width="64" height="64" rx="12" fill="#FFDADA" />

                    {/* Left chibi (Mác) */}
                    <g transform="translate(8,10)">
                        <circle cx="10" cy="10" r="6" fill="#FFF" stroke="#E85A5A" strokeWidth="1.5" />
                        <circle cx="8.7" cy="9.2" r="1" fill="#333" />
                        <circle cx="11.3" cy="9.2" r="1" fill="#333" />
                        <path d="M7 13c1.5 1.5 5 1.5 6.5 0" stroke="#E85A5A" strokeWidth="1" strokeLinecap="round" fill="none" />
                        <rect x="4" y="18" width="12" height="6" rx="1" fill="#FFF5EB" stroke="#E2A79A" />
                    </g>

                    {/* Right chibi (Lênin) */}
                    <g transform="translate(36,10)">
                        <circle cx="10" cy="10" r="6" fill="#FFF" stroke="#C74343" strokeWidth="1.5" />
                        <circle cx="8.7" cy="9.2" r="1" fill="#333" />
                        <circle cx="11.3" cy="9.2" r="1" fill="#333" />
                        <path d="M7.5 12.5c1 1.3 4 1.2 5 0" stroke="#C74343" strokeWidth="1" strokeLinecap="round" fill="none" />
                        <rect x="3" y="18" width="14" height="6" rx="1" fill="#FFF5EB" stroke="#E2A79A" />
                    </g>

                    {/* Book / meme thinker in center */}
                    <g transform="translate(18,30)">
                        <rect x="8" y="0" width="24" height="10" rx="1" fill="#FFF" stroke="#D97706" />
                        <path d="M12 2h20" stroke="#F59E0B" strokeWidth="0.8" />
                    </g>
                </svg>
            </span>

            
        </div>
    );
};

export const LogoIcon = ({ className }: LogoProps) => (
    <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-8 w-8', className)}
        aria-hidden
    >
        <rect width="64" height="64" rx="12" fill="#FFDADA" />
        <circle cx="20" cy="20" r="6" fill="#FFF" stroke="#E85A5A" strokeWidth="1.5" />
        <circle cx="44" cy="20" r="6" fill="#FFF" stroke="#C74343" strokeWidth="1.5" />
        <rect x="22" y="36" width="20" height="8" rx="1" fill="#FFF" stroke="#D97706" />
    </svg>
);

export default Logo;
