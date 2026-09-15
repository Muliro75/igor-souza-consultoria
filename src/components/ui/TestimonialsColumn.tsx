import { motion } from 'framer-motion'

export type Testimonial = {
  text: string
  name: string
  role: string
  label: string
  avatar: {
    image: string
    size: string
    position: string
  }
}

export function TestimonialsColumn({ testimonials, duration = 16, className = '' }: {
  testimonials: Testimonial[]
  duration?: number
  className?: string
}) {
  return (
    <div className={`testimonials-column ${className}`}>
      <motion.div
        className="testimonials-column__track"
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      >
        {[0, 1].flatMap((loop) => testimonials.map(({ text, name, role, label, avatar }, index) => (
          <figure className="testimonial-card" key={`${loop}-${index}`}>
            <span>{label}</span>
            <blockquote>“{text}”</blockquote>
            <figcaption>
              <i
                className="testimonial-avatar"
                aria-hidden="true"
                style={{
                  backgroundImage: `url(${avatar.image})`,
                  backgroundSize: avatar.size,
                  backgroundPosition: avatar.position,
                }}
              />
              <span><strong>{name}</strong><small>{role}</small></span>
            </figcaption>
          </figure>
        )))}
      </motion.div>
    </div>
  )
}
