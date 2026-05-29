import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { fetchPayinStatus } from '../api/payin'
import type { CheckoutPaymentState, CheckoutThanksState } from '../types/checkoutState'

export function PaymentCompletePage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const orderid = params.get('orderid') ?? ''
  const amount = params.get('amount') ?? ''
  const started = useRef(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!orderid || started.current) return
    started.current = true

    const run = async () => {
      let checkout: CheckoutPaymentState | null = null
      try {
        const raw = sessionStorage.getItem('bbn_pending_payin')
        if (raw) checkout = JSON.parse(raw) as CheckoutPaymentState
      } catch {
        checkout = null
      }

      let statusRes = await fetchPayinStatus(orderid)
      if (statusRes.status === 'pending') {
        await new Promise((r) => setTimeout(r, 1500))
        const retry = await fetchPayinStatus(orderid)
        if (retry.status === 'success') statusRes = retry
      }

      const thanks: CheckoutThanksState = {
        orderId: checkout?.orderRef ?? orderid,
        payinOrderId: orderid,
        subtotal: checkout?.subtotal ?? (Number(amount) || 0),
        itemCount: checkout?.itemCount ?? 1,
        shipping: checkout?.shipping ?? {
          fullName: '',
          email: '',
          phone: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          pinCode: '',
        },
        paymentMethod: 'online',
        paymentStatus: statusRes.status === 'success' ? 'success' : 'pending',
        utr: statusRes.utr,
      }

      clearCart()
      sessionStorage.removeItem('bbn_pending_payin')
      navigate('/checkout/thanks', { replace: true, state: thanks })
    }

    void run()
  }, [orderid, amount, navigate, clearCart])

  return (
    <section className="checkout-section checkout-payment-section">
      <div className="checkout-section-bg" aria-hidden />
      <div className="container checkout-section-inner">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="checkout-page-card checkout-initiate-card"
          style={{ textAlign: 'center' }}
        >
          {error ? (
            <>
              <p className="checkout-cursive-body" role="alert">
                {error}
              </p>
              <Link to="/checkout" className="btn-primary btn-dark checkout-submit" style={{ marginTop: 16 }}>
                Back to checkout
              </Link>
            </>
          ) : (
            <>
              <div className="checkout-initiate-spinner" aria-hidden />
              <p className="checkout-cursive checkout-initiate-status">Confirming your payment…</p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
