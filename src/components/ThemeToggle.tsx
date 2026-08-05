import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('imran-tech-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--app-bg', theme === 'dark' ? '#050505' : '#f7efe6');
    root.style.setProperty('--app-surface', theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)');
    root.style.setProperty('--app-surface-strong', theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.95)');
    root.style.setProperty('--app-border', theme === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(5,5,5,0.12)');
    root.style.setProperty('--app-text', theme === 'dark' ? '#f8f8f8' : '#111111');
    root.style.setProperty('--app-muted', theme === 'dark' ? '#b7c0cf' : '#5e5954');
    root.style.setProperty('--app-glow', theme === 'dark' ? 'rgba(255,107,0,0.24)' : 'rgba(255,107,0,0.14)');
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    window.localStorage.setItem('imran-tech-theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle color theme"
      className="rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-3 py-2 text-sm font-medium text-[color:var(--app-text)] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff6b00]/40"
    >
      {theme === 'dark' ? '☀︎' : '☾'}
    </button>
  );
}
