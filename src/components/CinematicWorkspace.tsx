import { useEffect, useRef } from 'react';

/**
 * CinematicWorkspace — a lightweight Canvas 2D animated scene showing
 * a developer coding at a premium desk with three monitors.
 *
 * Performance strategy:
 *  - Single Canvas 2D renderer (no DOM nodes per frame)
 *  - DPR-adaptive resolution (capped on mobile)
 *  - IntersectionObserver pauses rendering when off-screen
 *  - prefers-reduced-motion renders one static frame
 *  - Deterministic time-based animation → seamless loop
 *  - Only transform/opacity animated on the wrapper element
 */

const CODE_SAMPLES = [
  ['const App = () => {', '  return <Hero />', '};'],
  ['const Theme = {', '  dark: "#050505",', '  light: "#faf6f1"', '};'],
  ['useEffect(() => {', '  initOptimized();', '}, []);'],
  ['export function App() {', '  return <Studio />', '}'],
  ['const stats = {', '  years: "4+",', '  projects: "10+"', '};'],
  ['await fetch("/api/hero")', '  .then(r => r.json())', '  .then(renderUt());'],
  ['function animate() {', '  requestAnimationFrame', '  (animate);', '}'],
  ['const premium = {', '  accent: "#ff6b00",', '  smooth: true', '};'],
  ['import { Kod } from', '  "@/packages/ui"', '  // v2.4.1'],
  ['const config = {', '  fps: 60,', '  motion: "cinematic"', '};'],
];

interface FrameState {
  time: number;
  w: number;
  h: number;
  dpr: number;
  scale: number;
  reduced: boolean;
  mobile: boolean;
}

