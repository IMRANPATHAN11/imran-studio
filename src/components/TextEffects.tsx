import { useEffect, useState } from 'react'

import SplitType from 'split-type'
import gsap from 'gsap'

/* ------------------------------------------------------------------ */
/* TypewriterText — realistic kinetic typing with blinking cursor      */
/* ------------------------------------------------------------------ */

type TypewriterTextProps = {
  text: string
  className?: string
  /** Base milliseconds per character (realistic jitter is added). */
  speed?: number
  /** When false, waits until this flips true (e.g. after splash). */
  play?: boolean
  /** Extra delay before typing starts, in ms. */
  delay?: number
}

export function TypewriterText({
  text,
  className = '',
  speed = 65,
  play = true,
  delay = 250,
}: TypewriterTextProps) {
  const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [displayed, setDisplayed] = useState(() => (reduceMotion ? text : ''))
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(text)
      return
    }
    if (!play) return

    let index = 0
    let timer: number | undefined
    let cursorTimer: number | undefined

    const typeChar = () => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index < text.length) {
        const ch = text[index - 1]
        // Spaces and punctuation feel slower — realistic typing rhythm.
        const wait = ch === ' ' ? 190 : /[.!?]/.test(ch) ? 260 : speed + Math.random() * 55
        timer = window.setTimeout(typeChar, wait)
      } else {
        // Finished — let the cursor blink for 2 seconds, then vanish.
        cursorTimer = window.setTimeout(() => setShowCursor(false), 2000)
      }
    }

    const startTimer = window.setTimeout(typeChar, delay)
    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(timer)
      window.clearTimeout(cursorTimer)
    }
  }, [text, speed, play, delay, reduceMotion])

  return (
    <span className={className}>
      {displayed}
      <span
        className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.18em] rounded-full bg-[#ff8a3d] ${
          showCursor ? 'animate-caret' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* useScrambleText — Linear-style scramble + optional kinetic words    */
/* ------------------------------------------------------------------ */

type UseScrambleTextOptions = {
  started?: boolean
  /** Stagger delay before the scramble begins, in ms. */
  delay?: number
  /** Also apply subtle mouse-reactive drift to the split words. */
  kinetic?: boolean
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'

/**
 * Splits a heading into characters and runs a one-time scramble reveal
 * (like Linear). Optionally attaches a subtle kinetic mouse reaction to
 * the words — small x-offset + rotation, never distracting.
 *
 * Respects prefers-reduced-motion (text stays as-is).
 */
export function useScrambleText(
  ref: React.RefObject<HTMLElement | null>,
  { started = true, delay = 0, kinetic = false }: UseScrambleTextOptions = {}
) {
  const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current
    if (!el || !started) return
    if (reduceMotion) return

    const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

    let split: SplitType | undefined
    const tweens: gsap.core.Tween[] = []

    try {
      split = new SplitType(el, { types: 'chars,words' })
    } catch {
      return
    }

    const chars = split.chars
    const words = split.words
    if (!chars || chars.length === 0) return

    const real = chars.map((c) => c.textContent ?? '')

    // Scramble: random glyph → settle to the real character.
    chars.forEach((c, i) => {
      c.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      const proxy = { v: 0 }
      tweens.push(
        gsap.to(proxy, {
          v: 1,
          duration: 0.5,
          delay: delay + i * 0.03,
          ease: 'power2.out',
          onUpdate: () => {
            c.textContent =
              proxy.v >= 1
                ? real[i]
                : Math.random() < 0.35
                  ? real[i]
                  : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          },
        })
      )
    })

    // Kinetic words: subtle mouse reaction.
    let removeMove: (() => void) | undefined
    if (kinetic && finePointer && words && words.length > 0) {
      // quickTo works on a single target — create one per word.
      const xTo = words.map((w) => gsap.quickTo(w, 'x', { duration: 0.9, ease: 'power3.out' }))
      const rotTo = words.map((w) => gsap.quickTo(w, 'rotation', { duration: 1.1, ease: 'power3.out' }))

      const onMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1
        const ny = (e.clientY / window.innerHeight) * 2 - 1
        words.forEach((_, i) => {
          const depth = 0.6 + (i % 3) * 0.3
          xTo[i](nx * 6 * depth)
          rotTo[i](ny * 1.1 * depth)
        })
      }

      window.addEventListener('mousemove', onMove, { passive: true })
      removeMove = () => {
        window.removeEventListener('mousemove', onMove)
        words.forEach((w) => gsap.killTweensOf(w))
      }
    }

    return () => {
      tweens.forEach((t) => t.kill())
      removeMove?.()
      try {
        split?.revert()
      } catch {
        /* noop */
      }
    }
  }, [ref, started, delay, kinetic, reduceMotion])
}