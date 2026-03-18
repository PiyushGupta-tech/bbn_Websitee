import { motion } from 'framer-motion'
import { stock } from '../data/images'

const imgs = [stock.ig1, stock.ig2, stock.ig3, stock.ig4, stock.ig5]

export function InstagramRow() {
  return (
    <section className="section container">
      <div className="ig-row">
        {imgs.map((src, i) => (
          <motion.div
            key={i}
            className="ig-cell"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img src={src} alt="" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
