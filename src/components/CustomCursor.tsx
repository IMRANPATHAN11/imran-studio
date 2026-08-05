import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updatePosition);
    document.querySelectorAll('a, button, .card-hover').forEach((element) => {
      element.addEventListener('mouseenter', handleEnter);
      element.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.querySelectorAll('a, button, .card-hover').forEach((element) => {
        element.removeEventListener('mouseenter', handleEnter);
        element.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden sm:block">
      <div
        className={`absolute h-3.5 w-3.5 rounded-full border border-[#ff6b00] bg-[#ff6b00]/80 shadow-[0_0_20px_rgba(255,107,0,0.55)] transition-all duration-150 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      />
      <div
        className={`absolute h-12 w-12 rounded-full border border-[#ff6b00]/30 bg-[#ff6b00]/10 blur-[1px] transition-all duration-200 ${
          isHovering ? 'scale-150 opacity-90' : 'scale-100 opacity-70'
        }`}
        style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
}
