import { useEffect, useRef, useState } from 'react';

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState('translateY(0px) rotateX(0deg) rotateY(0deg)');
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((0.5 - y / rect.height) * 10);
      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`);
      setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
    };

    const handleMouseLeave = () => {
      setTransform('translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)');
      setGlow((prev) => ({ ...prev, opacity: 0 }));
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`card-hover group relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      {/* Light reflection that follows the cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.12), transparent 55%)`,
          opacity: glow.opacity,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 40px rgba(255,107,0,0.15), inset 0 0 20px rgba(255,107,0,0.05)`,
          opacity: glow.opacity * 0.8,
        }}
      />
      {children}
    </div>
  );
}