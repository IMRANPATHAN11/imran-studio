import { memo, useEffect, useRef } from 'react';

/**
 * MouseGlow - GPU-accelerated glow that follows the cursor.
 *
 * Performance fix: previously this repainted a full-screen radial-gradient
 * background on every animation frame, forcing a viewport-wide repaint at 60fps
 * (the #1 cause of lag). Now it uses a small fixed element moved via
 * `transform: translate3d()` (compositor-only, no repaint) and a CSS mask to
 * keep the glow localized.
 */
function MouseGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isRunningRef = useRef(false);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Bail out on touch / coarse pointers entirely - glow is desktop-only.
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const stopLoop = () => {
      isRunningRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const startLoop = () => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;

      const animate = () => {
        // Smooth lerp toward the target
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.12;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.12;

        // Compositor-only: translate3d does NOT trigger a repaint.
        glow.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`;

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const resetIdleTimer = () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(stopLoop, 400);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isRunningRef.current) {
        currentRef.current.x = event.clientX;
        currentRef.current.y = event.clientY;
        glow.style.opacity = '1';
        startLoop();
      }
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      resetIdleTimer();
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
      stopLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      stopLoop();
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[1] h-[50rem] w-[50rem]"
      style={{
        opacity: 0,
        transition: 'opacity 0.4s ease',
        background:
          'radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 0, 0.03) 30%, transparent 60%)',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }}
    />
  );
}

export default memo(MouseGlow);