export default function CinematicWorkspace() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let running = false;
    let observer: IntersectionObserver | null = null;
    let lastFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let qualityScale = 1;
    let isMobile = false;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      isMobile = width < 768;

      // Adaptive DPR: cap at 1.5 on mobile, 2 on desktop for perf
      const maxDpr = isMobile ? 1.5 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Quality scale: reduce detail on smaller screens
      qualityScale = isMobile ? 0.85 : 1;
    };

    resize();

    /* ================================================================
       Deterministic helpers
    ================================================================ */
    // Determine which code sample a monitor shows at time t (seamless loop)
    const sampleFor = (seed: number, cycleDuration: number, t: number) => {
      const idx = Math.floor(t / cycleDuration) + seed;
      return CODE_SAMPLES[((idx % CODE_SAMPLES.length) + CODE_SAMPLES.length) % CODE_SAMPLES.length];
    };

    // Fade progress 0→1→0 over a cycle (smooth cubic)
    const pulse = (t: number, cycle: number, offset = 0) => {
      const p = ((t + offset) % cycle) / cycle;
      if (p < 0.5) {
        const x = p * 2;
        return x * x * (3 - 2 * x);
      }
      const x = (1 - p) * 2;
      return x * x * (3 - 2 * x);
    };

    /* ================================================================
       Drawing functions — all geometry relative to W/H
    ================================================================ */
    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const drawDesk = (s: FrameState) => {
      const { w, h } = s;
      const deskW = w * (s.mobile ? 0.92 : 0.82);
      const deskH = h * 0.055;
      const deskX = (w - deskW) / 2;
      const deskY = h * 0.82;

      // Desk top — dark premium wood-like surface
      ctx.fillStyle = '#1a140e';
      roundRect(deskX, deskY, deskW, deskH, 4);
      ctx.fill();

      // Desk edge highlight — orange ambient reflection
      ctx.fillStyle = 'rgba(255, 107, 0, 0.18)';
      roundRect(deskX, deskY, deskW, 2, 2);
      ctx.fill();

      // Desk legs
      ctx.fillStyle = '#0d0a07';
      ctx.fillRect(deskX + deskW * 0.06, deskY + deskH, deskW * 0.025, h * 0.12);
      ctx.fillRect(deskX + deskW * 0.92, deskY + deskH, deskW * 0.025, h * 0.12);

      // Keyboard — on desk, angled perspective
      const kbW = deskW * 0.34;
      const kbH = deskH * 1.5;
      const kbX = deskX + deskW * 0.44 - kbW / 2;
      const kbY = deskY + deskH * 0.35;
      ctx.save();
      ctx.translate(kbX + kbW / 2, kbY + kbH / 2);
      ctx.rotate(-0.02);
      ctx.fillStyle = '#111827';
      roundRect(-kbW / 2, -kbH / 2, kbW, kbH, 3);
      ctx.fill();
      // Keys — subtle rows
      ctx.fillStyle = 'rgba(255,255,255,0.09)';
      const cols = 6;
      const rows = 3;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const kx = -kbW / 2 + 3 + c * ((kbW - 8) / cols);
          const ky = -kbH / 2 + 3 + r * ((kbH - 8) / rows);
          ctx.fillRect(kx, ky, (kbW - 10) / cols, (kbH - 10) / rows);
        }
      }
      ctx.restore();

      // Hands / fingers moving on keyboard
      const handCycle = 3.4; // seconds per typing cycle
      const handProgress = (s.time % handCycle) / handCycle;
      const handY = kbY + kbH * 0.42 + Math.sin(handProgress * Math.PI * 2) * 1.6;

      ctx.fillStyle = '#2d241e';
      // Left arm + hand
      ctx.beginPath();
      ctx.ellipse(kbX - kbW * 0.5, handY + 2, kbW * 0.28, kbH * 0.62, -0.5, 0, Math.PI * 2);
      ctx.fill();
      // Right arm + hand
      ctx.beginPath();
      ctx.ellipse(kbX + kbW * 0.5, handY + 2, kbW * 0.28, kbH * 0.62, 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Fingers visible on keys — subtle movement
      ctx.fillStyle = '#3a2f27';
      for (let f = 0; f < 4; f++) {
        const fx = kbX - kbW * 0.18 + f * 4;
        const fy = handY + 1 + Math.sin(s.time * 5 + f) * 1.2;
        ctx.beginPath();
        ctx.ellipse(fx, fy, 1.5, 2.2, -0.1, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let f = 0; f < 3; f++) {
        const fx = kbX + kbW * 0.05 + f * 4;
        const fy = handY + 1 + Math.sin(s.time * 5.5 + f * 1.3) * 1.2;
        ctx.beginPath();
        ctx.ellipse(fx, fy, 1.5, 2.2, 0.1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawChair = (s: FrameState) => {
      const { w, h } = s;
      const chairX = w * 0.5;
      const chairY = h * 0.72;
      const chairW = w * (s.mobile ? 0.16 : 0.13);
      const chairH = h * 0.38;

      // Chair base
      ctx.fillStyle = '#0e0b08';
      ctx.beginPath();
      ctx.ellipse(chairX, chairY + chairH, chairW * 0.7, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Seat
      ctx.fillStyle = '#1f1a15';
      roundRect(chairX - chairW / 1.7, chairY + chairH * 0.42, chairW * 1.35, chairH * 0.16, 6);
      ctx.fill();

      // Backrest
      ctx.fillStyle = '#1c1712';
      roundRect(chairX - chairW / 1.55, chairY + chairH * 0.1, chairW * 1.25, chairH * 0.42, 8);
      ctx.fill();

      // Subtle ambient orange rim on chair
      ctx.fillStyle = 'rgba(255,107,0,0.1)';
      roundRect(chairX - chairW / 1.55, chairY + chairH * 0.1, chairW * 1.25, 1.5, 2);
      ctx.fill();
    };

    const drawDeveloper = (s: FrameState) => {
      const { h } = s;
      const bodyX = s.w * 0.5;
      const bodyY = h * 0.70;
      const bodyW = s.w * (s.mobile ? 0.15 : 0.12);
      const subtleBreath = Math.sin(s.time * 0.8) * 1.2;

      // Torso
      ctx.fillStyle = '#17181c';
      roundRect(bodyX - bodyW / 2, bodyY - bodyW * 1.15 + subtleBreath, bodyW, bodyW * 1.35, 10);
      ctx.fill();

      // Torso highlight edge
      ctx.fillStyle = 'rgba(255,138,61,0.08)';
      roundRect(bodyX - bodyW / 2, bodyY - bodyW * 1.15 + subtleBreath, bodyW, 2, 2);
      ctx.fill();

      // Head
      const headY = bodyY - bodyW * 1.28 + subtleBreath;
      ctx.fillStyle = '#24262b';
      ctx.beginPath();
      ctx.ellipse(bodyX, headY, bodyW * 0.3, bodyW * 0.34, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head highlight — screen glow on face
      ctx.fillStyle = 'rgba(255,107,0,0.06)';
      ctx.beginPath();
      ctx.ellipse(bodyX + bodyW * 0.1, headY, bodyW * 0.15, bodyW * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Arms reaching toward keyboard
      const armY = bodyY - bodyW * 0.22 + subtleBreath;
      ctx.strokeStyle = '#17181c';
      ctx.lineWidth = Math.max(3, bodyW * 0.09);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(bodyX - bodyW * 0.4, bodyY - bodyW * 0.6);
      ctx.quadraticCurveTo(bodyX - bodyW * 0.7, armY + bodyW * 0.3, bodyX - bodyW * 0.55, bodyY + bodyW * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(bodyX + bodyW * 0.4, bodyY - bodyW * 0.6);
      ctx.quadraticCurveTo(bodyX + bodyW * 0.7, armY + bodyW * 0.3, bodyX + bodyW * 0.55, bodyY + bodyW * 0.25);
      ctx.stroke();
    };

    const drawMonitor = (
      s: FrameState,
      x: number,
      y: number,
      mw: number,
      mh: number,
      seed: number,
      isCenter: boolean
    ) => {
      const glowCycle = isCenter ? 5.2 : 6.4;
      const glow = 0.5 + pulse(s.time, glowCycle, seed) * 0.5;

      // Monitor glow behind
      const glowGrad = ctx.createRadialGradient(x + mw / 2, y + mh / 2, 4, x + mw / 2, y + mh / 2, mw * 0.75);
      glowGrad.addColorStop(0, `rgba(255,107,0,${0.10 * glow})`);
      glowGrad.addColorStop(0.6, `rgba(255,107,0,${0.04 * glow})`);
      glowGrad.addColorStop(1, 'rgba(255,107,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(x - mw * 0.2, y - mh * 0.2, mw * 1.4, mh * 1.4);

      // Monitor body
      ctx.fillStyle = '#15171c';
      roundRect(x, y, mw, mh, 6);
      ctx.fill();

      // Monitor bezel
      ctx.fillStyle = '#0e1013';
      roundRect(x + 3, y + 3, mw - 6, mh - 6, 4);
      ctx.fill();

      // Screen — subtle blue/teal glow like a real code editor
      const screenX = x + 6;
      const screenY = y + 6;
      const screenW = mw - 12;
      const screenH = mh - 12;

      const screenGrad = ctx.createLinearGradient(screenX, screenY, screenX, screenY + screenH);
      screenGrad.addColorStop(0, `rgba(18, 26, 32, ${0.92 + glow * 0.06})`);
      screenGrad.addColorStop(1, `rgba(20, 24, 26, ${0.88 + glow * 0.06})`);
      ctx.fillStyle = screenGrad;
      roundRect(screenX, screenY, screenW, screenH, 2);
      ctx.fill();

      // Code lines — deterministic sample that changes over time
      const lines = sampleFor(seed, glowCycle, s.time);
      ctx.font = `600 ${Math.max(5, screenW * 0.11)}px ui-monospace, "SF Mono", "Cascadia Code", monospace`;
      ctx.textBaseline = 'middle';

      // Line color accents
      const lineY = screenY + 10;
      const lineH = (screenH - 18) / 3;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const width = ctx.measureText(line).width;
        const fitScale = Math.min(1, screenW / Math.max(1, width + 8));
        ctx.save();
        ctx.fillStyle = i === 0 ? 'rgba(255,183,119,0.9)' : i === 1 ? 'rgba(129,199,212,0.75)' : 'rgba(155,170,190,0.55)';
        ctx.scale(fitScale, fitScale);
        ctx.fillText(line, screenX + 5 / fitScale, lineY + (i + 0.5) * lineH);
        ctx.restore();
      }

      // Cursor blinking on center monitor
      if (isCenter) {
        const blink = Math.sin(s.time * 3.4) > -0.4;
        if (blink) {
          ctx.fillStyle = 'rgba(255,183,119,0.85)';
          const cursorX = screenX + Math.min(screenW - 8, screenW * 0.62 + Math.sin(s.time * 1.4) * 8);
          ctx.fillRect(cursorX, lineY + lineH * 0.45, 2, lineH * 0.8);
        }
      }

      // Screen subtle reflection sweep
      const sweepX = screenX + ((s.time * 18) % (screenW + 40)) - 20;
      const sweepGrad = ctx.createLinearGradient(sweepX - 10, screenY, sweepX, screenY + screenH);
      sweepGrad.addColorStop(0, 'rgba(255,255,255,0)');
      sweepGrad.addColorStop(0.5, `rgba(255,255,255,${0.03 + glow * 0.02})`);
      sweepGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(sweepX - 10, screenY, 24, screenH);

      // Stand
      ctx.fillStyle = '#15171c';
      ctx.fillRect(x + mw / 2 - 4, y + mh, 8, 10);
      ctx.fillRect(x + mw / 2 - 18, y + mh + 8, 36, 4);
    };

    const drawMonitors = (s: FrameState) => {
      const { w, h } = s;
      const monitorW = s.mobile ? w * 0.19 : w * 0.14;
      const monitorH = s.mobile ? h * 0.21 : h * 0.19;
      const y = h * 0.43;
      const centerX = w * 0.5;
      const gap = monitorW * 0.14;

      // Center monitor (main coding)
      drawMonitor(s, centerX - monitorW / 2, y, monitorW, monitorH, 0, true);

      if (!s.mobile) {
        // Left monitor (UI preview)
        drawMonitor(s, centerX - monitorW - gap - monitorW / 2, y + 4, monitorW * 0.82, monitorH * 0.82, 2, false);
        // Right monitor (terminal / code)
        drawMonitor(s, centerX + gap + monitorW / 2, y + 4, monitorW * 0.82, monitorH * 0.82, 4, false);
      }
    };

    const drawEnvironment = (s: FrameState) => {
      const { w, h } = s;

      // Base background gradient — cinematic dark studio
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      if (s.mobile) {
        bg.addColorStop(0, '#0b0d12');
        bg.addColorStop(0.6, '#08090d');
        bg.addColorStop(1, '#0a0806');
      } else {
        bg.addColorStop(0, '#0d0f16');
        bg.addColorStop(0.5, '#08090d');
        bg.addColorStop(1, '#0a0806');
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Ambient orange glow — warm accent light
      const ambGlow = 0.5 + pulse(s.time, 8, 1.2) * 0.4;
      const warm = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.35, w * 0.55);
      warm.addColorStop(0, `rgba(255,90,20,${0.07 * ambGlow})`);
      warm.addColorStop(0.6, `rgba(255,60,10,${0.04 * ambGlow})`);
      warm.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, w, h);

      // Cool ambient edge light
      if (!s.mobile) {
        const cool = ctx.createRadialGradient(w * 0.85, h * 0.15, 0, w * 0.85, h * 0.15, w * 0.3);
        cool.addColorStop(0, 'rgba(50,80,120,0.06)');
        cool.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = cool;
        ctx.fillRect(0, 0, w, h);
      }

      // Floor reflection — subtle dark floor line
      ctx.fillStyle = 'rgba(255,107,0,0.03)';
      ctx.fillRect(0, h * 0.94, w, h * 0.06);

      // Small desk lamp light on right
      if (!s.mobile) {
        const lamp = ctx.createRadialGradient(w * 0.86, h * 0.74, 0, w * 0.86, h * 0.74, w * 0.12);
        lamp.addColorStop(0, 'rgba(255,138,61,0.05)');
        lamp.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = lamp;
        ctx.fillRect(w * 0.7, h * 0.55, w * 0.3, h * 0.4);
      }
    };

    /* ================================================================
       Main render loop
    ================================================================ */
    const render = (t: number) => {
      if (!running) return;

      const dt = t - lastFrame;
      if (dt < 16) {
        rafId = requestAnimationFrame(render);
        return;
      }
      lastFrame = t;

      const seconds = t / 1000;
      const state: FrameState = {
        time: seconds,
        w: width,
        h: height,
        dpr,
        scale: qualityScale,
        reduced,
        mobile: isMobile,
      };

      drawEnvironment(state);
      drawMonitors(state);
      drawDeveloper(state);
      drawChair(state);
      drawDesk(state);

      // Vignette — cinematic edge darkening
      const vg = ctx.createRadialGradient(
        width * 0.5, height * 0.45, width * 0.2,
        width * 0.5, height * 0.45, width * 0.72
      );
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(0.75, 'rgba(0,0,0,0.08)');
      vg.addColorStop(1, 'rgba(0,0,0,0.28)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      rafId = requestAnimationFrame(render);
    };

    // IntersectionObserver — pause when off-screen
    observer = new IntersectionObserver(
      ([entry]) => {
        const shouldRun = entry.isIntersecting;
        if (shouldRun && !running) {
          running = true;
          lastFrame = performance.now();
          if (reduced) {
            // Render one static frame when reduced-motion
            const state: FrameState = {
              time: 2,
              w: width,
              h: height,
              dpr,
              scale: qualityScale,
              reduced: true,
              mobile: isMobile,
            };
            drawEnvironment(state);
            drawMonitors(state);
            drawDeveloper(state);
            drawChair(state);
            drawDesk(state);
            running = false;
          } else {
            rafId = requestAnimationFrame(render);
          }
        } else if (!shouldRun && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(wrap);

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="cinematic-workspace workspace-reveal ws-live"
      role="img"
      aria-label="Cinematic view of a developer coding at a premium desk with three monitors"
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      {/* Subtle green "recording/live" indicator */}
      <div className="pointer-events-none absolute left-5 top-5 z-[4] flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-emerald-300/70">
          Live Build
        </span>
      </div>
      {/* Bottom status bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] flex items-center justify-between border-t border-white/5 bg-black/30 px-5 py-2 backdrop-blur-sm">
        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400/70">
          Imran Tech — Studio
        </span>
        <span className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400/70 sm:block">
          Premium Web Development
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#ffb36b]/80">
          <span className="inline-block h-1 w-1 rounded-full bg-[#ff6b00] animate-pulse-dot" />
          Coding
        </span>
      </div>
    </div>
  );
}