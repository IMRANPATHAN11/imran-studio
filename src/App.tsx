import { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import About from './components/About';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FeaturedProject from './components/FeaturedProject';
import Hero from './components/Hero';
import SplashScreen from './components/SplashScreen';
import MouseGlow from './components/MouseGlow';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Process from './components/Process';
import Services from './components/Services';
import StickyContactButton from './components/StickyContactButton';
import TechnologyStack from './components/TechnologyStack';
import WhyChooseMe from './components/WhyChooseMe';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [heroStarted, setHeroStarted] = useState(false);
  const prefersReducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const reduceMotion = useReducedMotion();

  // Lock scrolling + smooth-scroll engine + pointer events while the splash screen is visible
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (showSplash) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
    };
  }, [showSplash]);

  // When splash finishes: reset scroll to absolute top BEFORE revealing the main page
  const handleSplashFinish = useCallback(() => {
    // Stop Lenis first so native scrollTo works
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void; scrollTo(el: HTMLElement | number, opts?: unknown): void } }).__lenis;
    lenis?.stop();

    // Instantly reset scroll position to absolute top
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Remove overflow:hidden + pointer-events immediately so no flash
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';

    // Now reveal the main page by hiding the splash
    setShowSplash(false);

    // Start Lenis again after a microtask to ensure DOM has settled
    requestAnimationFrame(() => {
      lenis?.start();
      // Trigger hero entrance after Lenis is ready
      setHeroStarted(true);
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}
      </AnimatePresence>

      <motion.div
        className={`relative min-h-screen overflow-hidden bg-[#050505] text-white ${showSplash ? 'pointer-events-none' : ''}`}
        data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <ParticleBackground />
        <MouseGlow />
        <CustomCursor />

        {/* Navbar fades in together with the page */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? -12 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Navbar />
        </motion.div>

        <Hero started={heroStarted} />
        <About />
        <TechnologyStack />
        <WhyChooseMe />
        <FeaturedProject />
        <Services />
        <Process />
        <FAQ />
        <Contact />
        <Footer />
        <StickyContactButton />
      </motion.div>
    </>
  );
}