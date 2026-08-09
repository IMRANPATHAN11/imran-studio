import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff6b00]/40 hover:shadow-[0_0_24px_rgba(255,107,0,0.18)]"
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.4, opacity: 0, rotate: 40 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="h-[18px] w-[18px] text-[#ffb36b]" strokeWidth={1.8} />
        ) : (
          <Sun className="h-[18px] w-[18px] text-[#ff6b00]" strokeWidth={1.8} />
        )}
      </motion.span>

      {/* Soft orange glow ring on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: 'inset 0 0 12px rgba(255,107,0,0.12)' }}
      />
    </button>
  );
}
