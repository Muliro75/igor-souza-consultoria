import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export type ResultShowcaseSlide = {
  src: string
  alt: string
}

type ResultsShowcaseProps = {
  slides: ResultShowcaseSlide[]
}

export function ResultsShowcase({ slides }: ResultsShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex]

  const selectSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  return (
    <div className="result-gallery">
      <div className="result-gallery__stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={activeSlide.src}
            className="result-gallery__figure"
            initial={{ opacity: 0, scale: 1.025, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: -12 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -55) selectSlide(activeIndex + 1)
              if (info.offset.x > 55) selectSlide(activeIndex - 1)
            }}
          >
            <img className="result-gallery__ambient" src={activeSlide.src} alt="" aria-hidden="true" />
            <img className="result-gallery__image" src={activeSlide.src} alt={activeSlide.alt} />
          </motion.figure>
        </AnimatePresence>

        <div className="result-gallery__shade" aria-hidden="true" />

        <div className="result-gallery__controls">
          <button type="button" onClick={() => selectSlide(activeIndex - 1)} aria-label="Ver resultado anterior">
            <ArrowLeft size={19} strokeWidth={1.8} />
          </button>
          <button type="button" onClick={() => selectSlide(activeIndex + 1)} aria-label="Ver próximo resultado">
            <ArrowRight size={19} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="result-gallery__thumbs" aria-label="Selecionar resultado">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.src}
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => selectSlide(index)}
            aria-label={`Ver resultado ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <img src={slide.src} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}
