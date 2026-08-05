import VisitorCounter from './VisitorCounter';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-6 py-12 sm:px-8 lg:px-12">
      {/* Premium static visitor statistics */}
      <div className="mx-auto mb-14 flex max-w-6xl justify-center">
        <VisitorCounter />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#ff6b00]">Imran Tech</p>
          <p className="mt-3 text-sm text-slate-400">© 2026 Imran Tech. Crafted for modern brands and ambitious launches.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          <a href="https://instagram.com/i_k_.111" target="_blank" rel="noreferrer" className="transition hover:text-[#ff6b00]">Instagram</a>
          <a href="mailto:techimran0111@gmail.com?subject=Project%20Inquiry&body=Hello%20Imran,%0D%0A%0D%I%20would%20like%20to%20discuss%20my%20project.%0D%0A%0D%0ABest%20Regards" className="transition hover:text-[#ff6b00]">Email</a>
          <a href="#home" className="transition hover:text-[#ff6b00]">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
