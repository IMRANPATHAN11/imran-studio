import { useEffect, useRef, useState } from 'react';
import MagneticButton from './MagneticButton';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const current = total > 0 ? (window.scrollY / total) * 100 : 0;

        // Direct DOM update for progress bar - no React re-renders
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.min(100, Math.max(0, current))}%`;
        }

        const scrolled = window.scrollY > 40;
        if (scrolled !== isScrolled) setIsScrolled(scrolled);

        // Hide on scroll down, show on scroll up (Apple-style)
        const currentY = window.scrollY;
        if (currentY > lastScrollY.current && currentY > 120 && !isHidden) {
          setIsHidden(true);
        } else if (currentY < lastScrollY.current && isHidden) {
          setIsHidden(false);
        }
        lastScrollY.current = currentY;
        rafId.current = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isHidden, isScrolled]);

  return (
    <>
      {/* Premium scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full rounded-full bg-gradient-to-r from-[#ff6b00] via-[#ff8a3d] to-[#ffb36b] shadow-[0_0_12px_rgba(255,107,0,0.6)] transition-[width] duration-200"
          style={{ width: '0%' }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled
            ? 'navbar-scrolled border-b-[var(--border)] bg-[var(--nav-bg)] shadow-[var(--nav-shadow)] backdrop-blur-lg'
            : 'border-b border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8 transition-all duration-500 ${
            isScrolled ? 'py-2.5' : 'py-4'
          }`}
        >
          <a
            href="#home"
            className={`navbar-logo group text-lg font-semibold tracking-[0.2em] text-[var(--text)] transition-all duration-500 hover:text-[#ff6b00] ${
              isScrolled ? 'scale-95' : 'scale-100'
            }`}
          >
            <span className="bg-gradient-to-r from-[var(--text)] to-[var(--text)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_2px] group-hover:from-[#ff6b00] group-hover:to-[#ff8a3d]">
              Imran Tech
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--muted)] md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link group relative transition duration-300 hover:text-[#ff6b00]"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8a3d] shadow-[0_0_8px_rgba(255,107,0,0.5)] transition-all duration-300 group-hover:w-full" />
                <span className="absolute inset-x-0 -bottom-1 mx-auto h-[2px] w-0 rounded-full bg-[#ff6b00] opacity-0 shadow-[0_0_10px_rgba(255,107,0,0.8)] transition-all duration-300 group-hover:opacity-100 group-hover:w-1/2" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle — visible on all screen sizes, next to logo */}
            <ThemeToggle />
            <MagneticButton
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 text-xl text-[var(--text)] transition duration-300 hover:border-[#ff6b00]/40 hover:text-[#ff6b00] md:hidden"
            >
              <span aria-label="Toggle navigation menu" aria-expanded={isOpen}>
                ☰
              </span>
            </MagneticButton>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-[var(--border)] bg-[var(--nav-bg)] px-6 py-4 backdrop-blur-sm transition-all duration-300 md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-medium text-[var(--muted)]">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="transition duration-300 hover:text-[#ff6b00]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}