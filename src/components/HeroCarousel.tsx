import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { heroFullBleed } from '../data/images'

const slides = [
  {
    eyebrow: 'SALWAR KAMEEZ',
    title: 'Trendy Twists on Tradition',
    sub: 'The New Age Ethnic Look',
    cta: 'COLLECTION',
    href: '/collections/salwar-kameez',
    bg: heroFullBleed.salwar,
  },
  {
    eyebrow: 'SAREE GLAM',
    title: 'Grace Draped in Tradition',
    sub: 'Luxury in Every Drape',
    cta: 'ORDER NOW',
    href: '/collections/sarees',
    bg: heroFullBleed.saree,
  },
  {
    eyebrow: 'INDO-WESTERN',
    title: 'Designed for the Modern Diva',
    sub: 'Essence of Celebration',
    cta: 'COLLECTION',
    href: '/collections/indo-western',
    bg: heroFullBleed.indoWestern,
  },
]

export function HeroCarousel() {
  const [i, setI] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setImgLoaded(false)
  }, [i])

  const s = slides[i]

  /* SAREE GLAM — deep red frame around image (matches top banner styling) */
  const redFrameHero = i === 1

  return (
    <section
      className={`hero${redFrameHero ? ' hero--red-frame' : ''}`}
      aria-label="Featured collections"
    >
      <div className="hero-media">
        <AnimatePresence mode="wait">
          <motion.img
            key={s.bg}
            src={s.bg}
            alt=""
            className={`hero-image${imgLoaded ? ' is-loaded' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: imgLoaded ? 1 : 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onLoad={() => setImgLoaded(true)}
            decoding="async"
          />
        </AnimatePresence>
        <div className="hero-shade" aria-hidden />
      </div>

      <div className="hero-overlay">
        <div className="container">
          <div className="hero-copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.4 }}
              >
                <p className="hero-eyebrow">{s.eyebrow}</p>
                <h1 className="hero-title">{s.title}</h1>
                <p className="hero-sub">{s.sub}</p>
                <Link to={s.href} className="btn-primary">
                  {s.cta}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="hero-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`hero-dot ${idx === i ? 'active' : ''}`}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </section>
  )
}
