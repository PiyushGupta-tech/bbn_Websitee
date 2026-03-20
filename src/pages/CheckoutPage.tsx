import { useState, useCallback, type FormEvent, type ChangeEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import type { CheckoutThanksState, ShippingDetails } from '../types/checkoutState'

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

const initialForm: ShippingDetails = {
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pinCode: '',
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { linesWithProduct, subtotal, clearCart } = useCart()
  const [form, setForm] = useState<ShippingDetails>(initialForm)
  const [busy, setBusy] = useState(false)

  const checkoutSnapshot = (location.state as { itemCount?: number; subtotal?: number } | null) ?? null
  const itemCountFromCart = linesWithProduct.reduce((n, { line }) => n + line.qty, 0)
  const itemCount = itemCountFromCart > 0 ? itemCountFromCart : (checkoutSnapshot?.itemCount ?? 0)
  const subtotalAmount = itemCountFromCart > 0 ? subtotal : (checkoutSnapshot?.subtotal ?? 0)

  const update =
    (field: keyof ShippingDetails) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (itemCount === 0 || busy) return
      setBusy(true)
      const orderId = `BBN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
      const state: CheckoutThanksState = {
        orderId,
        subtotal: subtotalAmount,
        itemCount,
        shipping: { ...form },
      }
      try {
        await new Promise((r) => setTimeout(r, 400))
        clearCart()
        navigate('/checkout/thanks', { replace: true, state })
      } finally {
        setBusy(false)
      }
    },
    [itemCount, busy, subtotalAmount, form, clearCart, navigate],
  )

  if (itemCount === 0) {
    return (
      <section className="checkout-section" aria-labelledby="checkout-empty-heading">
        <div className="checkout-section-bg" aria-hidden />
        <div className="container checkout-section-inner">
          <div className="checkout-page-card" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
            <h1 id="checkout-empty-heading" className="checkout-page-title">
              Your cart is empty
            </h1>
            <p className="checkout-page-lead" style={{ marginBottom: 20 }}>
              Add products to continue to shipping details.
            </p>
            <Link to="/cart" className="btn-primary btn-dark">
              Go to cart
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="checkout-section" aria-labelledby="checkout-heading">
      <div className="checkout-section-bg" aria-hidden />
      <div className="container checkout-section-inner">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="checkout-shell"
        >
          <aside className="checkout-brand" aria-label="Checkout details">
            <Link to="/cart" className="checkout-page-back">
              ← Back to cart
            </Link>
            <h2 className="checkout-brand-title">Secure Checkout</h2>
            <p className="checkout-brand-lead">
              You are one step away from completing your order. Fill in shipping details and we will place a demo
              order instantly.
            </p>
            <ul className="checkout-brand-points">
              <li>Verified item summary before order placement</li>
              <li>Delivery details saved only for this demo flow</li>
              <li>No live payment gateway connected yet</li>
            </ul>
            <div className="checkout-page-summary" aria-label="Order summary">
              <span>
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
              <span className="checkout-page-summary-total">{formatInr(subtotalAmount)}</span>
            </div>
          </aside>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="checkout-page-card"
          >
            <header className="checkout-page-header">
              <p className="checkout-page-eyebrow">Shipping details</p>
              <h1 id="checkout-heading" className="checkout-page-title">
                Checkout
              </h1>
              <p className="checkout-page-lead">
                Enter your address and contact information to continue.
              </p>
            </header>

            <form className="checkout-form" onSubmit={(ev) => void handleSubmit(ev)} noValidate>
              <fieldset className="checkout-fieldset">
                <legend className="checkout-legend">Contact</legend>
                <label className="checkout-label">
                  Full name
                  <input
                    className="checkout-input"
                    name="fullName"
                    autoComplete="name"
                    required
                    value={form.fullName}
                    onChange={update('fullName')}
                    placeholder="As on ID / parcel"
                  />
                </label>
                <label className="checkout-label">
                  Email
                  <input
                    className="checkout-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="checkout-label">
                  Phone
                  <input
                    className="checkout-input"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    required
                    inputMode="numeric"
                    pattern="[0-9+\s-]{10,15}"
                    title="10–15 digits (spaces or + allowed)"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="10-digit mobile"
                  />
                </label>
              </fieldset>

              <fieldset className="checkout-fieldset">
                <legend className="checkout-legend">Shipping address</legend>
                <label className="checkout-label">
                  Address line 1
                  <input
                    className="checkout-input"
                    name="addressLine1"
                    autoComplete="address-line1"
                    required
                    value={form.addressLine1}
                    onChange={update('addressLine1')}
                    placeholder="House / flat, street"
                  />
                </label>
                <label className="checkout-label">
                  Address line 2 <span className="checkout-optional">(optional)</span>
                  <input
                    className="checkout-input"
                    name="addressLine2"
                    autoComplete="address-line2"
                    value={form.addressLine2}
                    onChange={update('addressLine2')}
                    placeholder="Landmark, area"
                  />
                </label>
                <div className="checkout-row">
                  <label className="checkout-label">
                    City
                    <input
                      className="checkout-input"
                      name="city"
                      autoComplete="address-level2"
                      required
                      value={form.city}
                      onChange={update('city')}
                      placeholder="City"
                    />
                  </label>
                  <label className="checkout-label">
                    State
                    <input
                      className="checkout-input"
                      name="state"
                      autoComplete="address-level1"
                      required
                      value={form.state}
                      onChange={update('state')}
                      placeholder="State"
                    />
                  </label>
                </div>
                <label className="checkout-label checkout-label--pin">
                  PIN code
                  <input
                    className="checkout-input"
                    name="pinCode"
                    autoComplete="postal-code"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    title="6-digit Indian PIN"
                    value={form.pinCode}
                    onChange={update('pinCode')}
                    placeholder="000000"
                  />
                </label>
              </fieldset>

              <div className="checkout-form-actions">
                <button
                  type="submit"
                  className="btn-primary btn-dark checkout-submit"
                  disabled={busy}
                  aria-busy={busy}
                >
                  {busy ? 'Placing order…' : 'Place order'}
                </button>
                <Link to="/cart" className="btn-primary checkout-success-secondary checkout-cancel-link">
                  Return to cart
                </Link>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
