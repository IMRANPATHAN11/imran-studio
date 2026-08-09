import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        setShowTop(window.scrollY > 400);
        rafId.current = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo(el: HTMLElement | number, opts?: unknown): void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-[5.5rem] right-4 z-[65] flex flex-col items-end gap-3 md:bottom-24 md:right-6">
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#ff6b00] shadow-[0_0_20px_rgba(255,107,0,0.15)] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/10 hover:shadow-[0_0_30px_rgba(255,107,0,0.35)]"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
