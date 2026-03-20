import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart, cartLineKey } from '../context/CartContext'

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function CartPage() {
  const navigate = useNavigate()
  const { linesWithProduct, subtotal, setQty, removeFromCart } = useCart()

  const handleCheckout = useCallback(() => {
    if (linesWithProduct.length === 0) return
    const itemCount = linesWithProduct.reduce((n, { line }) => n + line.qty, 0)
    navigate('/checkout', { state: { itemCount, subtotal } })
  }, [linesWithProduct, subtotal, navigate])

  if (linesWithProduct.length === 0) {
    return (
      <div className="container prose-page" style={{ textAlign: 'center' }}>
        <h1>Your cart is empty</h1>
        <Link to="/" className="btn-primary btn-dark" style={{ marginTop: 24, display: 'inline-block' }}>
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '32px 20px 64px', maxWidth: 720 }}>
      <h1 className="section-title" style={{ textAlign: 'left' }}>
        Shopping cart
      </h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {linesWithProduct.map(({ line, product }) => (
          <motion.li
            key={cartLineKey(line)}
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
                referrerPolicy="no-referrer"
                style={{ borderRadius: 8, objectFit: 'cover' }}
              />
            </Link>
            <div>
              <Link to={`/products/${product.slug}`} style={{ fontWeight: 600 }}>
                {product.title.slice(0, 80)}
                {product.title.length > 80 ? '…' : ''}
              </Link>
              <p style={{ margin: '8px 0 0', fontWeight: 700 }}>{formatInr(product.price)}</p>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--color-muted)' }}>
                Size: <strong style={{ color: 'var(--color-text)' }}>{line.size}</strong>
              </p>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <label>
                  Qty{' '}
                  <input
                    type="number"
                    min={1}
                    value={line.qty}
                    onChange={(e) =>
                      setQty(product.id, line.size, Math.max(1, parseInt(e.target.value, 10) || 1))
                    }
                    style={{ width: 56, padding: 6, marginLeft: 8 }}
                  />
                </label>
                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() => removeFromCart(product.id, line.size)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div style={{ fontWeight: 700 }}>{formatInr(product.price * line.qty)}</div>
          </motion.li>
        ))}
      </ul>
      <div style={{ marginTop: 32, textAlign: 'right' }}>
        <p style={{ fontSize: 14, color: 'var(--color-muted)', marginBottom: 8 }}>
          Shipping calculated at next step (demo).
        </p>
        <p style={{ fontSize: 20, fontWeight: 700 }}>Subtotal: {formatInr(subtotal)}</p>
        <motion.button
          type="button"
          className="btn-primary btn-dark"
          style={{ marginTop: 16, padding: '16px 48px' }}
          whileHover={{ scale: 1.02 }}
          onClick={handleCheckout}
        >
          Check out
        </motion.button>
      </div>
    </div>
  )
}
