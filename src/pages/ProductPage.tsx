import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductBySlug, getRelated, discountPercent } from '../data/products'
import { getSizesForProduct } from '../data/productSizes'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
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
  const { has, toggle } = useWishlist()
  const [justAdded, setJustAdded] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [sizeError, setSizeError] = useState(false)
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const sizes = useMemo(() => (product ? getSizesForProduct(product) : []), [product])

  useEffect(() => {
    if (!slug) return
    const p = getProductBySlug(slug)
    if (!p) return
    const list = getSizesForProduct(p)
    setSelectedSize((prev) => (list.includes(prev) ? prev : list[0] ?? ''))
    setSizeError(false)
  }, [slug])

  const handleAddToCart = useCallback(() => {
    if (!product) return
    const list = getSizesForProduct(product)
    const size = selectedSize || list[0]
    if (!size || !list.includes(size)) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addToCart(product.id, { size, qty: 1 })
    setJustAdded(true)
    if (addedTimer.current) clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setJustAdded(false), 2500)
  }, [addToCart, product, selectedSize])

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
  const inWishlist = has(product.id)
  const showSizePicker = sizes.length > 0

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

          {showSizePicker && (
            <div className="pdp-size-block">
              <p className="pdp-size-label" id="pdp-size-label">
                Select size
              </p>
              <div
                className={`pdp-size-picker${sizeError ? ' pdp-size-picker--error' : ''}`}
                role="group"
                aria-labelledby="pdp-size-label"
              >
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`pdp-size-btn${selectedSize === sz ? ' pdp-size-btn--active' : ''}`}
                    onClick={() => {
                      setSelectedSize(sz)
                      setSizeError(false)
                    }}
                    aria-pressed={selectedSize === sz}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="pdp-size-hint" role="alert">
                  Please select a size.
                </p>
              )}
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
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
            <motion.button
              type="button"
              className={`pdp-wishlist-btn${inWishlist ? ' pdp-wishlist-btn--active' : ''}`}
              onClick={() => toggle(product.id)}
              aria-pressed={inWishlist}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill={inWishlist ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </motion.button>
          </div>
          {imgs.length > 1 && (
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              {imgs.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt=""
                  width={80}
                  height={107}
                  referrerPolicy="no-referrer"
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
