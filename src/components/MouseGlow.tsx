import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 107, 0, 0.16) 0%, rgba(255, 107, 0, 0.06) 18%, transparent 42%)`,
        mixBlendMode: 'screen',
      }}
    />
  );
}
