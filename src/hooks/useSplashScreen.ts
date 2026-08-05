import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

type UseSplashScreenOptions = {
  /** Duration of the 0 → 100 progress animation in seconds (default 2s). */
  duration?: number;
  /** Extra ms the splash stays mounted after 100% so the exit animation can play. */
  exitDelay?: number;
};

export function useSplashScreen({
  duration = 2,
  exitDelay = 700,
}: UseSplashScreenOptions = {}) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const exitTimerRef = useRef<number | null>(null);
  const animRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    animRef.current = animate(0, 100, {
      duration,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        setProgress(latest);
      },
      onComplete: () => {
        setProgress(100);
        setIsComplete(true);

        exitTimerRef.current = window.setTimeout(() => {
          setIsVisible(false);
        }, exitDelay);
      },
    });

    return () => {
      if (animRef.current) {
        animRef.current.stop();
        animRef.current = null;
      }

      if (exitTimerRef.current !== null) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, [duration, exitDelay]);

  return {
    progress,
    isComplete,
    isVisible,
  };
}