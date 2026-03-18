import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/ProductCard'
import { getProductsByCategory } from '../data/products'

const titles: Record<string, string> = {
  'new-arrivals': 'New Arrivals',
  sarees: 'Sarees',
  'lehenga-choli': 'Lehenga Choli',
  'salwar-kameez': 'Salwar Kameez',
  'indo-western': 'Indo-Western',
  jewellery: 'Jewellery',
  'gown-dresses': 'Gown & Dresses',
  'couple-pairs': 'Couple Pairs',
}

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const slug = categorySlug ?? ''
  const products = getProductsByCategory(slug)
  const title = titles[slug] ?? slug.replace(/-/g, ' ')

  if (!products.length) {
    return (
      <div className="container prose-page">
        <h1>Collection not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  return (
    <div className="section container" style={{ paddingTop: 32 }}>
      <motion.h1
        className="section-title"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h1>
      <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginTop: -28, marginBottom: 40 }}>
        {products.length} products
      </p>
      <div className="product-grid">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  )
}
