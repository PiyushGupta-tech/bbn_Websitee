import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { fetchPayinStatus } from '../api/payin'
import type { CheckoutPaymentState, CheckoutThanksState } from '../types/checkoutState'

function pickOrderId(params: URLSearchParams): string {
  return (
    params.get('orderid') ??
    params.get('order_id') ??
    params.get('client_txn_id') ??
    params.get('clientTxnId') ??
    ''
  ).trim()
}

export function PaymentReturnPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const started = useRef(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const orderid = pickOrderId(params)
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

      const gatewayStatus = (params.get('status') ?? params.get('state') ?? '').toLowerCase()
      const failed = gatewayStatus === 'failed' || gatewayStatus === 'failure'

      if (failed) {
        setError('Payment was not completed. You can try again from checkout.')
        return
      }

      let statusRes = await fetchPayinStatus(orderid)
      if (statusRes.status === 'pending') {
        await new Promise((r) => setTimeout(r, 2000))
        const retry = await fetchPayinStatus(orderid)
        if (retry.status === 'success') statusRes = retry
      }

      const finalPaid = statusRes.status === 'success'

      const thanks: CheckoutThanksState = {
        orderId: checkout?.orderRef ?? orderid,
        payinOrderId: orderid,
        subtotal: checkout?.subtotal ?? Number(params.get('amount') || 0),
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
        paymentStatus: finalPaid ? 'success' : 'pending',
        utr: statusRes.utr,
      }

      clearCart()
      sessionStorage.removeItem('bbn_pending_payin')
      navigate('/checkout/thanks', { replace: true, state: thanks })
    }

    void run()
  }, [params, navigate, clearCart])

  const orderid = pickOrderId(params)

  if (!orderid) {
    return (
      <section className="checkout-section checkout-payment-section">
        <div className="container checkout-section-inner">
          <div className="checkout-page-card checkout-initiate-card" style={{ textAlign: 'center' }}>
            <p className="checkout-cursive-body" role="alert">
              Invalid payment return link. Please start checkout again.
            </p>
            <Link to="/checkout" className="btn-primary btn-dark checkout-submit" style={{ marginTop: 16 }}>
              Back to checkout
            </Link>
          </div>
        </div>
      </section>
    )
  }

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
              <Link to="/checkout/payment" className="btn-primary btn-dark checkout-submit" style={{ marginTop: 16 }}>
                Back to payment options
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
