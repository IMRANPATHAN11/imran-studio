import { memo, useEffect, useRef, useState } from 'react';

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

function MagneticButton({ children, className = '', href, onClick, disabled = false, type = 'button' }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if touch device
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      // Direct DOM update - no React re-renders
      element.style.transform = `translate(${(x / rect.width - 0.5) * 10}px, ${(y / rect.height - 0.5) * 10}px) scale(1)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px) scale(1)';
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const addRipple = (event: React.MouseEvent) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = ++rippleId.current;
    setRipples((prev) => [...prev, { id, x, y, size }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  const handlePressStart = () => {
    const element = ref.current;
    if (element) {
      const current = element.style.transform || 'translate(0px, 0px) scale(1)';
      element.style.transform = current.replace('scale(1)', 'scale(0.94)');
    }
  };
  const handlePressEnd = () => {
    const element = ref.current;
    if (element) {
      const current = element.style.transform || 'translate(0px, 0px) scale(1)';
      element.style.transform = current.replace('scale(0.94)', 'scale(1)');
    }
  };

  const sharedClassName = `btn-light-sweep ripple-container transition-transform duration-300 ease-out ${className} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`;

  const rippleLayer = (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-ink absolute"
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
        />
      ))}
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          addRipple(event);
          onClick?.(event);
        }}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        className={sharedClassName}
        aria-disabled={disabled}
      >
        {children}
        {rippleLayer}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={(event) => {
        if (disabled) return;
        addRipple(event);
        onClick?.(event);
      }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      className={sharedClassName}
    >
      {children}
      {rippleLayer}
    </button>
  );
}

export default memo(MagneticButton);