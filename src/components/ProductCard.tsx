import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../data/types'
import { discountPercent } from '../data/products'
import { useCart } from '../context/CartContext'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="stars" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}>{n <= Math.round(rating) ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const pct = discountPercent(product)

  const onQuickAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      addToCart(product.id)
      setAdded(true)
      window.setTimeout(() => setAdded(false), 1800)
    },
    [addToCart, product.id]
  )

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="product-card-img-wrap">
        {pct > 0 && <span className="badge-save">Save {pct}%</span>}
        <span className="badge-sale">
          BIG
          <br />
          SALE
        </span>
        <Link to={`/products/${product.slug}`} style={{ display: 'block', height: '100%' }}>
          <img
            src={product.image}
            alt=""
            loading="lazy"
            width={360}
            height={480}
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="product-card-overlay">
          <button
            type="button"
            className={`quick-add${added ? ' added-flash' : ''}`}
            onClick={onQuickAdd}
            aria-label={added ? 'Added to cart' : `Add ${product.title.slice(0, 40)} to cart`}
          >
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
      <div className="product-card-body">
        <Stars rating={product.rating} />
        <h3 className="product-card-title">
          <Link to={`/products/${product.slug}`}>{product.title}</Link>
        </h3>
        <div className="product-prices">
          {formatInr(product.price)}
          {product.compareAtPrice > product.price && (
            <del>{formatInr(product.compareAtPrice)}</del>
          )}
        </div>
      </div>
    </motion.article>
  )
}
