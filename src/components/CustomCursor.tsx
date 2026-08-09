import { memo, useEffect, useRef } from 'react';

/**
 * CustomCursor - GPU-accelerated cursor with trail.
 *
 * Performance fixes:
 * 1. Removed the MutationObserver that re-queried the entire DOM on every
 *    DOM mutation (this ran on every React re-render and was a major source
 *    of lag). Interactive elements are bound once on mount.
 * 2. Reduced trail particles from 2 to 1.
 * 3. All updates use `transform: translate3d()` - compositor-only, no repaint.
 */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const trailPosition = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring) return;

    // Bail out on touch / coarse pointers - desktop only feature
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const applyState = () => {
      const ringEl = ringRef.current;
      const dotEl = dotRef.current;
      if (!ringEl || !dotEl) return;

      ringEl.classList.toggle('is-hovering', isHoveringRef.current);
      ringEl.style.borderColor = isClickingRef.current ? 'rgba(255,107,0,0.9)' : '';
      ringEl.style.background = isClickingRef.current ? 'rgba(255,107,0,0.18)' : '';
      ringEl.style.scale = isClickingRef.current ? '0.85' : '';
      dotEl.style.scale = isClickingRef.current ? '0.7' : isHoveringRef.current ? '1.5' : '1';
    };

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
        // Smooth lerp for ring
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.16;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.16;

        // Update dot (instant) - transform only, no repaint
        dot.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`;

        // Update ring (smooth) - transform only, no repaint
        ring.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`;

        // Trail: small trailing offset behind the ring
        if (trail) {
          trailPosition.current.x += (currentRef.current.x - trailPosition.current.x) * 0.08;
          trailPosition.current.y += (currentRef.current.y - trailPosition.current.y) * 0.08;
          trail.style.transform = `translate3d(${trailPosition.current.x}px, ${trailPosition.current.y}px, 0) translate(-50%, -50%)`;
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const resetIdleTimer = () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(stopLoop, 300);
    };

    const updatePosition = (event: MouseEvent) => {
      // First movement - start the loop
      if (!isRunningRef.current) {
        currentRef.current.x = event.clientX;
        currentRef.current.y = event.clientY;
        trailPosition.current.x = event.clientX;
        trailPosition.current.y = event.clientY;
        startLoop();
      }
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      resetIdleTimer();
    };

    const handleEnter = () => {
      isHoveringRef.current = true;
      applyState();
    };
    const handleLeave = () => {
      isHoveringRef.current = false;
      applyState();
    };
    const handleDown = () => {
      isClickingRef.current = true;
      applyState();
    };
    const handleUp = () => {
      isClickingRef.current = false;
      applyState();
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    // Bind once on mount - no MutationObserver needed
    const interactiveElements = document.querySelectorAll('a, button, .card-hover, input, select, textarea');
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleEnter);
      element.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleEnter);
        element.removeEventListener('mouseleave', handleLeave);
      });
      stopLoop();
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden sm:block" aria-hidden="true">
      {/* Single trail particle - reduced from 2 */}
      <div
        ref={trailRef}
        className="absolute h-1.5 w-1.5 rounded-full bg-[#ff8a3d]"
        style={{
          opacity: 0.25,
          boxShadow: '0 0 8px rgba(255,107,0,0.5)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Outer smooth ring */}
      <div
        ref={ringRef}
        className="cursor-ring absolute"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="cursor-dot absolute"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

export default memo(CustomCursor);