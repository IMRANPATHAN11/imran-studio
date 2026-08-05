import { useEffect, useRef, useState } from 'react';

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export default function MagneticButton({ children, className = '', href, onClick, disabled = false, type = 'button' }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      setPosition({ x: (x / rect.width - 0.5) * 8, y: (y / rect.height - 0.5) * 8 });
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handlePressStart = () => setIsPressed(true);
  const handlePressEnd = () => setIsPressed(false);

  const transform = `translate(${position.x}px, ${position.y}px) scale(${isPressed ? 0.95 : 1})`;

  const sharedClassName = `transition-transform duration-300 ease-out ${className} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`;

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        className={sharedClassName}
        style={{ transform }}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      className={sharedClassName}
      style={{ transform }}
    >
      {children}
    </button>
  );
}