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
      <section className="cart-page" aria-labelledby="cart-empty-heading">
        <div className="cart-page-bg" aria-hidden />
        <div className="container cart-page-inner">
          <div className="cart-page-empty">
            <p className="cart-page-eyebrow">Your bag</p>
            <h1 id="cart-empty-heading" className="cart-page-title">
              Your cart is empty
            </h1>
            <p className="cart-page-empty-lead">
              Discover sarees, lehengas, and more — curated for every celebration.
            </p>
            <Link to="/" className="btn-primary cart-page-checkout-btn cart-page-empty-cta">
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-page" aria-labelledby="cart-heading">
      <div className="cart-page-bg" aria-hidden />
      <div className="container cart-page-inner">
        <header className="cart-page-header">
          <p className="cart-page-eyebrow">Your selection</p>
          <h1 id="cart-heading" className="cart-page-title">
            Shopping cart
          </h1>
        </header>

        <div className="cart-page-card">
          <ul className="cart-page-list">
            {linesWithProduct.map(({ line, product }) => {
              const lineKey = cartLineKey(line)
              const qtyGroupId = `cart-qty-${lineKey.replace(/[^a-zA-Z0-9_-]/g, '-')}`
              return (
              <motion.li
                key={lineKey}
                layout
                className="cart-page-row"
              >
                <Link to={`/products/${product.slug}`} className="cart-page-thumb-wrap">
                  <img
                    src={product.image}
                    alt=""
                    width={100}
                    height={133}
                    referrerPolicy="no-referrer"
                    className="cart-page-thumb"
                  />
                </Link>
                <div className="cart-page-row-body">
                  <Link to={`/products/${product.slug}`} className="cart-page-product-title">
                    {product.title.slice(0, 80)}
                    {product.title.length > 80 ? '…' : ''}
                  </Link>
                  <p className="cart-page-price-unit">{formatInr(product.price)}</p>
                  <p className="cart-page-size">
                    Size: <span className="cart-page-size-value">{line.size}</span>
                  </p>
                  <div className="cart-page-controls">
                    <div
                      className="cart-page-qty-stepper"
                      role="group"
                      aria-labelledby={qtyGroupId}
                    >
                      <span className="cart-page-qty-sr" id={qtyGroupId}>
                        Quantity for {product.title.slice(0, 60)}
                        {product.title.length > 60 ? '…' : ''}
                      </span>
                      <button
                        type="button"
                        className="cart-page-qty-btn"
                        aria-label={
                          line.qty <= 1
                            ? `Remove ${product.title.slice(0, 48)} from cart`
                            : `Decrease quantity of ${product.title.slice(0, 48)}`
                        }
                        onClick={() => setQty(product.id, line.size, line.qty - 1)}
                      >
                        −
                      </button>
                      <span className="cart-page-qty-value" aria-live="polite" aria-atomic="true">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        className="cart-page-qty-btn"
                        aria-label={`Increase quantity of ${product.title.slice(0, 48)}`}
                        onClick={() => setQty(product.id, line.size, line.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(product.id, line.size)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-page-line-total">{formatInr(product.price * line.qty)}</div>
              </motion.li>
              )
            })}
          </ul>

          <footer className="cart-page-footer">
            <p className="cart-page-ship-note">Shipping calculated at next step (demo).</p>
            <p className="cart-page-subtotal">
              <span className="cart-page-subtotal-label">Subtotal</span>
              <span className="cart-page-subtotal-amount">{formatInr(subtotal)}</span>
            </p>
            <motion.button
              type="button"
              className="btn-primary cart-page-checkout-btn"
              whileHover={{ scale: 1.02 }}
              onClick={handleCheckout}
            >
              Check out
            </motion.button>
          </footer>
        </div>
      </div>
    </section>
  )
}
