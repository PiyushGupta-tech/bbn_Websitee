import { motion } from 'framer-motion'

const badges = [
  { title: 'QUALITY CHECK', sub: 'Premium craftsmanship with rigorous quality control' },
  { title: 'PAYMENT SECURED', sub: 'Safe secure payment options' },
  { title: 'AFFORDABLE COST', sub: 'Budget friendly ethnic fashion beautifully crafted' },
  { title: 'CUSTOMIZED ORDERS', sub: 'Tailored designs to match your style' },
]

export function TrustBadges() {
  return (
    <section className="container trust-row">
      {badges.map((b, i) => (
        <motion.div
          key={b.title}
          className="trust-item"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ scale: 1.03 }}
        >
          <h3>{b.title}</h3>
          <p>{b.sub}</p>
        </motion.div>
      ))}
    </section>
  )
}
