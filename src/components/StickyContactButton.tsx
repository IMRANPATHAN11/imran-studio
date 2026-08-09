export default function StickyContactButton() {
  return (
    <a
      href="#contact"
      className="sticky-contact fixed bottom-4 right-4 z-[65] rounded-full border border-[#ff6b00]/30 bg-[#ff6b00] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,107,0,0.25)] transition duration-300 hover:scale-105 hover:bg-[#ff7b2a] md:bottom-6 md:right-6"
    >
      Let's Talk
    </a>
  );
}
