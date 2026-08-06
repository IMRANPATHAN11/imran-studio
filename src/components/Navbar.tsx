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
  const [progress, setProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(current);
      setIsScrolled(window.scrollY > 40);

      // Hide on scroll down, show on scroll up (Apple-style)
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 120 && !isHidden) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current && isHidden) {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHidden]);

  return (
    <>
      {/* Premium scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#ff6b00] via-[#ff8a3d] to-[#ffb36b] shadow-[0_0_12px_rgba(255,107,0,0.6)] transition-[width] duration-200"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled
            ? 'border-b border-white/10 bg-black/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'border-b border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="navbar-logo group text-lg font-semibold tracking-[0.2em] text-white transition hover:text-[#ff6b00]">
            <span className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_2px] group-hover:from-[#ff6b00] group-hover:to-[#ff8a3d]">
              Imran Tech
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative transition duration-300 hover:text-[#ff6b00]"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8a3d] shadow-[0_0_8px_rgba(255,107,0,0.5)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MagneticButton
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-xl text-slate-200 transition duration-300 hover:border-[#ff6b00]/40 hover:text-[#ff6b00]"
            >
              <span aria-label="Toggle navigation menu" aria-expanded={isOpen}>
                ☰
              </span>
            </MagneticButton>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-white/10 bg-black/90 px-6 py-4 backdrop-blur-xl transition-all duration-300 md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-medium text-slate-300">
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