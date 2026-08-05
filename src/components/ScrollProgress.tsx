import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, current)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-1 bg-transparent">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#ff6b00] via-[#ff8a3d] to-[#ffb36b] transition-[width] duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
