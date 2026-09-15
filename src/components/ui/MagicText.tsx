import { useMemo, useRef } from 'react'
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export interface MagicTextProps {
  text: string
  highlights?: string[]
  className?: string
  progress?: MotionValue<number>
  progressRange?: [number, number]
}

function normalize(value: string) {
  return value.toLocaleLowerCase('pt-BR').replace(/[^\p{L}\p{N}]/gu, '')
}

function Word({ children, progress, range, highlighted }: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  highlighted: boolean
}) {
  const opacity = useTransform(progress, range, [0, 1])
  const reduceMotion = useReducedMotion()

  return (
    <span className={`magic-text__word ${highlighted ? 'is-highlighted' : ''}`}>
      <span className="magic-text__ghost" aria-hidden="true">{children}</span>
      <motion.span className="magic-text__reveal" style={{ opacity: reduceMotion ? 1 : opacity }}>{children}</motion.span>
    </span>
  )
}

export function MagicText({ text, highlights = [], className = '', progress, progressRange = [0, 1] }: MagicTextProps) {
  const container = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  })
  const revealProgress = progress ?? scrollYProgress
  const [rangeStart, rangeEnd] = progressRange
  const rangeLength = rangeEnd - rangeStart
  const words = text.split(/\s+/)
  const highlightedWords = useMemo(
    () => new Set(highlights.flatMap((phrase) => phrase.split(/\s+/).map(normalize))),
    [highlights],
  )

  return (
    <p ref={container} className={`magic-text ${className}`}>
      {words.map((word, index) => {
        const start = rangeStart + (index / words.length) * rangeLength
        const end = rangeStart + ((index + 1) / words.length) * rangeLength
        return (
          <Word
            key={`${word}-${index}`}
            progress={revealProgress}
            range={[start, end]}
            highlighted={highlightedWords.has(normalize(word))}
          >
            {word}
          </Word>
        )
      })}
    </p>
  )
}
