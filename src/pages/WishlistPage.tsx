import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext'

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function WishlistPage() {
  const { items, remove } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="container prose-page" style={{ textAlign: 'center', padding: '48px 20px 64px' }}>
        <h1>Your wishlist is empty</h1>
        <p style={{ color: 'var(--color-muted)', marginTop: 12 }}>
          Save items you love by tapping the heart on any product page.
        </p>
        <Link to="/" className="btn-primary btn-dark" style={{ marginTop: 24, display: 'inline-block' }}>
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '32px 20px 64px', maxWidth: 720 }}>
      <h1 className="section-title" style={{ textAlign: 'left' }}>
        Wishlist
      </h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((product) => (
          <motion.li
            key={product.id}
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr auto',
              gap: 20,
              alignItems: 'center',
              padding: '20px 0',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <Link to={`/products/${product.slug}`}>
              <img
                src={product.image}
                alt=""
                width={100}
                height={133}
                style={{ borderRadius: 8, objectFit: 'cover' }}
              />
            </Link>
            <div>
              <Link to={`/products/${product.slug}`} style={{ fontWeight: 600 }}>
                {product.title.slice(0, 100)}
                {product.title.length > 100 ? '…' : ''}
              </Link>
              <p style={{ margin: '8px 0 0', fontWeight: 700 }}>{formatInr(product.price)}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              <Link to={`/products/${product.slug}`} className="btn-primary btn-dark" style={{ fontSize: 11, padding: '8px 14px' }}>
                View
              </Link>
              <button
                type="button"
                className="cart-remove-btn"
                onClick={() => remove(product.id)}
              >
                Remove
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
