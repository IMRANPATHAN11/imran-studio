import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './index.css'
import App from './App.tsx'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scrolling integrated with GSAP ScrollTrigger
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.6,
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Expose lenis for programmatic scrolling (e.g. anchor navigation)
;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

// Intercept in-page anchor links so they scroll smoothly via Lenis
document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
  if (!target) return
  const hash = target.getAttribute('href')
  if (!hash || hash === '#') return
  const element = document.querySelector(hash)
  if (!element) return
  event.preventDefault()
  lenis.scrollTo(element as HTMLElement, { offset: -80, duration: 1.2 })
})

const rootElement = document.getElementById('root')!
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Reveal the app once React has mounted (prevents FOUC)
requestAnimationFrame(() => {
  rootElement.classList.add('is-ready')
})
