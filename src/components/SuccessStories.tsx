import { motion } from 'framer-motion'
import { stock } from '../data/images'

const stories = [
  {
    title: 'Wholesale That Feels Like Luxury',
    quote:
      'Their Bridal Lehengas and Organza Sarees are pure luxury at wholesale prices. 5-day doorstep delivery!',
    author: 'Sneha Patel',
    role: 'Retailer, Surat',
    img: stock.q,
  },
  {
    title: 'Best Quality & Fast Delivery!',
    quote:
      'bbn is my go-to B2B store for Silk Sarees & Bridal Lehengas. Excellent quality and great service.',
    author: 'Neha Sharma',
    role: 'Boutique Owner, Mumbai',
    img: stock.s,
  },
]

export function SuccessStories() {
  return (
    <section className="section container">
      <h2 className="section-title">Success Stories That Inspire</h2>
      <div className="stories-grid">
        {stories.map((s, i) => (
          <motion.div
            key={i}
            className="story-card"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <img className="story-avatar" src={s.img} alt="" width={72} height={72} />
            <h3 style={{ fontSize: 17, marginBottom: 12 }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: 16 }}>
              &ldquo;{s.quote}&rdquo;
            </p>
            <p style={{ fontWeight: 700 }}>— {s.author}</p>
            <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>{s.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
