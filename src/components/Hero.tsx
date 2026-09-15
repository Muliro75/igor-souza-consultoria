import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { consultationUrl } from '../data/content'

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: .95, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function Hero() {
  const hero = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ['start start', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.085])
  const contentY = useTransform(scrollYProgress, [0, .85], [0, -54])
  const contentOpacity = useTransform(scrollYProgress, [0, .68], [1, .12])
  const transitionY = useTransform(scrollYProgress, [0, .72, 1], [54, 18, 0])
  const transitionScale = useTransform(scrollYProgress, [0, 1], [.84, 1])

  return (
    <section className="hero hero-cinematic" id="inicio" ref={hero}>
      <motion.div className="hero-cinematic__media" style={{ scale: videoScale }} aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
        >
          <source src="/assets/media/hero-igor-cinematic.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="hero-cinematic__scrim" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <motion.div className="hero-cinematic__content" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="hero-cinematic__identity">
          <motion.h1 variants={reveal} initial="hidden" animate="visible" custom={.28}>
            <span>Ígor</span>
            <span>Souza</span>
          </motion.h1>
        </div>

        <motion.div className="hero-cinematic__promise" variants={reveal} initial="hidden" animate="visible" custom={.58}>
          <p>Construa um corpo que <em>não passa despercebido.</em></p>
          <span>Treino e estratégia ajustados ao seu objetivo, à sua rotina e à sua evolução.</span>
        </motion.div>

        <motion.a
          className="hero-primary-cta"
          href={consultationUrl}
          target="_blank"
          rel="noreferrer"
          variants={reveal}
          initial="hidden"
          animate="visible"
          custom={.72}
        >
          Quero solicitar uma vaga <i><ArrowUpRight size={18} /></i>
        </motion.a>

      </motion.div>

      <motion.div className="hero-transition-arc" aria-hidden="true" style={{ y: transitionY, scaleX: transitionScale }} />
    </section>
  )
}
