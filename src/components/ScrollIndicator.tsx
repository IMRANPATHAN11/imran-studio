export default function ScrollIndicator() {
  return (
    <div className="mt-12 flex flex-col items-center text-slate-400">
      <span className="text-[0.7rem] uppercase tracking-[0.4em]">Scroll</span>
      <div className="mt-3 h-10 w-[1px] overflow-hidden bg-white/20">
        <div className="h-5 w-full animate-[scrollDown_2s_ease-in-out_infinite] rounded-full bg-gradient-to-b from-[#ff6b00] to-transparent" />
      </div>
    </div>
  );
}
