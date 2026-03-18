import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function CartPage() {
  const { linesWithProduct, subtotal, setQty, removeFromCart } = useCart()

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
                {product.title.slice(0, 80)}
                {product.title.length > 80 ? '…' : ''}
              </Link>
              <p style={{ margin: '8px 0 0', fontWeight: 700 }}>{formatInr(product.price)}</p>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <label>
                  Qty{' '}
                  <input
                    type="number"
                    min={1}
                    value={line.qty}
                    onChange={(e) => setQty(product.id, Math.max(1, parseInt(e.target.value, 10) || 1))}
                    style={{ width: 56, padding: 6, marginLeft: 8 }}
                  />
                </label>
                <button type="button" className="cart-remove-btn" onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
              </div>
            </div>
            <div style={{ fontWeight: 700 }}>{formatInr(product.price * line.qty)}</div>
          </motion.li>
        ))}
      </ul>
      <div style={{ marginTop: 32, textAlign: 'right' }}>
        <p style={{ fontSize: 20, fontWeight: 700 }}>Subtotal: {formatInr(subtotal)}</p>
        <motion.button
          type="button"
          className="btn-primary btn-dark"
          style={{ marginTop: 16, padding: '16px 48px' }}
          whileHover={{ scale: 1.02 }}
          onClick={() => alert('Checkout is demo only. Connect your payment gateway here.')}
        >
          Check out
        </motion.button>
      </div>
    </div>
  )
}
