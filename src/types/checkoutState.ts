/** Shipping details collected on first checkout step */
export type ShippingDetails = {
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pinCode: string
}

export type PaymentMethod = 'cod' | 'online'

/** Passed from checkout form → payment step */
export type CheckoutPaymentState = {
  shipping: ShippingDetails
  subtotal: number
  itemCount: number
  /** Display order reference (human-readable) */
  orderRef: string
  /** UrbanRupee payin orderid — exactly 20 alphanumeric */
  payinOrderId: string
}

/** Passed to order confirmation */
export type CheckoutThanksState = {
  orderId: string
  payinOrderId?: string
  subtotal: number
  itemCount: number
  shipping: ShippingDetails
  paymentMethod: PaymentMethod
  paymentStatus?: 'success' | 'failed' | 'pending'
  utr?: string
}
