import { useEffect, useState } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { fetchPayinStatus } from '../api/payin'
import type { CheckoutThanksState } from '../types/checkoutState'

function isValidThanksState(s: unknown): s is CheckoutThanksState {
  if (!s || typeof s !== 'object') return false
  const o = s as Record<string, unknown>
  if (typeof o.orderId !== 'string' || typeof o.subtotal !== 'number' || typeof o.itemCount !== 'number') return false
  if (o.paymentMethod !== 'cod' && o.paymentMethod !== 'online') return false
  const sh = o.shipping
  if (!sh || typeof sh !== 'object') return false
  const x = sh as Record<string, unknown>
  return typeof x.fullName === 'string' && typeof x.phone === 'string'
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
  const { clearCart } = useCart()
  const raw = location.state
  const [paymentStatus, setPaymentStatus] = useState<CheckoutThanksState['paymentStatus']>(
    isValidThanksState(raw) ? raw.paymentStatus : undefined,
  )
  const [utr, setUtr] = useState<string | undefined>(isValidThanksState(raw) ? raw.utr : undefined)

  useEffect(() => {
    if (!isValidThanksState(raw) || raw.paymentMethod !== 'online' || !raw.payinOrderId) return
    if (paymentStatus === 'success') {
      clearCart()
      sessionStorage.removeItem('bbn_pending_payin')
      return
    }

    let cancelled = false
    const poll = async () => {
      const res = await fetchPayinStatus(raw.payinOrderId!)
      if (cancelled) return
      if (res.status === 'success') {
        setPaymentStatus('success')
        setUtr(res.utr)
        clearCart()
        sessionStorage.removeItem('bbn_pending_payin')
      } else if (res.status === 'failed') {
        setPaymentStatus('failed')
      }
    }

    void poll()
    const id = window.setInterval(() => void poll(), 4000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [raw, paymentStatus, clearCart])

  if (!isValidThanksState(raw)) {
    return <Navigate to="/cart" replace />
  }

  const state = { ...raw, paymentStatus: paymentStatus ?? raw.paymentStatus, utr: utr ?? raw.utr }
  const isCod = state.paymentMethod === 'cod'
  const onlineSuccess = state.paymentMethod === 'online' && state.paymentStatus === 'success'
  const onlinePending = state.paymentMethod === 'online' && state.paymentStatus !== 'success' && state.paymentStatus !== 'failed'
  const onlineFailed = state.paymentMethod === 'online' && state.paymentStatus === 'failed'

  return (
    <div className="checkout-success container" style={{ padding: '48px 20px 80px', maxWidth: 560 }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="checkout-success-card"
      >
        <div className="checkout-success-icon" aria-hidden>
          {onlineFailed ? '!' : onlinePending ? '…' : '✓'}
        </div>
        <h1 className="checkout-success-title checkout-cursive">
          {isCod
            ? 'Order placed — Cash on Delivery'
            : onlineSuccess
              ? 'Payment successful'
              : onlineFailed
                ? 'Payment failed'
                : 'Payment pending'}
        </h1>
        <p className="checkout-success-lead checkout-cursive-body">
          {isCod
            ? 'Your order is confirmed. Pay the delivery partner when your parcel arrives.'
            : onlineSuccess
              ? 'Thank you! Your online payment was received.'
              : onlineFailed
                ? 'We could not confirm your payment. You can try again from checkout.'
                : 'Complete payment in your UPI app. This page will update when payment is confirmed.'}
        </p>
        <dl className="checkout-success-meta">
          <div>
            <dt>Order ID</dt>
            <dd>{state.orderId}</dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{isCod ? 'Cash on Delivery' : 'Online (UPI)'}</dd>
          </div>
          {state.utr ? (
            <div>
              <dt>UTR</dt>
              <dd>{state.utr}</dd>
            </div>
          ) : null}
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
          <h2 className="checkout-success-ship-title checkout-cursive-sm">Shipping to</h2>
          <p className="checkout-success-ship-body checkout-cursive-body">
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
          {onlineFailed || onlinePending ? (
            <Link to="/checkout" className="btn-primary checkout-success-secondary">
              Back to checkout
            </Link>
          ) : (
            <Link to="/" className="btn-primary checkout-success-secondary">
              Back to home
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}
