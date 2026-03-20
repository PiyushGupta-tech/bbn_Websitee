import { motion } from 'framer-motion'

const reviews = [
  {
    title: 'Graceful Anarkali Suit',
    text: 'Delighted with this Graceful Designer Embroidered Anarkali Suit! The design and fabric exceeded expectations. 😊',
    author: 'Mona Singh',
    product: 'Orange Georgette Embroidered Sequin Anarkali',
  },
  {
    title: 'Beautiful Anarkali Suit',
    text: 'Absolutely stunning beautiful yellow chinon silk anarkali suit – great fit, rich fabric!',
    author: 'Anaya Sharma',
    product: 'Yellow Chinnon Silk Embroidered Anarkali',
  },
  {
    title: 'Gorgeous Banarasi Saree',
    text: 'Such elegant detailing and soft texture. Totally worth it! ❤️',
    author: 'Swati Desai',
    product: 'Banarasi Bridal Tissue Silk Saree',
  },
  {
    title: 'Classic Silk Saree',
    text: 'Traditional with a modern touch. Perfect! 💕',
    author: 'Ritika Joshi',
    product: 'Graceful Loom Pure Handloom Silk Saree',
  },
  {
    title: 'Royal Silk Saree',
    text: 'Perfect for weddings or festive days! Feels luxurious. 💫',
    author: 'Ritika Joshi',
    product: 'Soft Viscose Silk Woven Patola Saree',
  },
]

const doubled = [...reviews, ...reviews, ...reviews]

export function HomeReviews() {
  return (
    <section className="section container">
      <h2 className="section-title section-title--reviews-cursive-black">Let customers speak for us</h2>
      <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginTop: -24, marginBottom: 32 }}>
        from 480+ reviews
      </p>
      <div className="reviews-strip" style={{ borderRadius: 12, margin: '0 -20px' }}>
        <div className="reviews-track">
          {doubled.map((r, i) => (
            <motion.div
              key={i}
              className="review-card"
              whileHover={{ y: -4 }}
            >
              <div className="stars">★★★★★</div>
              <strong style={{ display: 'block', marginBottom: 8 }}>{r.title}</strong>
              <p style={{ fontSize: 14, color: 'var(--color-muted)', margin: '0 0 12px' }}>{r.text}</p>
              <p style={{ fontSize: 13, fontWeight: 600 }}>{r.author}</p>
              <p style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 8 }}>{r.product}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
