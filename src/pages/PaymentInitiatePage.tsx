import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { initiatePayin } from '../api/payin'
import type { CheckoutPaymentState, CheckoutThanksState } from '../types/checkoutState'
import { normalizePhone } from '../utils/normalizePhone'

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
  return typeof o.payinOrderId === 'string' && typeof o.subtotal === 'number'
}

function isInternalPath(url: string) {
  return url.startsWith('/') && !url.startsWith('//')
}

function openPaymentUrl(url: string) {
  window.location.assign(url)
}

export function PaymentInitiatePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state
  const started = useRef(false)

  const [phase, setPhase] = useState<'init' | 'redirecting' | 'ready' | 'error'>('init')
  const [message, setMessage] = useState('Connecting to UrbanRupee…')
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!isPaymentState(state) || started.current) return
    started.current = true

    const run = async () => {
      try {
        const amount = String(Math.max(1, Math.round(state.subtotal)))
        const mobile = normalizePhone(state.shipping.phone)

        if (mobile.length !== 10) {
          setPhase('error')
          setMessage('Please enter a valid 10-digit mobile number on the previous step.')
          return
        }

        setMessage('Initiating payment with UrbanRupee…')

        const result = await initiatePayin({
          amount,
          mobile,
          name: state.shipping.fullName.trim(),
          orderid: state.payinOrderId,
        })

        if (!result.status || !result.url) {
          setPhase('error')
          setMessage(
            result.message ||
              'Could not start UrbanRupee payment. Please try again or contact UrbanRupee support for merchant UR113.',
          )
          return
        }

        sessionStorage.setItem(
          'bbn_pending_payin',
          JSON.stringify({
            payinOrderId: state.payinOrderId,
            orderRef: state.orderRef,
            subtotal: state.subtotal,
            itemCount: state.itemCount,
            shipping: state.shipping,
          }),
        )

        if (result.url.startsWith('/api/')) {
          setPhase('redirecting')
          setMessage('Opening UrbanRupee checkout…')
          window.location.assign(result.url)
          return
        }

        if (isInternalPath(result.url)) {
          setPhase('redirecting')
          setMessage('Completing payment…')
          navigate(result.url)
          return
        }

        setPaymentUrl(result.url)
        setPhase('ready')
        setMessage('Redirecting to UrbanRupee…')
        openPaymentUrl(result.url)
      } catch {
        setPhase('error')
        setMessage('Something went wrong while starting payment. Please try again.')
      }
    }

    void run()
  }, [state, navigate])

  if (!isPaymentState(state)) {
    return <Navigate to="/checkout" replace />
  }

  const retry = () => {
    started.current = false
    setPaymentUrl(null)
    setPhase('init')
    setMessage('Retrying UrbanRupee payment…')
    window.location.reload()
  }

  const markPendingThanks = () => {
    const thanks: CheckoutThanksState = {
      orderId: state.orderRef,
      payinOrderId: state.payinOrderId,
      subtotal: state.subtotal,
      itemCount: state.itemCount,
      shipping: state.shipping,
      paymentMethod: 'online',
      paymentStatus: 'pending',
    }
    navigate('/checkout/thanks', { replace: true, state: thanks })
  }

  return (
    <section className="checkout-section checkout-payment-section" aria-labelledby="initiate-heading">
      <div className="checkout-section-bg" aria-hidden />
      <div className="container checkout-section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="checkout-page-card checkout-initiate-card"
        >
          <header className="checkout-page-header checkout-initiate-header">
            <p className="checkout-page-eyebrow checkout-cursive-sm">UrbanRupee · Secure checkout</p>
            <h1 id="initiate-heading" className="checkout-page-title checkout-cursive">
              Initiate Payment
            </h1>
            <p className="checkout-page-lead checkout-cursive-body">
              Amount due: <strong>{formatInr(state.subtotal)}</strong>
            </p>
          </header>

          {phase === 'error' ? (
            <div className="checkout-initiate-error" role="alert">
              <p className="checkout-cursive-body">{message}</p>
              <div className="checkout-initiate-actions">
                <button type="button" className="btn-primary btn-dark checkout-submit" onClick={retry}>
                  Try again
                </button>
                <Link to="/checkout/payment" state={state} className="checkout-cancel-link">
                  Back to payment options
                </Link>
              </div>
            </div>
          ) : (
            <div className="checkout-initiate-loading" aria-live="polite">
              <div className="checkout-initiate-spinner" aria-hidden />
              <p className="checkout-cursive checkout-initiate-status">{message}</p>

              {paymentUrl && !isInternalPath(paymentUrl) && (
                <div className="checkout-initiate-actions">
                  <a
                    href={paymentUrl}
                    className="btn-primary btn-dark checkout-submit"
                    style={{ textAlign: 'center', textDecoration: 'none' }}
                  >
                    Open UrbanRupee payment page
                  </a>
                  <p className="checkout-payment-note checkout-cursive-body">
                    {paymentUrl.startsWith('upi:')
                      ? 'Tap above to open your UPI app (PhonePe, GPay, Paytm).'
                      : 'Tap above if you are not redirected automatically.'}
                  </p>
                </div>
              )}

              <button type="button" className="checkout-cancel-link" onClick={markPendingThanks}>
                I have completed payment
              </button>
            </div>
          )}

          <Link to="/checkout/payment" state={state} className="checkout-page-back" style={{ marginTop: 24 }}>
            ← Back to payment options
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
