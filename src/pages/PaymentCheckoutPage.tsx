import { useCallback, useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import type { CheckoutPaymentState, CheckoutThanksState } from '../types/checkoutState'

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

function isPaymentState(s: unknown): s is CheckoutPaymentState {
  if (!s || typeof s !== 'object') return false
  const o = s as Record<string, unknown>
  const sh = o.shipping
  if (!sh || typeof sh !== 'object') return false
  const x = sh as Record<string, unknown>
  return (
    typeof o.subtotal === 'number' &&
    typeof o.itemCount === 'number' &&
    typeof o.orderRef === 'string' &&
    typeof o.payinOrderId === 'string' &&
    typeof x.fullName === 'string' &&
    typeof x.phone === 'string'
  )
}

export function PaymentCheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearCart } = useCart()
  const state = location.state
  const [busy, setBusy] = useState<'cod' | null>(null)

  if (!isPaymentState(state)) {
    return <Navigate to="/checkout" replace />
  }

  const { shipping, subtotal, itemCount, orderRef, payinOrderId } = state

  const placeCodOrder = useCallback(async () => {
    setBusy('cod')
    try {
      const thanks: CheckoutThanksState = {
        orderId: orderRef,
        payinOrderId,
        subtotal,
        itemCount,
        shipping,
        paymentMethod: 'cod',
        paymentStatus: 'success',
      }
      clearCart()
      navigate('/checkout/thanks', { replace: true, state: thanks })
    } finally {
      setBusy(null)
    }
  }, [clearCart, navigate, orderRef, payinOrderId, shipping, subtotal, itemCount])

  const goOnline = () => {
    navigate('/checkout/payment/online', { replace: true, state })
  }

  return (
    <section className="checkout-section checkout-payment-section" aria-labelledby="payment-heading">
      <div className="checkout-section-bg" aria-hidden />
      <div className="container checkout-section-inner">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="checkout-shell"
        >
          <aside className="checkout-brand" aria-label="Payment summary">
            <Link to="/checkout" className="checkout-page-back">
              ← Edit details
            </Link>
            <h2 className="checkout-brand-title checkout-cursive">Choose Payment</h2>
            <p className="checkout-brand-lead checkout-cursive-body">
              Your order is reserved. Select Cash on Delivery or pay securely online via UPI.
            </p>
            <div className="checkout-page-summary" aria-label="Order summary">
              <span>
                {itemCount} {itemCount === 1 ? 'item' : 'items'} · {orderRef}
              </span>
              <span className="checkout-page-summary-total">{formatInr(subtotal)}</span>
            </div>
            <div className="checkout-payment-ship-preview checkout-cursive-body">
              <p>
                <strong className="checkout-cursive-sm">{shipping.fullName}</strong>
                <br />
                {shipping.addressLine1}, {shipping.city}
                <br />
                {shipping.phone}
              </p>
            </div>
          </aside>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="checkout-page-card"
          >
            <header className="checkout-page-header">
              <p className="checkout-page-eyebrow checkout-cursive-sm">Step 2 of 2</p>
              <h1 id="payment-heading" className="checkout-page-title checkout-cursive">
                Payment
              </h1>
              <p className="checkout-page-lead checkout-cursive-body">
                How would you like to pay for your order?
              </p>
            </header>

            <div className="checkout-payment-methods" role="list">
              <button
                type="button"
                className="checkout-payment-method checkout-payment-method--online"
                onClick={goOnline}
                role="listitem"
              >
                <span className="checkout-payment-method-icon" aria-hidden>
                  ◈
                </span>
                <span className="checkout-payment-method-text">
                  <strong className="checkout-cursive">Pay Online</strong>
                  <span className="checkout-cursive-body">UPI · Cards · Net banking via UrbanRupee</span>
                </span>
                <span className="checkout-payment-method-arrow" aria-hidden>
                  →
                </span>
              </button>

              <button
                type="button"
                className="checkout-payment-method checkout-payment-method--cod"
                onClick={() => void placeCodOrder()}
                disabled={busy === 'cod'}
                aria-busy={busy === 'cod'}
                role="listitem"
              >
                <span className="checkout-payment-method-icon" aria-hidden>
                  ₹
                </span>
                <span className="checkout-payment-method-text">
                  <strong className="checkout-cursive">Cash on Delivery</strong>
                  <span className="checkout-cursive-body">Pay when your order arrives at your door</span>
                </span>
                <span className="checkout-payment-method-arrow" aria-hidden>
                  {busy === 'cod' ? '…' : '→'}
                </span>
              </button>
            </div>

            <p className="checkout-payment-note checkout-cursive-body">
              Online payments open your UPI app securely. You will return here after payment.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
