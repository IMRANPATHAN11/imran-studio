import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import ScrollReveal from './ScrollReveal';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  budget: '',
  projectType: '',
  timeline: '',
  message: '',
};

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxzEV_IdPNxBzSzvbCUBez7UL-mt_0v86doPe5sbNiMnXTATeLKTGLg6oU7EJ1_BYOM7g/exec';

export default function Contact() {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const autoCloseTimerRef = useRef<number | null>(null);

  // Auto-close success popup after 2 seconds + reset form
  useEffect(() => {
    if (!showSuccess) return;

    autoCloseTimerRef.current = window.setTimeout(() => {
      setShowSuccess(false);
      setFormState(initialFormState);
      setError('');
    }, 2000);

    return () => {
      if (autoCloseTimerRef.current !== null) {
        clearTimeout(autoCloseTimerRef.current);
        autoCloseTimerRef.current = null;
      }
    };
  }, [showSuccess]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, phone, company, budget, projectType, timeline, message } = formState;
    const missingFields = [name, email, phone, company, budget, projectType, timeline, message].some((field) => !field.trim());

    if (missingFields) {
      setError('Please complete all required fields before sending your message.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          budget: budget.trim(),
          projectType: projectType.trim(),
          timeline: timeline.trim(),
          message: message.trim(),
        }),
      });

      const text = await response.text();
      console.log('Server Response:', text);

      setShowSuccess(true);
      setError('');
      // Do NOT scroll to top - "Do NOT scroll page"
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute right-[8%] bottom-[10%] h-44 w-44 rounded-full bg-[#ff6b00]/10 blur-[140px]" />
      <ScrollReveal className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/15 to-white/5 p-8 shadow-[0_0_70px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Contact</p>
            <h2 className="mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
              Let&rsquo;s build something exceptional together.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Whether you need a new website, a product experience, or a full digital launch, I&rsquo;m ready to help.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Start a conversation</p>
            <a href="mailto:techimran0111@gmail.com?subject=Project%20Inquiry&body=Hello%20Imran,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20my%20project.%0D%0A%0D%0ABest%20Regards" className="mt-4 block text-2xl font-semibold text-white transition hover:text-[#ff6b00]">
              techimran0111@gmail.com
            </a>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-400">
                  <span className="mb-2 block">Name</span>
                  <input
                    aria-label="Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#ff6b00]"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="block text-sm text-slate-400">
                  <span className="mb-2 block">Email</span>
                  <input
                    aria-label="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#ff6b00]"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="block text-sm text-slate-400">
                  <span className="mb-2 block">Phone</span>
                  <input
                    aria-label="Phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#ff6b00]"
                    placeholder="Phone number"
                    required
                  />
                </label>
                <label className="block text-sm text-slate-400">
                  <span className="mb-2 block">Company</span>
                  <input
                    aria-label="Company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#ff6b00]"
                    placeholder="Company name"
                    required
                  />
                </label>
                <label className="block text-sm text-slate-400">
                  <span className="mb-2 block">Budget</span>
                  <input
                    aria-label="Budget"
                    name="budget"
                    value={formState.budget}
                    onChange={handleChange}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#ff6b00]"
                    placeholder="Estimated budget"
                    required
                  />
                </label>
                <label className="block text-sm text-slate-400">
                  <span className="mb-2 block">Project Type</span>
                  <select
                    aria-label="Project Type"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className="w-full rounded-full border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-[#ff6b00]"
                    required
                  >
                    <option value="">Select one</option>
                    <option value="Website">Website</option>
                    <option value="Web App">Web App</option>
                    <option value="Brand System">Brand System</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </label>
                <label className="block text-sm text-slate-400 sm:col-span-2">
                  <span className="mb-2 block">Timeline</span>
                  <input
                    aria-label="Timeline"
                    name="timeline"
                    value={formState.timeline}
                    onChange={handleChange}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#ff6b00]"
                    placeholder="When do you want to start?"
                    required
                  />
                </label>
              </div>
              <label className="block text-sm text-slate-400">
                <span className="mb-2 block">Message</span>
                <textarea
                  aria-label="Message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="min-h-28 w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#ff6b00]"
                  placeholder="Tell me about your project"
                  required
                />
              </label>
              {error && <p className="rounded-full border border-[#ff6b00]/30 bg-[#ff6b00]/10 px-4 py-3 text-sm text-[#ffb36b]">{error}</p>}
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="inline-flex rounded-full bg-[#ff6b00] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,107,0,0.25)] transition duration-300 hover:scale-105 hover:bg-[#ff7b2a] hover:shadow-[0_0_70px_rgba(255,107,0,0.45)]"
              >
                <span className="inline-flex items-center gap-2">
                  {isSubmitting ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </span>
              </MagneticButton>
            </form>
          </div>
        </div>
      </ScrollReveal>

      {/* Premium Success Popup - auto-closes after 2s, no OK button */}
      <AnimatePresence>
        {showSuccess && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              aria-hidden="true"
            />
            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-[110] flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-label="Message sent successfully"
            >
              <motion.div
                className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#0c0c0c]/95 via-[#0f0a06]/95 to-[#0c0c0c]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,107,0,0.18)]"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Premium glow background */}
                <div className="pointer-events-none absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-[#ff6b00]/20 via-transparent to-[#ff8a3d]/10 opacity-50 blur-xl" />

                {/* Glass card content */}
                <div className="relative z-10 p-8 text-center">
                  {/* Green checkmark circle */}
                  <motion.div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-gradient-to-br from-emerald-400/20 to-emerald-500/10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 12 }}
                  >
                    <motion.svg
                      className="h-8 w-8 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </motion.svg>
                  </motion.div>

                  {/* Text */}
                  <motion.h3
                    className="mt-6 text-2xl font-semibold text-white"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
                  >
                    Message Sent Successfully!
                  </motion.h3>
                  <motion.p
                    className="mt-3 text-base leading-7 text-slate-300"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
                  >
                    {`Thank you for contacting me. I'll get back to you shortly.`}
                  </motion.p>

                  {/* Auto-close progress bar */}
                  <motion.div
                    className="mx-auto mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ delay: 0.5, duration: 1.5, ease: 'linear' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {error && !showSuccess && (
        <div className="fixed right-4 top-4 z-[95] max-w-sm rounded-[1rem] border border-[#ff6b00]/30 bg-[#090909]/95 px-4 py-3 text-sm text-[#ffb36b] shadow-[0_0_40px_rgba(255,107,0,0.16)] backdrop-blur-xl">
          {error}
        </div>
      )}
    </section>
  );
}