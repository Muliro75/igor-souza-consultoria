import { type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion'

type ContainerScrollProps = {
  titleComponent: ReactNode
  children: ReactNode
}

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress: desktopScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.72', 'start -0.08'],
  })
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'start 0.15'],
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 760)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollProgress = isMobile ? mobileScrollProgress : desktopScrollProgress
  const rotate = useTransform(scrollProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollProgress, [0, 1], isMobile ? [.7, .9] : [1.05, 1])
  const translate = useTransform(scrollProgress, [0, 1], [0, -100])

  return (
    <div className="container-scroll" ref={containerRef}>
      <div className="container-scroll__perspective">
        <motion.div className="container-scroll__heading" style={{ y: translate }}>
          {titleComponent}
        </motion.div>
        <ContainerScrollCard rotate={rotate} scale={scale}>
          {children}
        </ContainerScrollCard>
      </div>
    </div>
  )
}

function ContainerScrollCard({ rotate, scale, children }: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      className="container-scroll__card"
      style={{
        rotateX: rotate,
        scale,
        boxShadow: '0 9px 20px #0000003d, 0 37px 37px #00000036, 0 84px 50px #00000026, 0 149px 60px #00000012',
      }}
    >
      <div className="container-scroll__screen">{children}</div>
    </motion.div>
  )
}
