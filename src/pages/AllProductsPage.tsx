import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProductCard } from '../components/ProductCard'
import { getAllProducts } from '../data/products'

export function AllProductsPage() {
  const list = getAllProducts()

  return (
    <div className="section container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <span aria-hidden> / </span>
        <span>All products</span>
      </nav>
      <motion.h1
        className="section-title"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        All products
      </motion.h1>
      <p
        style={{
          textAlign: 'center',
          color: 'var(--color-muted)',
          marginTop: -28,
          marginBottom: 16,
          maxWidth: 560,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Tap a product to open its page, choose your size, then add to cart.
      </p>
      <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: 40 }}>
        {list.length} products
      </p>
      <div className="product-grid">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  )
}
