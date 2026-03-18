import { useState, useCallback, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductBySlug, getRelated, discountPercent } from '../data/products'
import { useCart } from '../context/CartContext'
import { ProductCard } from '../components/ProductCard'

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleAddToCart = useCallback(() => {
    if (!product) return
    addToCart(product.id)
    setJustAdded(true)
    if (addedTimer.current) clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setJustAdded(false), 2500)
  }, [addToCart, product])

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current)
    }
  }, [])

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product not found</h1>
        <Link to="/" className="btn-primary btn-dark" style={{ marginTop: 24, display: 'inline-block' }}>
          Continue shopping
        </Link>
      </div>
    )
  }

  const related = getRelated(product)
  const pct = discountPercent(product)
  const imgs = product.images ?? [product.image]

  return (
    <div className="container" style={{ padding: '32px 20px 64px' }}>
      <div className="pdp-grid">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pdp-gallery-main"
        >
          <img src={product.image} alt={product.title} />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {pct > 0 && (
            <span className="badge-save" style={{ position: 'static', display: 'inline-block', marginBottom: 12 }}>
              Save {pct}%
            </span>
          )}
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16 }}>
            {product.title}
          </h1>
          <div className="product-prices" style={{ fontSize: 22, marginBottom: 20 }}>
            {formatInr(product.price)}
            {product.compareAtPrice > product.price && (
              <del style={{ fontSize: 18 }}>{formatInr(product.compareAtPrice)}</del>
            )}
          </div>
          <p style={{ color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: 28 }}>
            {product.description}
          </p>
          <motion.button
            type="button"
            className={`btn-primary btn-dark${justAdded ? ' pdp-added' : ''}`}
            style={{ padding: '16px 40px', fontSize: 12, minWidth: 220 }}
            onClick={handleAddToCart}
            whileHover={{ scale: justAdded ? 1 : 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-live="polite"
          >
            {justAdded ? 'Added to cart ✓' : 'Add to cart'}
          </motion.button>
          {imgs.length > 1 && (
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              {imgs.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt=""
                  width={80}
                  height={107}
                  style={{ borderRadius: 8, objectFit: 'cover', cursor: 'pointer' }}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {related.length > 0 && (
        <section style={{ marginTop: 64 }}>
          <h2 className="section-title">You may also like</h2>
          <div className="product-grid">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
