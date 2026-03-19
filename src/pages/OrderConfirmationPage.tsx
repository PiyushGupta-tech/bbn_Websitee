import { Link, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { CheckoutThanksState } from '../types/checkoutState'

function isValidThanksState(s: unknown): s is CheckoutThanksState {
  if (!s || typeof s !== 'object') return false
  const o = s as Record<string, unknown>
  if (typeof o.orderId !== 'string' || typeof o.subtotal !== 'number' || typeof o.itemCount !== 'number') return false
  const sh = o.shipping
  if (!sh || typeof sh !== 'object') return false
  const x = sh as Record<string, unknown>
  return (
    typeof x.fullName === 'string' &&
    typeof x.email === 'string' &&
    typeof x.phone === 'string' &&
    typeof x.addressLine1 === 'string' &&
    typeof x.addressLine2 === 'string' &&
    typeof x.city === 'string' &&
    typeof x.state === 'string' &&
    typeof x.pinCode === 'string'
  )
}

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function OrderConfirmationPage() {
  const location = useLocation()
  const state = location.state as CheckoutState | null

  if (!state?.orderId || typeof state.subtotal !== 'number') {
    return <Navigate to="/cart" replace />
  }

  return (
    <div className="checkout-success container" style={{ padding: '48px 20px 80px', maxWidth: 560 }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="checkout-success-card"
      >
        <div className="checkout-success-icon" aria-hidden>
          ✓
        </div>
        <h1 className="checkout-success-title">Thank you for your order</h1>
        <p className="checkout-success-lead">
          Your order was placed successfully. This is a <strong>demo checkout</strong> — no payment was
          charged. Connect a payment provider (e.g. Razorpay, Stripe) when you go live.
        </p>
        <dl className="checkout-success-meta">
          <div>
            <dt>Order ID</dt>
            <dd>{state.orderId}</dd>
          </div>
          <div>
            <dt>Items</dt>
            <dd>{state.itemCount}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatInr(state.subtotal)}</dd>
          </div>
        </dl>
        <div className="checkout-success-ship" aria-label="Shipping to">
          <h2 className="checkout-success-ship-title">Shipping to</h2>
          <p className="checkout-success-ship-body">
            <strong>{state.shipping.fullName}</strong>
            <br />
            {state.shipping.addressLine1}
            {state.shipping.addressLine2 ? (
              <>
                <br />
                {state.shipping.addressLine2}
              </>
            ) : null}
            <br />
            {state.shipping.city}, {state.shipping.state} {state.shipping.pinCode}
            <br />
            <span className="checkout-success-ship-muted">{state.shipping.phone}</span>
            {' · '}
            <span className="checkout-success-ship-muted">{state.shipping.email}</span>
          </p>
        </div>
        <div className="checkout-success-actions">
          <Link to="/shop" className="btn-primary btn-dark">
            Continue shopping
          </Link>
          <Link to="/" className="btn-primary checkout-success-secondary">
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
